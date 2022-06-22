import React, { useEffect } from 'react';
import styles from '@/style/common.less';
import style from './style.less';
import { useModel, history } from 'umi';
import Prime from './components/Prime';
import Background from '@/components/Background';
import { notification } from 'antd';

const Mint: React.FC = () => {
  const { Account, ChainId } = useModel('web3');

  const { PrimeContract } = useModel('astroContracts');

  const getSalesTime = async () => {
    const timeRange = await PrimeContract?.getSalesTimes();

    const date = new Date();
    const now = date.getTime() / 1000;
    const currentDay =
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) / 1000;

    if (
      now <= timeRange[0].toNumber() + currentDay ||
      now >= timeRange[1].toNumber() + currentDay
    ) {
      notification.error({
        message: 'Not in sales time',
        description: 'Please wait for the next sales time',
        duration: null,
      });
      history.push('/');
    }
  };

  useEffect(() => {
    // if (!Account || ChainId !== 4) {
    // 	history.push('/');
    // 	return;
    // }
  }, [ChainId, Account]);

  useEffect(() => {
    if (!!PrimeContract && !!Account && Account !== '') {
      getSalesTime();
    }
  }, [PrimeContract, Account]);

  return (
    <>
      <div className={styles.mainContainer}>
        <Background complex={false} />
        <div className={style.centerContainer}>
          <div className={style.firstContainer}>
            <Prime />
          </div>
        </div>
      </div>
    </>
  );
};

export default Mint;
