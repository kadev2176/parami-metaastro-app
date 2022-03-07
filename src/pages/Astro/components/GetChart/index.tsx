import { Button, DatePicker, notification, TimePicker, message, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import Geosuggest from 'react-geosuggest';
import { useIntl, useModel } from 'umi';
import styles from '../../style.less';
import style from './style.less';
import type { BigNumber } from 'ethers';
import { ethers } from 'ethers';
import { extractTokenIdFromEvent } from '@/utils/astro';
import BigModal from '@/components/ParamiModal/BigModal';
import { contractAddresses, opensea } from '../../config';
import { errorParse } from '@/utils/common';
import { LoadingOutlined } from '@ant-design/icons';

const GetChart: React.FC<{
    setSpeedup: (value: React.SetStateAction<boolean>) => void;
    setPullup: (value: React.SetStateAction<boolean>) => void;
}> = ({ setSpeedup, setPullup }) => {
    const { metaMaskAccount, metaMaskChainId } = useModel('metaMask');
    const { walletConnectAccount, walletConnectChainId } = useModel('walletconnect');
    const [suggestList, setSuggestList] = useState<boolean>(false);
    const [lat, setLat] = useState<number>(0);
    const [lng, setLng] = useState<number>(0);
    const [utcOffset, setUTCOffset] = useState<number>(0);
    const [dateOfBirth, setDateOfBirth] = useState<string[]>([]);
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
        MintContract
    } = useModel('astroContracts');

    useEffect(() => {
        if (!!metaMaskAccount && metaMaskChainId !== 4) {
            notification.error({
                message: 'Unsupported Chain',
                description: 'This feature is only supported on Rinkeby',
                duration: null
            });
            return;
        }
    }, [metaMaskChainId, metaMaskAccount]);

    useEffect(() => {
        if (!!walletConnectAccount && walletConnectChainId !== 4) {
            notification.error({
                message: 'Unsupported Chain',
                description: 'This feature is only supported on Rinkeby',
                duration: null
            });
            return;
        }
    }, [walletConnectChainId, walletConnectAccount]);

    const getCurrentInfo = async () => {
        const price = await MintContract?.getPrice();
        const fee = await MintContract?.getOracleGasFee();
        const supply = await MintContract?.totalSupply();
        setCurrentPrice(price);
        setCurrentFee(fee);
        setCurrentSupply(supply);
    };

    const isAvailable = async () => {
        const currentDay = new Date().getDate();
        const months = [];
        for (let month = 0; month < 12; month++) {
            const tokenId = await MintContract?.getTokenIdByMonthAndDay(month + 1, currentDay);
            if (tokenId.toNumber() === 0) {
                months.push(month);
            }
        }
        setAllowMonth(months);
        setAvailableLoading(false);
    };

    useEffect(() => {
        if (!!MintContract && !!metaMaskAccount) {
            getCurrentInfo();
            isAvailable();
        }
    }, [metaMaskAccount, MintContract]);

    useEffect(() => {
        if (!!MintContract && !!walletConnectAccount) {
            getCurrentInfo();
            isAvailable();
        }
    }, [walletConnectAccount, MintContract]);

    const handleSubmit = async () => {
        setLoading(true);
        setSpeedup(true);
        try {
            const tx = await MintContract?.initialMint(
                ethers.utils.getAddress(metaMaskAccount || walletConnectAccount),
                [Number(dateOfBirth[0]), Number(dateOfBirth[1]), Number(dateOfBirth[2]), Number(timeOfBirth[0]), Number(timeOfBirth[1]), Number(timeOfBirth[2])],
                [Math.round(lat * 100), Math.round(lng * 100), Math.round(utcOffset * 100)],
                { value: ethers.BigNumber.from(currentPrice).add(ethers.BigNumber.from(currentFee)) },
            );

            const tokenId = await extractTokenIdFromEvent(tx);
            setTokenId(tokenId);

            setLoadSVG(true);

            const timer = setInterval(async () => {
                const svg = await MintContract?.tokenURI(tokenId);
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
                    setPullup(true);
                    setModal(true);
                };
            }, 3000);

            setLoading(false);
            isAvailable();
        } catch (e: any) {
            const error = errorParse(e.message).body?.message;
            message.error(error);
            setLoading(false);
            setSpeedup(false);
            setPullup(false);
        }
    };

    return (
        <>
            <div className={style.getchartContainer}>
                <div className={styles.contentContainer}>
                    <div className={style.flexContainer}>
                        <div className={styles.priceContainer}>
                            <div className={styles.currentPrice}>
                                {currentPrice ? ethers.utils.formatEther(ethers.BigNumber.from(currentPrice)) : '0'}
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
                                    defaultMessage: 'Total need {total} (Oracle operator gas fee: {fee})',
                                }, {
                                    total: currentPrice && currentFee ? Math.floor(Number(ethers.utils.formatEther(ethers.BigNumber.from(currentPrice).add(ethers.BigNumber.from(currentFee)))) * 100) / 100 : '0',
                                    fee: currentFee ? Math.floor(Number(ethers.utils.formatEther(ethers.BigNumber.from(currentFee))) * 100) / 100 : '0',
                                })}
                            </div>
                        </div>
                        <div className={styles.mintCount}>
                            {intl.formatMessage({
                                id: 'astro.subTitle',
                                defaultMessage: 'NFTs already minted: {minted}/{total}',
                            }, {
                                minted: currentSupply?.toString(),
                                total: '366',
                            })}
                        </div>
                        <div className={style.inputContainer}>
                            <div className={style.userInputContainer}>
                                {intl.formatMessage({
                                    id: 'astro.userinput',
                                    defaultMessage: 'I was born in {city}, on {ddyymm} at {hhmmss}.'
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
                                    ddyymm: (
                                        <>
                                            {AvailableLoading ? (
                                                <Spin
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
                                                />
                                            ) : (
                                                <DatePicker
                                                    inputReadOnly
                                                    className={style.input}
                                                    allowClear={false}
                                                    suffixIcon={undefined}
                                                    picker="month"
                                                    format={['YYYY/MM/DD', 'YY/MM/DD']}
                                                    disabledDate={(date) => !AllowMonth.includes(date.month())}
                                                    onChange={(_, dateString) => {
                                                        setDateOfBirth(dateString.split('/'));
                                                    }}
                                                    placeholder={intl.formatMessage({
                                                        id: 'astro.date.placeholder',
                                                        defaultMessage: 'YYYY/MM/DD',
                                                    })}
                                                />
                                            )}
                                        </>
                                    ),
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
                            <div className={style.buttons}>
                                {!loadSVG && (
                                    <Button
                                        size='large'
                                        shape='round'
                                        type='primary'
                                        className={style.button}
                                        disabled={!lat || !lng || !utcOffset || !dateOfBirth.length || !timeOfBirth.length}
                                        loading={loading}
                                        onClick={() => {
                                            handleSubmit();
                                        }}
                                    >
                                        {intl.formatMessage({
                                            id: 'astro.getURChart',
                                            defaultMessage: 'Get UR Chart',
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
                                            defaultMessage: 'View My Chart',
                                        })}
                                    </Button>
                                )}
                            </div>
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
                                window.open(`${opensea.url}/assets/${contractAddresses.mint[4]}/${TokenId?.toString()}`, '_blank');
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
                    setSpeedup(false);
                    setPullup(false);
                }}
            />
        </>
    )
}

export default GetChart;
