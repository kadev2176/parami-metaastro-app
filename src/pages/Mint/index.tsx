/**
 * @ Author: Hikaru
 * @ Create Time: 2022-07-08 05:21:42
 * @ Modified by: Hikaru
 * @ Modified time: 2022-07-22 02:10:10
 * @ Description: i@rua.moe
 */

import Background from '@/components/Background';
import MonthAndDay from '@/components/MonthAndDay';
import NoLimitMonthAndDay from '@/components/NoLimitMonthAndDay';
import BigModal from '@/components/ParamiModal/BigModal';
import Place from '@/components/Place';
import Time from '@/components/Time';
import Year from '@/components/Year';
import { contractAddresses, opensea } from '@/config/contract';
import BasicLayout from '@/layout/BasicLayout';
import styles from '@/style/common.less';
import { extractTokenIdFromEvent } from '@/utils/astro';
import { convertMonth, monthList } from '@/utils/common';
import { RSAEncrypt } from '@/utils/rsa';
import { Button, Carousel, message, notification } from 'antd';
import copy from 'copy-to-clipboard';
import type { BigNumber } from 'ethers';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { history, useIntl, useModel } from 'umi';
import Price from './Price';
import style from './style.less';

const Mint: React.FC = () => {
  const { Account, ChainId, connect } = useModel('web3');
  const { PrimeContract } = useModel('astroContracts');
  const [loading, setLoading] = useState<boolean>(false);
  const [loadSVG, setLoadSVG] = useState<boolean>(false);
  const [isLimited, setIsLimited] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const [utcOffset, setUTCOffset] = useState<number>(0);
  const [yearOfBirth, setYearOfBirth] = useState<number>();
  const [monthOfBirth, setMonthOfBirth] = useState<number>();
  const [dayOfBirth, setDayOfBirth] = useState<number>();
  const [timeOfBirth, setTimeOfBirth] = useState<string[]>([]);
  const [currentPrice, setCurrentPrice] = useState<BigNumber>();
  const [currentFee, setCurrentFee] = useState<BigNumber>();
  const [currentSupply, setCurrentSupply] = useState<BigNumber>();
  const [TokenId, setTokenId] = useState<BigNumber>();
  const [astroSVG, setAstroSVG] = useState<string>();
  const [step, setStep] = useState<number>(1);
  const [endTime, setEndTime] = useState<number>(0);

  const intl = useIntl();

  const CurrentDay = new Date().getDate();

  const getSalesTime = async () => {
    const timeRange = await PrimeContract?.getSalesTimes();

    const date = new Date();
    const now = date.getTime() / 1000;
    const currentDay =
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) / 1000;

    setEndTime((timeRange[1].toNumber() + currentDay) * 1000);

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
        ethers.utils.getAddress(Account!),
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

  useEffect(() => {
    if (ChainId !== 4) {
      notification.error({
        message: 'Unsupported Chain',
        description: 'This feature is only supported on Rinkeby',
        duration: null,
      });
      history.push('/');
      return;
    }
  }, [ChainId]);

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

  useEffect(() => {
    if (!Account) {
      try {
        connect();
      } catch (e: any) {
        notification.error({
          message: e?.error?.message || e?.message || e,
        });
      }
    }
  }, [Account]);

  const monthCountdown = (
    <Carousel
      effect="scrollx"
      dots={false}
      className={style.monthCount}
      autoplay
      autoplaySpeed={1000}
      dotPosition="left"
    >
      {monthList().map((item) => (
        <div className={style.monthCountItem} key={item}>
          {item}
        </div>
      ))}
    </Carousel>
  );

  return (
    <BasicLayout>
      <div className={styles.mainContainer}>
        <Background complex={false} />
        <div className={style.getchartContainer}>
          <div className={style.topContainer}>
            <div className={style.currentPhase}>
              {intl.formatMessage(
                {
                  id: 'astro.phase',
                  defaultMessage: 'MetaAstro Phase {phase}',
                },
                {
                  phase: 'I',
                },
              )}
            </div>
            <span className={style.colon}>:</span>
            <div className={style.genesisOfTheGod}>
              {intl.formatMessage({
                id: 'astro.genesis',
                defaultMessage: 'Genesis of the God',
              })}
            </div>
          </div>
          <div className={style.contentContainer}>
            <div className={style.mainTitleContainer}>
              <div className={style.beTheMetaAstroGod}>
                {!monthOfBirth
                  ? intl.formatMessage(
                      {
                        id: 'astro.beTheMetaAstroGod',
                        defaultMessage: 'Be the MetaAstro God of {monthAndDay}',
                      },
                      {
                        monthAndDay: (
                          <div
                            className={style.monthAndDay}
                            style={{
                              color: monthOfBirth ? '#ff5b00' : 'inherit',
                            }}
                          >
                            {monthOfBirth ? (
                              <div className={style.monthCountStatic}>
                                <div className={style.monthCountItem}>
                                  {convertMonth(monthOfBirth)}
                                </div>
                              </div>
                            ) : (
                              monthCountdown
                            )}{' '}
                            {CurrentDay}
                          </div>
                        ),
                      },
                    )
                  : intl.formatMessage(
                      {
                        id: 'astro.youChooseToBeTheMetaAstroGod',
                        defaultMessage: 'You choose to be the MetaAstro God of {monthAndDay}',
                      },
                      {
                        monthAndDay: (
                          <div
                            className={style.monthAndDay}
                            style={{
                              color: monthOfBirth ? '#ff5b00' : 'inherit',
                            }}
                          >
                            {monthOfBirth ? (
                              <div className={style.monthCountStatic}>
                                <div className={style.monthCountItem}>
                                  {convertMonth(monthOfBirth)}
                                </div>
                              </div>
                            ) : (
                              monthCountdown
                            )}{' '}
                            {CurrentDay}
                          </div>
                        ),
                      },
                    )}
              </div>
              <div className={style.mintYourSoulNFT}>
                {intl.formatMessage({
                  id: 'astro.mintYourSoulBoundNFTToday',
                  defaultMessage: 'Mint your soul-bound NFT today',
                })}
              </div>
            </div>
            <div
              className={style.nftContainer}
              style={{
                backgroundColor: step === 5 ? 'transparent' : 'rgba(255, 255, 255, 0.07)',
                border: step === 5 ? 'unset' : '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
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
                <Price
                  endTime={endTime}
                  currentPrice={currentPrice}
                  currentFee={currentFee}
                  loadSVG={loadSVG}
                  loading={loading}
                  astroSVG={astroSVG}
                  lat={lat}
                  lng={lng}
                  utcOffset={utcOffset}
                  yearOfBirth={yearOfBirth}
                  monthOfBirth={monthOfBirth}
                  dayOfBirth={dayOfBirth}
                  timeOfBirth={timeOfBirth}
                  setModal={setModal}
                  handleSubmit={handleSubmit}
                />
              )}
            </div>
          </div>
          <div className={style.mintCount}>
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
                {monthOfBirth}/{dayOfBirth}
              </div>
            </div>
            <div className={style.chartContainer}>
              <div className={style.chart}>
                <img src={astroSVG} alt="Astro" />
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
    </BasicLayout>
  );
};

export default Mint;
