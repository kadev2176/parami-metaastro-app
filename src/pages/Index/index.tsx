import React, { useEffect, useState } from 'react';
import styles from '@/style/common.less';
import style from './style.less';
import { useIntl, useModel, history } from 'umi';
import Background from '@/components/Background';
import { RightOutlined } from '@ant-design/icons';
import { infuraProvider } from '@/config/web3provider';
import { ethers } from 'ethers';
import { contractAddresses } from '../Astro/config';
import PrimeAbi from '@/pages/Astro/abi/Prime.json';
import { todayYYYYMMDD } from '@/utils/common';
import BigModal from '@/components/ParamiModal/BigModal';
import Landing from './Landing';
import PreDayCountDown from './PreCountdown';
import Intro from './Intro';
import Potential from './Potential';
import User from './User';
import Friend from './Friend';
import Profit from './Profit';
import Stage from './Stage';
import Partner from './Partner';
import StoryModal from './StoryModal';

const Index: React.FC = () => {
	const { ChainId, Account, connect } = useModel('web3');
	const { initialState, setInitialState } = useModel('@@initialState');
	const [avavible, setAvavible] = useState<boolean>(false);
	const [popBottomBar, setPopBottomBar] = useState<boolean>(false);
	const [storyModal, setStoryModal] = useState<boolean>(false);
	const [PageScroll, setPageScroll] = useState<number>(0);
	const [startTime, setStartTime] = useState<number>(0);
	const [endTime, setEndTime] = useState<number>(0);
	const [onSale, setOnSale] = useState<boolean>(false);
	const [leftDays, setLeftDays] = useState<number>();

	const intl = useIntl();

	const startDate: any = '2022-04-29';
	const preDate: any = '2022-05-05';

	const handleScroll = async () => {
		const pageScroll = document.documentElement.scrollTop;

		setPageScroll(pageScroll);
		if (pageScroll > 300) {
			setPopBottomBar(true);
		} else {
			setPopBottomBar(false);
		}
	};

	const getSalesTime = async () => {
		const provider = new ethers.providers.JsonRpcProvider(infuraProvider[4]);
		const MintContract = await new ethers.Contract(contractAddresses.prime[4], PrimeAbi, provider);

		const timeRange = await MintContract?.getSalesTimes();

		const date = new Date();
		const now = date.getTime() / 1000;
		const currentDay = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) / 1000;

		setStartTime((timeRange[0].toNumber() + currentDay) * 1000);
		setEndTime((timeRange[1].toNumber() + currentDay) * 1000);

		if (now <= timeRange[0].toNumber() + currentDay || now >= timeRange[1].toNumber() + currentDay) {
			setOnSale(false);
		} else {
			setOnSale(true);
		}
	};

	const preDayCountDown = async () => {
		let leftDateSpan: number = 0;
		const preDateUnix = Date.parse(preDate);
		const startDateUnix = Date.parse(startDate);
		if (preDateUnix > startDateUnix) {
			const todayDateUnix = Date.parse(todayYYYYMMDD());
			if (todayDateUnix < preDateUnix) {
				leftDateSpan = todayDateUnix - preDateUnix;
				leftDateSpan = Math.abs(leftDateSpan);
				const iLeftDays = Math.floor(leftDateSpan / (24 * 3600 * 1000));
				setLeftDays(iLeftDays);
				setInitialState({
					...initialState,
					leftDays: iLeftDays,
				});
			} else {
				setLeftDays(0);
				setInitialState({
					...initialState,
					leftDays: 0,
				});
			}
		}
	};

	useEffect(() => {
		if (ChainId === 4) {
			setAvavible(true);
		} else {
			setAvavible(false);
		}
	}, [ChainId, Account, avavible]);

	useEffect(() => {
		preDayCountDown();
		getSalesTime();
	}, []);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<div className={styles.mainContainer}>
			<Background
				leftDays={leftDays}
			/>
			{(!!leftDays && leftDays !== 0) && (
				<PreDayCountDown
					preDate={preDate}
					setStoryModal={setStoryModal}
				/>
			)}
			{(!leftDays || leftDays === 0) && (
				<Landing
					PageScroll={PageScroll}
					onSale={onSale}
					startTime={startTime}
					endTime={endTime}
					setStoryModal={setStoryModal}
				/>
			)}
			<div className={styles.pageContainer}>
				<Intro />
				<Profit />
				<Potential />
				<User />
				<Friend />
				<Stage />
				<Partner />
				{(!leftDays || leftDays === 0) && (
					<div
						className={style.gotoMintContainer}
						style={{
							right: popBottomBar ? '2rem' : '-30rem',
						}}
						onClick={async () => {
							await connect();
							history.push('/mint');
						}}
					>
						<img
							src={"/images/background/astronomy.svg"}
							className={style.astronomyIcon}
						/>
						<div className={style.title}>
							<p className={style.titleTop}>
								{intl.formatMessage({
									id: 'gotoMint.title1',
									defaultMessage: 'MetaAstro',
								})}
							</p>
							<p className={style.titleBottom}>
								Mint Now
								<RightOutlined
									className={style.rightIcon}
								/>
							</p>
						</div>
					</div>
				)}
			</div>

			<BigModal
				visable={storyModal}
				title={undefined}
				bodyStyle={{
					backgroundColor: '#000',
					border: '2px solid #fff',
				}}
				content={
					<StoryModal />
				}
				width={1000}
				footer={false}
				close={() => { setStoryModal(false) }}
			/>
		</div>
	)
}

export default Index;
