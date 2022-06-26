import React, { useEffect, useState } from 'react';
import styles from '@/style/common.less';
import style from './style.less';
import { useModel, useIntl, history } from 'umi';
import queryToStr from 'query-string';
import Background from '@/components/Background';
import type { BigNumber } from 'ethers';
import { ethers } from 'ethers';
import { convertMonth } from '@/utils/common';
import Place from '@/components/Place';
import Year from '@/components/Year';
import Time from '@/components/Time';
import { RSAEncrypt } from '@/utils/rsa';
import { extractTokenIdFromEvent } from '@/utils/astro';
import { Button, message, notification } from 'antd';
import Price from './Price';
import BigModal from '@/components/ParamiModal/BigModal';
import copy from 'copy-to-clipboard';
import { contractAddresses, opensea } from '@/config/contract';

const Breed: React.FC = () => {
  const { Account, ChainId, connect } = useModel('web3');
  const { OrdinaryContract } = useModel('astroContracts');
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const [utcOffset, setUTCOffset] = useState<number>(0);
  const [yearOfBirth, setYearOfBirth] = useState<number>();
  const [dateOfBirth, setDateOfBirth] = useState<string[]>([]);
  const [timeOfBirth, setTimeOfBirth] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadSVG, setLoadSVG] = useState<boolean>(false);
  const [currentPrice, setCurrentPrice] = useState<BigNumber>();
  const [currentFee, setCurrentFee] = useState<BigNumber>();
  const [astroSVG, setAstroSVG] = useState<string>();
  const [newTokenId, setNewTokenId] = useState<BigNumber>();
  const [modal, setModal] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);

  const intl = useIntl();

  const query: any = queryToStr.parse(window.location.search);

  const getCurrentInfo = async () => {
    const fee = await OrdinaryContract?.getOracleGasFee();
    const price = await OrdinaryContract?.getBreedConfig(query?.tokenID);

    if (!!price) {
      setCurrentPrice(price[1]);
    }

    if (!!fee) {
      setCurrentFee(fee);
    }
  };

  const getPrimeToken = async () => {
    try {
      const res = await OrdinaryContract?.getAstroArgsOf(query?.tokenID);
      if (res?.exists) {
        setDateOfBirth(res?.monthAndDay);
      } else {
        notification.error({
          message: intl.formatMessage({
            id: 'astro.error.notFound',
            defaultMessage: 'Not found this token ID, please check it again',
          }),
          duration: null,
        });
        history.push('/');
      }
    } catch (e: any) {
      notification.error({
        message: intl.formatMessage({
          id: 'astro.error.notFound',
          defaultMessage: 'Not found this token ID, please check it again',
        }),
        duration: null,
      });
      history.push('/');
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const fee = await OrdinaryContract?.getOracleGasFee();
      const price = await OrdinaryContract?.getBreedConfig(query?.tokenID);

      const encryptStr = await RSAEncrypt(
        `${Number(yearOfBirth)},${Number(timeOfBirth[0])},${Number(timeOfBirth[1])},${Number(
          timeOfBirth[2],
        )},${Math.round(lng * 100)},${Math.round(lat * 100)},${Math.round(utcOffset * 100)}`,
      );

      const tx = await OrdinaryContract?.breedFrom(
        query?.tokenID,
        [Number(dateOfBirth[0]), Number(dateOfBirth[1])],
        encodeURIComponent(encryptStr),
        { value: ethers.BigNumber.from(price[1]).add(ethers.BigNumber.from(fee)) },
      );

      const tokenId = await extractTokenIdFromEvent(tx);
      setNewTokenId(tokenId);

      setLoadSVG(true);

      const timer = setInterval(async () => {
        const svg = await OrdinaryContract?.tokenURI(tokenId);
        const base64Content = svg.substring('data:application/json;base64,'.length);
        const debase64Content = Buffer.from(base64Content, 'base64').toString('binary');
        const jsonContent = JSON.parse(debase64Content);
        const debaseImage = Buffer.from(
          jsonContent.image.substring('data:image/svg+xml;base64,'.length),
          'base64',
        ).toString('utf8');
        if (debaseImage.indexOf('generating') === -1) {
          const replaceImage = debaseImage
            .replace(/\<path.*?/, '')
            .replace(/\<rect.*?fill=\"none\".*?\/>/, '')
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
    if (!Account) {
      connect();
    }
  }, [Account]);

  useEffect(() => {
    if (!!OrdinaryContract && !!Account) {
      getCurrentInfo();
      getPrimeToken();
      setInterval(function () {
        const date = new Date();
        if (date.getMinutes() % 10 === 0) {
          getCurrentInfo();
        }
      }, 1000);
    }
  }, [Account, OrdinaryContract]);

  return (
    <>
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
                  phase: 'II',
                },
              )}
            </div>
            <div className={style.genesisOfTheGod}>
              {intl.formatMessage({
                id: 'astro.continuation',
                defaultMessage: 'Continuation of the God',
              })}
            </div>
          </div>
          <div className={style.contentContainer}>
            <div className={style.mainTitleContainer}>
              <div className={style.beTheMetaAstroGod}>
                {intl.formatMessage(
                  {
                    id: 'astro.beTheMetaAstroGod',
                    defaultMessage: 'Be the MetaAstro God of {month} {day}',
                  },
                  {
                    month: convertMonth(Number(dateOfBirth[0])),
                    day: dateOfBirth[1],
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
            <div className={style.nftContainer}>
              {step === 1 && (
                <Place
                  breed
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
                <Year
                  breed
                  yearOfBirth={yearOfBirth}
                  setStep={setStep}
                  setYearOfBirth={setYearOfBirth}
                />
              )}
              {step === 3 && (
                <Time
                  breed
                  timeOfBirth={timeOfBirth}
                  setStep={setStep}
                  setTimeOfBirth={setTimeOfBirth}
                />
              )}
              {step === 4 && (
                <Price
                  currentPrice={currentPrice}
                  currentFee={currentFee}
                  loadSVG={loadSVG}
                  loading={loading}
                  astroSVG={astroSVG}
                  lat={lat}
                  lng={lng}
                  utcOffset={utcOffset}
                  yearOfBirth={yearOfBirth}
                  dateOfBirth={dateOfBirth}
                  timeOfBirth={timeOfBirth}
                  setModal={setModal}
                  handleSubmit={handleSubmit}
                />
              )}
            </div>
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
                {dateOfBirth[0]}/{dateOfBirth[1]}
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
                copy(`${window.location.origin}/breed?tokenID=${newTokenId?.toString()}`);
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
                  `${opensea.url}/assets/${contractAddresses.prime[4]}/${newTokenId?.toString()}`,
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

export default Breed;
