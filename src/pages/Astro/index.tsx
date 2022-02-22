import React, { useEffect, useState } from 'react';
import styles from '@/style/common.less';
import style from './style.less';
import Background from './components/Background';
import GetChart from './components/GetChart';
import About from './components/About';
import { useIntl, useModel } from 'umi';
import type { BigNumber } from 'ethers';
import { ethers } from 'ethers';
import BreedFrom from './components/BreedFrom';

const Astro: React.FC = () => {
    const { account } = useModel('metaMask');
    const [currentPrice, setCurrentPrice] = useState<BigNumber>();
    const [currentFee, setCurrentFee] = useState<BigNumber>();
    const [currentSupply, setCurrentSupply] = useState<BigNumber>();

    const intl = useIntl();

    const {
        AstroContract
    } = useModel('astroContracts');

    const getCurrentPrice = async () => {
        const price = await AstroContract?.getPrice();
        setCurrentPrice(price);
    };

    const getCurrentFee = async () => {
        const fee = await AstroContract?.getOracleGasFee();
        setCurrentFee(fee);
    };

    const getCurrentSupply = async () => {
        const supply = await AstroContract?.totalSupply();
        setCurrentSupply(supply);
    };

    useEffect(() => {
        if (AstroContract && account && account !== '') {
            getCurrentPrice();
            getCurrentFee();
            getCurrentSupply();
        }
    }, [AstroContract, account]);

    return (
        <>
            <div className={styles.mainContainer}>
                <Background />
                <div className={style.centerContainer}>
                    <div className={style.title}>
                        ASTRO MINT
                    </div>
                    {account && (
                        <>
                            <div className={style.priceContainer}>
                                <div className={style.currentPrice}>
                                    {currentPrice ? ethers.utils.formatEther(ethers.BigNumber.from(currentPrice)) : '0'}
                                </div>
                                <div className={style.ethIcon}>
                                    <img src={'/images/crypto/ethereum-eth-logo.svg'} alt="eth" />
                                    <span>ETH</span>
                                </div>
                            </div>
                            <div className={style.totalContainer}>
                                <div className={style.currentTotal}>
                                    {intl.formatMessage({
                                        id: 'astro.total',
                                        defaultMessage: 'Total need {total} (Oracle operator gas fee: {fee})',
                                    }, {
                                        total: currentPrice && currentFee ? Math.floor(Number(ethers.utils.formatEther(ethers.BigNumber.from(currentPrice).add(ethers.BigNumber.from(currentFee)))) * 100) / 100 : '0',
                                        fee: currentFee ? Math.floor(Number(ethers.utils.formatEther(ethers.BigNumber.from(currentFee))) * 100) / 100 : '0',
                                    })}
                                </div>
                            </div>
                            <div className={style.mintCount}>
                                {intl.formatMessage({
                                    id: 'astro.subTitle',
                                    defaultMessage: 'NFTs already minted: {minted}/{total}',
                                }, {
                                    minted: currentSupply?.toString(),
                                    total: '366',
                                })}
                            </div>
                        </>
                    )}
                    <GetChart />
                    {/* <BreedFrom /> */}
                    <About />
                </div>
            </div>
        </>
    )
}

export default Astro;
