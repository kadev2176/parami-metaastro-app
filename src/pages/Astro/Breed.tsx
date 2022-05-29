import React, { useEffect } from 'react';
import styles from '@/style/common.less';
import style from './style.less';
import { useModel } from 'umi';
import queryToStr from 'query-string';
import Ordinary from './components/Ordinary';
import Background from '@/components/Background';

const Breed: React.FC = () => {
	const { Account, connect } = useModel('web3');

	const query: any = queryToStr.parse(window.location.search);

	useEffect(() => {
		if (!Account) {
			connect();
		}
	}, [Account]);

	return (
		<>
			<div className={styles.mainContainer}>
				<Background
					complex={false}
				/>
				<div className={style.centerContainer}>
					<div className={style.firstContainer}>
						<Ordinary
							tokenID={query?.tokenID}
						/>
					</div>
				</div>
			</div>
		</>
	)
}

export default Breed;
