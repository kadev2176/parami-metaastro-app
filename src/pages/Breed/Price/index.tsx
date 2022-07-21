/**
 * @ Author: Hikaru
 * @ Create Time: 2022-06-27 04:42:45
 * @ Modified by: Hikaru
 * @ Modified time: 2022-07-22 00:22:31
 * @ Description: i@rua.moe
 */

import React from 'react';
import { useIntl } from 'umi';
import styles from '@/style/components.less';
import style from './style.less';
import type { BigNumber } from 'ethers';
import { ethers } from 'ethers';
import { Button, Spin } from 'antd';
import { StarFilled } from '@ant-design/icons';

const Price: React.FC<{
  currentPrice: BigNumber | undefined;
  currentFee: BigNumber | undefined;
  loadSVG: boolean;
  loading: boolean;
  astroSVG: string | undefined;
  lat: number;
  lng: number;
  utcOffset: number;
  yearOfBirth: number | undefined;
  dateOfBirth: string[];
  timeOfBirth: string[];
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: () => Promise<void>;
}> = ({
  currentPrice,
  currentFee,
  loadSVG,
  loading,
  astroSVG,
  lat,
  lng,
  utcOffset,
  yearOfBirth,
  dateOfBirth,
  timeOfBirth,
  setModal,
  handleSubmit,
}) => {
  const intl = useIntl();

  return (
    <div className={styles.nftWrapper}>
      <div className={style.priceContainer}>
        <div className={style.currentPrice}>
          {currentPrice ? ethers.utils.formatEther(ethers.BigNumber.from(currentPrice)) : '--'}
        </div>
        <div className={style.ethIcon}>
          <img src={'/images/crypto/ethereum-eth-logo.svg'} alt="eth" />
          <span>ETH</span>
        </div>
      </div>
      <div className={style.totalContainer}>
        <div className={style.currentTotal}>
          {intl.formatMessage(
            {
              id: 'astro.total',
              defaultMessage: 'Total cost {total}ETH (Oracle operator gas fee: {fee}ETH)',
            },
            {
              total:
                currentPrice && currentFee
                  ? Math.floor(
                      Number(
                        ethers.utils.formatEther(
                          ethers.BigNumber.from(currentPrice).add(
                            ethers.BigNumber.from(currentFee),
                          ),
                        ),
                      ) * 100,
                    ) / 100
                  : '--',
              fee: currentFee
                ? Math.floor(
                    Number(ethers.utils.formatEther(ethers.BigNumber.from(currentFee))) * 100,
                  ) / 100
                : '--',
            },
          )}
        </div>
      </div>
      {loadSVG && (
        <Spin
          size="large"
          className={style.generating}
          indicator={
            <StarFilled
              style={{
                color: '#fff',
                marginLeft: '10px',
                marginRight: '10px',
              }}
              spin
            />
          }
          tip={
            <div
              style={{
                color: '#fff',
              }}
            >
              {intl.formatMessage({
                id: 'astro.generating',
                defaultMessage: 'Waiting for oracle...',
              })}
            </div>
          }
        />
      )}
      <div className={styles.buttons}>
        {!loadSVG && !astroSVG && (
          <Button
            size="large"
            shape="round"
            type="primary"
            className={styles.button}
            disabled={
              !lat ||
              !lng ||
              !utcOffset ||
              !yearOfBirth ||
              !dateOfBirth.length ||
              !timeOfBirth.length
            }
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
            size="large"
            shape="round"
            type="primary"
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
    </div>
  );
};

export default Price;
