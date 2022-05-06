import { Button, DatePicker, notification, TimePicker, Row, Col, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import Geosuggest from 'react-geosuggest';
import { useIntl, useModel } from 'umi';
import styles from '../../style.less';
import style from './style.less';
import type { BigNumber } from 'ethers';
import { ethers } from 'ethers';
import { extractTokenIdFromEvent } from '@/utils/astro';
import BigModal from '@/components/ParamiModal/BigModal';
import { contractAddresses, oddMonth, opensea } from '../../config';
import { engDay, errorParse } from '@/utils/common';
import { RSAEncrypt } from '@/utils/rsa';
import { isLeapYear } from '../../../../utils/common';
import classNames from 'classnames';
import { LoadingOutlined } from '@ant-design/icons';

const Prime: React.FC = () => {
	const { Account, ChainId } = useModel('web3');
	const [suggestList, setSuggestList] = useState<boolean>(false);
	const [lat, setLat] = useState<number>(0);
	const [lng, setLng] = useState<number>(0);
	const [utcOffset, setUTCOffset] = useState<number>(0);
	const [yearOfBirth, setYearOfBirth] = useState<number>();
	const [monthOfBirth, setMonthOfBirth] = useState<number>();
	const [dayOfBirth, setDayOfBirth] = useState<number>();
	const [timeOfBirth, setTimeOfBirth] = useState<string[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [loadSVG, setLoadSVG] = useState<boolean>(false);
	const [currentPrice, setCurrentPrice] = useState<BigNumber>();
	const [currentFee, setCurrentFee] = useState<BigNumber>();
	const [currentSupply, setCurrentSupply] = useState<BigNumber>();
	const [astroSVG, setAstroSVG] = useState<string>();
	const [TokenId, setTokenId] = useState<ethers.BigNumber>();
	const [modal, setModal] = useState<boolean>(false);
	const [AllowMonth, setAllowMonth] = useState<number[]>([]);
	const [AvailableLoading, setAvailableLoading] = useState<boolean>(true);

	const intl = useIntl();

	const {
		PrimeContract
	} = useModel('astroContracts');

	useEffect(() => {
		if (!!Account && ChainId !== 4) {
			notification.error({
				message: 'Unsupported Chain',
				description: 'This feature is only supported on Rinkeby',
				duration: null
			});
			return;
		}
	}, [ChainId, Account]);

	const CurrentDay = new Date().getDate();

	const getCurrentInfo = async () => {
		const price = await PrimeContract?.getPrice();
		const fee = await PrimeContract?.getOracleGasFee();
		const supply = await PrimeContract?.totalSupply();
		setCurrentPrice(price);
		setCurrentFee(fee);
		setCurrentSupply(supply);
	};

	const isAvailable = async () => {
		const currentDay = new Date().getDate();
		const months = [];
		for (let month = 0; month < 12; month++) {
			const tokenId = await PrimeContract?.getTokenIdByMonthAndDay(month + 1, currentDay);
			if (tokenId.toNumber() === 0) {
				months.push(month);
			}
		}
		setAllowMonth(months);
		setAvailableLoading(false);
	};

	useEffect(() => {
		if (!!PrimeContract && !!Account) {
			getCurrentInfo();
			isAvailable();
		}
	}, [Account, PrimeContract]);

	const handleSubmit = async () => {
		setLoading(true);

		try {
			const encryptStr = await RSAEncrypt(`${yearOfBirth},${Number(timeOfBirth[0])},${Number(timeOfBirth[1])},${Number(timeOfBirth[2])},${Math.round(lng * 100)},${Math.round(lat * 100)},${Math.round(utcOffset * 100)}`);

			const tx = await PrimeContract?.initialMint(
				ethers.utils.getAddress(Account),
				[monthOfBirth, dayOfBirth],
				encodeURIComponent(encryptStr),
				{ value: ethers.BigNumber.from(currentPrice).add(ethers.BigNumber.from(currentFee)) },
			);

			const tokenId = await extractTokenIdFromEvent(tx);
			setTokenId(tokenId);

			setLoadSVG(true);

			const timer = setInterval(async () => {
				const svg = await PrimeContract?.tokenURI(tokenId);
				const base64Content = svg.substring("data:application/json;base64,".length);
				const debase64Content = Buffer.from(base64Content, 'base64').toString('binary');
				const jsonContent = JSON.parse(debase64Content);
				const debaseImage = Buffer.from(jsonContent.image.substring("data:image/svg+xml;base64,".length), 'base64').toString('utf8');
				if (debaseImage.indexOf('generating') === -1) {
					const replaceImage = debaseImage.replace(/\<g\>.*\<path.*?\<\/g\>/, '')
						.replace(/\<rect.*?stroke=\"#b49d5d\".*?\/>/, '')
						.replace(/\<radialGradient id=\"darkLight\"\>.*?\<\/radialGradient\>/, '<radialGradient id="darkLight"><stop offset="0%" stop-color="#707070" /><stop offset="3%" stop-color="#1b1b1b" /><stop offset="8%" stop-color="#000000" /></radialGradient>');
					const baseImg = Buffer.from(replaceImage).toString('base64');;
					setAstroSVG('data:image/svg+xml;base64,' + baseImg);
					setLoadSVG(false);
					clearInterval(timer);
					setModal(true);
				};
			}, 3000);

			setLoading(false);
			isAvailable();
		} catch (e: any) {
			console.log(e.message);
			const error = errorParse(e.message).body?.message;
			notification.error({
				key: 'unknowError',
				message: error || e.message || e,
				duration: null,
			});
			setLoading(false);
		}
	};

	return (
		<>
			<div className={style.getchartContainer}>
				<div className={styles.contentContainer}>
					<div className={style.flexContainer}>
						<div className={style.currentDay}>
							Mint the {engDay(CurrentDay)} of any available month.
						</div>
						<div className={styles.priceContainer}>
							<div className={styles.currentPrice}>
								{currentPrice ? ethers.utils.formatEther(ethers.BigNumber.from(currentPrice)) : '--'}
							</div>
							<div className={styles.ethIcon}>
								<img src={'/images/crypto/ethereum-eth-logo.svg'} alt="eth" />
								<span>ETH</span>
							</div>
						</div>
						<div className={styles.totalContainer}>
							<div className={styles.currentTotal}>
								{intl.formatMessage({
									id: 'astro.total',
									defaultMessage: 'Total cost {total} (Oracle operator gas fee: {fee})',
								}, {
									total: currentPrice && currentFee ? Math.floor(Number(ethers.utils.formatEther(ethers.BigNumber.from(currentPrice).add(ethers.BigNumber.from(currentFee)))) * 100) / 100 : '--',
									fee: currentFee ? Math.floor(Number(ethers.utils.formatEther(ethers.BigNumber.from(currentFee))) * 100) / 100 : '--',
								})}
							</div>
						</div>
						<div className={styles.mintCount}>
							{intl.formatMessage({
								id: 'astro.subTitle',
								defaultMessage: 'Gen 0 MetaAstro already minted: {minted}/{total}',
							}, {
								minted: currentSupply?.toString(),
								total: '366',
							})}
						</div>
						<div className={style.nftContainer}>
							<Row gutter={[32, 32]}>
								<Col span={24}>
									<div className={style.locationYearInput}>
										{intl.formatMessage({
											id: 'astro.userinput',
											defaultMessage: 'I was born in {city}, on {year}, '
										}, {
											city: (
												<Geosuggest
													onSuggestSelect={(res) => {
														if (!!res?.location) {
															setLat(res.location.lat);
															setLng(res.location.lng);
															setUTCOffset((res.gmaps as any).utc_offset_minutes / 60);
														}
														setSuggestList(false)
													}}
													placeholder={
														intl.formatMessage({
															id: 'astro.city.placeholder',
															defaultMessage: 'a city',
														})
													}
													inputClassName={style.geoInput}
													className={style.geoSuggest}
													suggestsClassName={style.geoSuggestWrapper}
													suggestItemClassName={style.geoSuggestWrapperItem}
													suggestsHiddenClassName={suggestList ? style.geoSuggestWrapperShow : style.geoSuggestWrapperHidden}
													maxFixtures={5}
													types={["(cities)"]}
													ignoreTab
													ignoreEnter
												/>
											),
											year: (
												<DatePicker
													inputReadOnly
													className={style.input}
													allowClear={false}
													suffixIcon={undefined}
													picker="year"
													format={['YYYY', 'YY']}
													onChange={(_, dateString) => {
														setYearOfBirth(Number(dateString));
													}}
													placeholder={'YYYY'}
												/>
											)
										})}
									</div>
								</Col>
							</Row>
							{(!!yearOfBirth && !AvailableLoading) ? (
								<Row gutter={[32, 32]}>
									{AllowMonth.map((value) => {
										const month = value + 1;
										if (!isLeapYear(Number(yearOfBirth)) && month === 2 && CurrentDay > 28) {
											return null;
										} else if (CurrentDay > 30 && !oddMonth[month]) {
											return null;
										} else return (
											<Col
												key={month}
												xs={12} sm={12} md={8} lg={6} xl={4}
												onClick={() => {
													setMonthOfBirth(month);
													setDayOfBirth(CurrentDay);
												}}
											>
												<div
													className={classNames(style.nftItem, monthOfBirth === month ? style.active : '')}
													onClick={() => setMonthOfBirth(month)}
												>
													{month}-{CurrentDay}
												</div>
											</Col>
										)
									})}
								</Row>
							) : (
								<Spin
									indicator={
										<LoadingOutlined
											style={{
												fontSize: 24,
												color: '#fff',
											}}
											spin
										/>
									}
									tip={
										<span
											style={{
												color: '#fff',
											}}
										>
											Querying available month...
										</span>
									}
								/>
							)}
							<Row gutter={[32, 32]}>
								<Col span={24}>
									<div className={style.timeInput}>
										{intl.formatMessage({
											id: 'astro.userinput',
											defaultMessage: 'at {hhmmss}.'
										}, {
											hhmmss: (
												<TimePicker
													inputReadOnly
													className={style.input}
													allowClear={false}
													suffixIcon={undefined}
													format={['HH:mm:ss']}
													placeholder={intl.formatMessage({
														id: 'astro.time.placeholder',
														defaultMessage: 'HH:mm:ss',
													})}
													onChange={(_, timeString) => {
														setTimeOfBirth(timeString.split(':'));
													}}
												/>
											)
										})}
									</div>
								</Col>
							</Row>
							<Row gutter={[48, 48]}>
								{loadSVG && (
									<Spin
										size="large"
										className={style.generating}
										indicator={
											<LoadingOutlined
												style={{
													color: '#fff',
													marginLeft: '10px',
													marginRight: '10px',
												}}
												spin
											/>
										}
										tip={(
											<div
												style={{
													color: '#fff',
												}}
											>
												{intl.formatMessage({
													id: 'astro.generating',
													defaultMessage: 'Generating...',
												})}
											</div>
										)}
									/>
								)}
							</Row>
							<Row gutter={[48, 48]}>
								<div className={style.buttons}>
									{!loadSVG && !astroSVG && (
										<Button
											size='large'
											shape='round'
											type='primary'
											className={style.button}
											disabled={!lat || !lng || !utcOffset || !yearOfBirth || !monthOfBirth || !dayOfBirth || !timeOfBirth.length}
											loading={loading}
											onClick={() => {
												handleSubmit();
											}}
										>
											{intl.formatMessage({
												id: 'astro.getURChart',
												defaultMessage: 'Mint Your MetaAstro',
											})}
										</Button>
									)}
									{astroSVG && (
										<Button
											size='large'
											shape='round'
											type='primary'
											className={style.button}
											onClick={() => {
												setModal(true);
											}}
										>
											{intl.formatMessage({
												id: 'astro.viewMyChart',
												defaultMessage: 'View Your MetaAstro',
											})}
										</Button>
									)}
								</div>
							</Row>
						</div>
					</div>
				</div>
			</div>
			<BigModal
				visable={modal}
				title={undefined}
				content={
					<div className={style.modalContainer}>
						<div className={style.chartContainer}>
							<div className={style.chart}>
								<img src={astroSVG} />
							</div>
						</div>
						<Button
							block
							type='link'
							size='large'
							onClick={() => {
								window.open(`${opensea.url}/assets/${contractAddresses.prime[4]}/${TokenId?.toString()}`, '_blank');
							}}
							className={style.openSeaLink}
						>
							{intl.formatMessage({
								id: 'astro.gotoOpenSea',
								defaultMessage: 'Go to OpenSea',
							})}
						</Button>
					</div>
				}
				footer={false}
				bodyStyle={{
					backgroundColor: '#000',
					background: 'url(/images/background/tarot.svg) #000',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					padding: 0,
				}}
				close={() => {
					setModal(false);
				}}
			/>
		</>
	)
}

export default Prime;
