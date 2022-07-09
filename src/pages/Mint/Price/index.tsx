import styles from '@/style/components.less';
import { StarFilled } from '@ant-design/icons';
import { Button, Spin } from 'antd';
import Countdown from 'antd/lib/statistic/Countdown';
import type { BigNumber } from 'ethers';
import { ethers } from 'ethers';
import React from 'react';
import { useIntl } from 'umi';
import style from './style.less';

const Price: React.FC<{
  endTime: number;
  currentPrice: BigNumber | undefined;
  currentFee: BigNumber | undefined;
  loadSVG: boolean;
  loading: boolean;
  astroSVG: string | undefined;
  lat: number;
  lng: number;
  utcOffset: number;
  yearOfBirth: number | undefined;
  monthOfBirth: number | undefined;
  dayOfBirth: number | undefined;
  timeOfBirth: string[];
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: () => Promise<void>;
}> = ({
  endTime,
  currentPrice,
  currentFee,
  loadSVG,
  loading,
  astroSVG,
  lat,
  lng,
  utcOffset,
  yearOfBirth,
  monthOfBirth,
  dayOfBirth,
  timeOfBirth,
  setModal,
  handleSubmit,
}) => {
  const intl = useIntl();

  return (
    <div
      className={styles.nftWrapper}
      style={{
        backgroundImage: 'none',
      }}
    >
      <h1 className={style.countdown}>
        Dutch Auction Count:{' '}
        <Countdown
          value={endTime}
          format="HH:mm:ss"
          style={{
            display: 'inline-block',
          }}
          onFinish={() => {
            window.location.reload();
          }}
        />
      </h1>
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
              defaultMessage: 'Total cost {total} ETH (Oracle Fee: {fee} ETH)',
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
      <div className={style.auctionDetailContainer}>
        <div className={style.auctionDetailWrapper}>
          <div className={style.auctionDetailTitle}>
            {intl.formatMessage({
              id: 'astro.ceilingPrice',
              defaultMessage: 'Ceiling Price',
            })}
          </div>
          <div className={style.auctionDetailContent}>1000 ETH</div>
        </div>
        <div className={style.auctionDetailWrapper}>
          <div className={style.auctionDetailTitle}>
            {intl.formatMessage({
              id: 'astro.restingPrice',
              defaultMessage: 'Resting Price',
            })}
          </div>
          <div className={style.auctionDetailContent}>1 ETH</div>
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
              !monthOfBirth ||
              !dayOfBirth ||
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
