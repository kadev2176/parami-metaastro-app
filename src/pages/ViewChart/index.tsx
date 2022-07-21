/**
 * @ Author: Hikaru
 * @ Create Time: 2022-06-27 04:25:58
 * @ Modified by: Hikaru
 * @ Modified time: 2022-07-22 02:10:24
 * @ Description: i@rua.moe
 */

import React, { useState } from 'react';
import style from './style.less';
import { useIntl, useModel } from 'umi';
import { ArrowLeftOutlined, BlockOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { Divider } from 'antd';
import { contractAddresses, opensea } from '@/config/contract';

const ViewChart: React.FC = () => {
  const { Account } = useModel('web3');
  const [mintCharts, setMintCharts] = useState<number[]>([]);
  const [breedCharts, setBreedCharts] = useState<number[]>([]);
  const [modal, setModal] = useState<boolean>(false);

  const { PrimeContract, OrdinaryContract } = useModel('astroContracts');

  const intl = useIntl();

  const getAllCharts = async () => {
    try {
      await PrimeContract?.tokenOfOwnerByIndex(Account, 0);
      const charts: number[] = [];
      for (let i = 0; i < 5; i++) {
        const chart = await PrimeContract?.tokenOfOwnerByIndex(Account, i);
        charts.push(chart.toNumber());
      }
      setMintCharts(charts);
      setModal(true);
    } catch (e: any) {
      console.log(e.message);
    }

    try {
      await OrdinaryContract?.tokenOfOwnerByIndex(Account, 0);
      const charts = [];
      for (let i = 0; i < 5; i++) {
        const chart = await OrdinaryContract?.tokenOfOwnerByIndex(Account, i);
        charts.push(chart.toNumber());
      }
      setBreedCharts(charts);
      setModal(true);
    } catch (e: any) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (!!Account && !!PrimeContract && !!OrdinaryContract) {
      getAllCharts();
    }
  }, [Account, PrimeContract, OrdinaryContract]);

  return (
    <>
      <div
        className={style.viewChartModal}
        onClick={() => {
          setModal(!modal);
        }}
      >
        <span>
          <BlockOutlined className={style.arrowIcon} />
          {intl.formatMessage({
            id: 'astro.viewChart.title',
            defaultMessage: 'View Chart',
          })}
        </span>
      </div>
      <div
        className={style.viewChartModalContent}
        style={{
          left: modal ? '0' : '-140px',
        }}
      >
        {!!mintCharts.length && (
          <>
            <div className={style.title}>Prime</div>
            {mintCharts.map((chart) => (
              <div
                className={style.chartItem}
                key={chart}
                onClick={() => {
                  window.open(
                    `${opensea.url}/assets/${contractAddresses.prime[4]}/${chart}`,
                    '_blank',
                  );
                }}
              >
                #{chart}
              </div>
            ))}
          </>
        )}
        {!!breedCharts.length && (
          <>
            <Divider />
            <div className={style.title}>Ordinary</div>
            {breedCharts.map((chart) => (
              <div className={style.chartItem} key={chart}>
                #{chart}
              </div>
            ))}
          </>
        )}
        <div className={style.rightButton}>
          <div
            className={style.closeBtn}
            onClick={() => {
              setModal(!modal);
            }}
          >
            <ArrowLeftOutlined />
          </div>
          <div className={style.viewMyOpensea}>
            {intl.formatMessage({
              id: 'astro.viewChart.viewMoreOnOpensea',
              defaultMessage: 'View more on Opensea',
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewChart;
