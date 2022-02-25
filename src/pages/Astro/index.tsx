import React, { useEffect, useState } from 'react';
import styles from '@/style/common.less';
import style from './style.less';
import Background from './components/Background';
import GetChart from './components/GetChart';
import { useModel } from 'umi';
import BreedFrom from './components/BreedFrom';
import Intro from './components/Intro';
import Better from './components/Better';
import Feature from './components/Feature';
import BreedPrice from './components/BreedPrice';

const Astro: React.FC = () => {
    const { metaMaskAccount } = useModel('metaMask');
    const [GEN, setGEN] = useState<number>(1);

    const {
        MintContract
    } = useModel('astroContracts');

    const getSalesTime = async () => {
        const timeRange = await MintContract?.getSalesTimes();
        const now = await Math.floor(Date.now() / 1000);
        if (now >= timeRange[0].toNumber() && now <= timeRange[1].toNumber()) {
            setGEN(1);
        } else {
            setGEN(2);
        }
    }

    useEffect(() => {
        if (MintContract && metaMaskAccount && metaMaskAccount !== '') {
            getSalesTime();
        }
    }, [MintContract, metaMaskAccount]);

    return (
        <>
            <div className={styles.mainContainer}>
                <Background />
                <div className={style.centerContainer}>
                    <div className={style.firstContainer}>
                        <div className={style.title}>
                            ASTRO MINT
                        </div>
                        {GEN === 1 && (
                            <GetChart />
                        )}
                        {GEN === 2 && (
                            <BreedFrom />
                        )}
                        <BreedPrice />
                    </div>
                    <Intro />
                    <Feature />
                    <Better />
                </div>
            </div>
        </>
    )
}

export default Astro;
