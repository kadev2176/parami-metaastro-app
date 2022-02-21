import React, { useEffect, useState } from 'react';
import styles from '@/style/common.less';
import style from './style.less';
import Background from './components/Background';
import GetChart from './components/GetChart';
import About from './components/About';
import { useIntl, useModel } from 'umi';
import { ethers } from 'ethers';
import BreedFrom from './components/BreedFrom';

const Astro: React.FC = () => {
    const { account } = useModel('metaMask');
    const [currentPrice, setCurrentPrice] = useState<bigint>();
    const [currentFee, setCurrentFee] = useState<bigint>();

    const intl = useIntl();

    const {
        AstroContract
    } = useModel('astroContracts');

    const getCurrentPrice = async () => {
        const price = await AstroContract?.getPrice();
        setCurrentPrice(price);
    };

    const getCurrentFee = async () => {
        const fee = await AstroContract?.fee();
        setCurrentFee(fee);
    };

    useEffect(() => {
        if (AstroContract && account && account !== '') {
            getCurrentPrice();
            getCurrentFee();
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
                                        defaultMessage: 'Total need {total} (Include fee: {fee})',
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
                                    minted: '0',
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
