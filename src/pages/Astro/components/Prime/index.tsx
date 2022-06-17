import { Button, notification, Row, Spin, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useIntl, useModel } from 'umi';
import styles from '../../style.less';
import style from './style.less';
import type { BigNumber } from 'ethers';
import { ethers } from 'ethers';
import { extractTokenIdFromEvent } from '@/utils/astro';
import BigModal from '@/components/ParamiModal/BigModal';
import { contractAddresses, opensea } from '../../config';
import { engDay } from '@/utils/common';
import { RSAEncrypt } from '@/utils/rsa';
import { LoadingOutlined } from '@ant-design/icons';
import copy from 'copy-to-clipboard';
import Place from './Place';
import Year from './Year';
import MonthAndDay from './MonthAndDay';
import Time from './Time';
import NoLimitMonthAndDay from './NoLimitMonthAndDay';
import Countdown from 'antd/lib/statistic/Countdown';
import { infuraProvider } from '@/config/web3provider';
import PrimeAbi from '@/pages/Astro/abi/Prime.json';

const Prime: React.FC = () => {
  const { Account, ChainId } = useModel('web3');
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
  const [isLimited, setIsLimited] = useState<boolean>(false);
  const [astroSVG, setAstroSVG] = useState<string>();
  const [TokenId, setTokenId] = useState<ethers.BigNumber>();
  const [modal, setModal] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [endTime, setEndTime] = useState<number>(0);

  const intl = useIntl();

  const { PrimeContract } = useModel('astroContracts');

  useEffect(() => {
    if (!!Account && ChainId !== 4) {
      notification.error({
        message: 'Unsupported Chain',
        description: 'This feature is only supported on Rinkeby',
        duration: null,
      });
      return;
    }
  }, [ChainId, Account]);

  const CurrentDay = new Date().getDate();

  const getCurrentInfo = async () => {
    const price = await PrimeContract?.getPrice();
    const fee = await PrimeContract?.getOracleGasFee();
    const supply = await PrimeContract?.totalSupply();
    const limit = await PrimeContract?.isNoDateLimitMintBegan();
    setCurrentPrice(price);
    setCurrentFee(fee);
    setCurrentSupply(supply);
    setIsLimited(limit);
  };

  const getSalesTime = async () => {
    const provider = new ethers.providers.JsonRpcProvider(infuraProvider[4]);
    const MintContract = await new ethers.Contract(contractAddresses.prime[4], PrimeAbi, provider);

    const timeRange = await MintContract?.getSalesTimes();

    const date = new Date();
    const currentDay =
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) / 1000;

    setEndTime((timeRange[1].toNumber() + currentDay) * 1000);
  };

  useEffect(() => {
    if (!!PrimeContract && !!Account) {
      getCurrentInfo();
      getSalesTime();
      setInterval(function () {
        const date = new Date();
        if (date.getMinutes() % 10 === 0) {
          getCurrentInfo();
        }
      }, 1000);
    }
  }, [Account, PrimeContract]);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const price = await PrimeContract?.getPrice();
      const fee = await PrimeContract?.getOracleGasFee();

      const encryptStr = await RSAEncrypt(
        `${yearOfBirth},${Number(timeOfBirth[0])},${Number(timeOfBirth[1])},${Number(
          timeOfBirth[2],
        )},${Math.round(lng * 100)},${Math.round(lat * 100)},${Math.round(utcOffset * 100)}`,
      );

      const tx = await PrimeContract?.initialMint(
        ethers.utils.getAddress(Account),
        [monthOfBirth, dayOfBirth],
        encodeURIComponent(encryptStr),
        { value: ethers.BigNumber.from(price).add(ethers.BigNumber.from(fee)) },
      );

      const tokenId = await extractTokenIdFromEvent(tx);
      setTokenId(tokenId);

      setLoadSVG(true);

      const timer = setInterval(async () => {
        const svg = await PrimeContract?.tokenURI(tokenId);
        const base64Content = svg.substring('data:application/json;base64,'.length);
        const debase64Content = Buffer.from(base64Content, 'base64').toString('binary');
        const jsonContent = JSON.parse(debase64Content);
        const debaseImage = Buffer.from(
          jsonContent.image.substring('data:image/svg+xml;base64,'.length),
          'base64',
        ).toString('utf8');
        if (debaseImage.indexOf('generating') === -1) {
          const replaceImage = debaseImage
            .replace(/\<g\>.*\<path.*?\<\/g\>/, '')
            .replace(/\<rect.*?stroke=\"#b49d5d\".*?\/>/, '')
            .replace(
              /\<radialGradient id=\"darkLight\"\>.*?\<\/radialGradient\>/,
              '<radialGradient id="darkLight"><stop offset="0%" stop-color="#707070" /><stop offset="3%" stop-color="#1b1b1b" /><stop offset="8%" stop-color="#000000" /></radialGradient>',
            );
          const baseImg = Buffer.from(replaceImage).toString('base64');
          setAstroSVG('data:image/svg+xml;base64,' + baseImg);
          setLoadSVG(false);
          clearInterval(timer);
          setModal(true);
        }
      }, 3000);

      setLoading(false);
    } catch (e: any) {
      console.log(e?.error?.message || e?.message || e);
      notification.error({
        key: 'unknowError',
        message: e?.error?.message || e?.message || e,
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
                {currentPrice
                  ? ethers.utils.formatEther(ethers.BigNumber.from(currentPrice))
                  : '--'}
              </div>
              <div className={styles.ethIcon}>
                <img src={'/images/crypto/ethereum-eth-logo.svg'} alt="eth" />
                <span>ETH</span>
              </div>
            </div>
            <div className={styles.totalContainer}>
              <div className={styles.currentTotal}>
                {intl.formatMessage(
                  {
                    id: 'astro.total',
                    defaultMessage: 'Total cost {total} (Oracle operator gas fee: {fee})',
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
              <div className={style.auctionDetailWrapper}>
                <div className={style.auctionDetailTitle}>
                  {intl.formatMessage({
                    id: 'astro.duration',
                    defaultMessage: 'Duration',
                  })}
                </div>
                <div className={style.auctionDetailContent}>900 Min</div>
              </div>
            </div>
            <div className={style.nftContainer}>
              <Countdown className={style.countdown} value={endTime} />
              {step === 1 && (
                <Place
                  lat={lat}
                  lng={lng}
                  utcOffset={utcOffset}
                  setStep={setStep}
                  setLat={setLat}
                  setLng={setLng}
                  setUTCOffset={setUTCOffset}
                />
              )}
              {step === 2 && (
                <Year yearOfBirth={yearOfBirth} setStep={setStep} setYearOfBirth={setYearOfBirth} />
              )}
              {step === 3 && !isLimited && (
                <MonthAndDay
                  yearOfBirth={yearOfBirth}
                  monthOfBirth={monthOfBirth}
                  dayOfBirth={dayOfBirth}
                  setStep={setStep}
                  setMonthOfBirth={setMonthOfBirth}
                  setDayOfBirth={setDayOfBirth}
                />
              )}
              {step === 3 && isLimited && (
                <NoLimitMonthAndDay
                  yearOfBirth={yearOfBirth}
                  monthOfBirth={monthOfBirth}
                  dayOfBirth={dayOfBirth}
                  setStep={setStep}
                  setMonthOfBirth={setMonthOfBirth}
                  setDayOfBirth={setDayOfBirth}
                />
              )}
              {step === 4 && (
                <Time timeOfBirth={timeOfBirth} setStep={setStep} setTimeOfBirth={setTimeOfBirth} />
              )}
              {step === 5 && (
                <>
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
                  </Row>
                  <Row gutter={[48, 48]}>
                    <div className={style.buttons}>
                      {!loadSVG && !astroSVG && (
                        <Button
                          size="large"
                          shape="round"
                          type="primary"
                          className={style.button}
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
                  </Row>
                </>
              )}
            </div>
          </div>
        </div>
        <div className={styles.mintCount}>
          {intl.formatMessage(
            {
              id: 'astro.subTitle',
              defaultMessage: 'Gen 0 MetaAstro already minted: {minted}/{total}',
            },
            {
              minted: currentSupply?.toString(),
              total: '366',
            },
          )}
        </div>
      </div>
      <BigModal
        visable={modal}
        title={undefined}
        content={
          <div className={style.modalContainer}>
            <div className={style.tipContainer}>
              Congratulations!
              <br />
              You are the god of
              <br />
              <div className={style.monthAndDay}>
                {monthOfBirth}.{dayOfBirth}
              </div>
            </div>
            <div className={style.chartContainer}>
              <div className={style.chart}>
                <img src={astroSVG} />
              </div>
            </div>
            <Button
              block
              type="link"
              size="large"
              onClick={() => {
                copy(`${window.location.origin}/breed?tokenID=${TokenId?.toString()}`);
                message.success('Copy Success!');
              }}
              className={style.copyBreedLink}
            >
              {intl.formatMessage({
                id: 'astro.copyBreedLink',
                defaultMessage: 'Copy Breed Link',
              })}
            </Button>
            <Button
              block
              type="link"
              size="large"
              onClick={() => {
                window.open(
                  `${opensea.url}/assets/${contractAddresses.prime[4]}/${TokenId?.toString()}`,
                  '_blank',
                );
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
  );
};

export default Prime;
