import { Button, DatePicker, notification, TimePicker, message, Spin, InputNumber } from 'antd';
import React, { useEffect, useState } from 'react';
import Geosuggest from 'react-geosuggest';
import { useIntl, useModel } from 'umi';
import moment from 'moment';
import styles from '../../style.less';
import style from './style.less';
import SelectWallet from '../SelectWallet/selectWallet';
import { ethers } from 'ethers';
import { extractTokenIdFromEvent } from '@/utils/astro';
import BigModal from '@/components/ParamiModal/BigModal';
import { contractAddresses } from '../../config';

const BreedFrom: React.FC = () => {
    const { account, chainId, provider, signer } = useModel('metaMask');
    const [suggestList, setSuggestList] = useState<boolean>(false);
    const [lat, setLat] = useState<number>(0);
    const [lng, setLng] = useState<number>(0);
    const [utcOffset, setUTCOffset] = useState<number>(0);
    const [dateOfBirth, setDateOfBirth] = useState<string[]>([]);
    const [timeOfBirth, setTimeOfBirth] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadSVG, setLoadSVG] = useState<boolean>(false);
    const [WalletReady, setWalletReady] = useState<boolean>(false);
    const [currentPrice, setCurrentPrice] = useState<bigint>();
    const [currentFee, setCurrentFee] = useState<bigint>();
    const [astroSVG, setAstroSVG] = useState<string>();
    const [TokenId, setTokenId] = useState<ethers.BigNumber>();
    const [BreedTokenId, setBreedTokenId] = useState<number>();
    const [modal, setModal] = useState<boolean>(false);

    const intl = useIntl();

    const {
        AstroContract
    } = useModel('astroContracts');

    useEffect(() => {
        console.log('chainId', chainId);
        console.log(account);
        if (chainId !== 1 && chainId !== 4) {
            notification.error({
                message: 'Unsupported Chain',
                description: 'This feature is only supported on mainnet and rinkeby',
                duration: null
            });
            setWalletReady(false);
            return;
        }
        if (account && account !== '') {
            setWalletReady(true);
        }
    }, [chainId, account]);

    const getCurrentPrice = async () => {
        const price = await AstroContract?.getPrice();
        const fee = await AstroContract?.fee();
        setCurrentPrice(price);
        setCurrentFee(fee);
    };

    useEffect(() => {
        if (AstroContract && account && account !== '') {
            getCurrentPrice();
        }
    }, [account, AstroContract]);

    const handleSubmit = async () => {
        if (!provider || !signer) return;
        setLoading(true);
        try {
            const tx = await AstroContract?.breedFrom(
                BreedTokenId,
                [Number(dateOfBirth[0]), Number(dateOfBirth[1]), Number(dateOfBirth[2]), Number(timeOfBirth[0]), Number(timeOfBirth[1]), Number(timeOfBirth[2])],
                [Math.round(lat * 100), Math.round(lng * 100), Math.round(utcOffset * 100)],
                { value: ethers.BigNumber.from(currentPrice).add(ethers.BigNumber.from(currentFee)) },
            );

            const tokenId = await extractTokenIdFromEvent(tx);
            setTokenId(tokenId);

            setLoadSVG(true);

            const timer = setInterval(async () => {
                const svg = await AstroContract?.tokenURI(tokenId);
                const base64Content = svg.substring("data:application/json;base64,".length);
                const debase64Content = Buffer.from(base64Content, 'base64').toString('binary');
                console.log(debase64Content);
                if (svg.indexOf('generating') === -1) {
                    const jsonContent = JSON.parse(debase64Content);
                    setAstroSVG(jsonContent.image);
                    setLoadSVG(false);
                    clearInterval(timer);
                    setModal(true);
                };
            }, 3000);

            setLoading(false);
        } catch (e: any) {
            message.error(e.message);
            setLoading(false);
        }
    };

    return (
        <>
            <div className={style.getchartContainer}>
                <div className={styles.contentContainer}>
                    <div className={style.flexContainer}>
                        {account && WalletReady ? (
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
                                            <DatePicker
                                                defaultValue={moment('2015-01-01', 'YYYY-MM-DD')}
                                                className={style.input}
                                                allowClear={false}
                                                suffixIcon={undefined}
                                                onChange={(_, dateString) => {
                                                    setDateOfBirth(dateString.split('-'));
                                                }}
                                            />
                                        ),
                                        hhmmss: (
                                            <TimePicker
                                                defaultValue={moment('13:30:56', 'HH:mm:ss')}
                                                className={style.input}
                                                allowClear={false}
                                                suffixIcon={undefined}
                                                onChange={(_, timeString) => {
                                                    setTimeOfBirth(timeString.split(':'));
                                                }}
                                            />
                                        )
                                    })}
                                </div>
                                <div className={style.breedTokenIdContainer}>
                                    {intl.formatMessage({
                                        id: 'astro.breed',
                                        defaultMessage: 'Breed From(TokenID): {tokenId}',
                                    }, {
                                        tokenId: (
                                            <InputNumber
                                                size='large'
                                                className={style.input}
                                                onChange={(e: any) => {
                                                    setBreedTokenId(e);
                                                }}
                                            />
                                        )
                                    })}
                                </div>
                                {loadSVG && (
                                    <Spin
                                        size="large"
                                        className={style.generating}
                                        tip={intl.formatMessage({
                                            id: 'astro.generating',
                                            defaultMessage: 'Generating...',
                                        })}
                                    />
                                )}
                                {!loadSVG && !astroSVG && (
                                    <Button
                                        size='large'
                                        shape='round'
                                        type='primary'
                                        className={style.button}
                                        disabled={!lat || !lng || !utcOffset || !BreedTokenId || !dateOfBirth.length || !timeOfBirth.length}
                                        loading={loading}
                                        onClick={() => {
                                            handleSubmit();
                                        }}
                                    >
                                        {intl.formatMessage({
                                            id: 'astro.breedURChart',
                                            defaultMessage: 'Breed UR Chart',
                                        })}
                                    </Button>
                                )}
                            </div>
                        ) : (
                            <SelectWallet />
                        )}
                    </div>
                </div>
            </div>
            <BigModal
                visable={modal}
                title={undefined}
                content={
                    <div className={style.modalContainer}>
                        <div className={style.chartContainer}>
                            <img src={astroSVG} />
                        </div>
                        <Button
                            block
                            type='link'
                            size='large'
                            onClick={() => {
                                window.open(`https://testnets.opensea.io/assets/${contractAddresses.astro[4]}/${TokenId?.toString()}`, '_blank');
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
                    borderRadius: 10,
                    background: 'url(/images/background/tarot.svg) #000',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                close={() => {
                    setModal(false);
                }}
            />
        </>
    )
}

export default BreedFrom;
