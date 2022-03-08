import React, { useEffect, useState } from 'react';
import styles from '@/style/common.less';
import style from './style.less';
import Background from './components/Background';
import GetChart from './components/GetChart';
import { useModel } from 'umi';
import BreedFrom from './components/BreedFrom';
import Intro from './components/Intro';
import Profit from './components/Profit';
import Connect from './components/Connect';
import SNS from './components/SNS';

const Astro: React.FC = () => {
    const { Account, ChainId } = useModel('web3');
    const [GEN, setGEN] = useState<number>(1);
    const [pullup, setPullup] = useState<boolean>(false);
    const [speedup, setSpeedup] = useState<boolean>(false);
    const [avavible, setAvavible] = useState<boolean>(true);

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
        if (!!Account && ChainId !== 4) {
            setAvavible(false);
            return;
        }
    }, [ChainId, Account]);

    useEffect(() => {
        if (!!MintContract && !!Account && Account !== '') {
            getSalesTime();
        }
    }, [MintContract, Account]);

    const sloganTopArr = 'CONNECTING YOUR SOUL'.split('');
    const sloganBottomArr = 'INTO METAVERSES'.split('');
    const sloganCopyArr = 'WITH ASTROLOGY POWER'.split('');

    return (
        <>
            <div className={styles.mainContainer}>
                <Background
                    speedup={speedup}
                    pullup={pullup}
                />
                <div className={style.centerContainer}>
                    <div className={style.firstContainer}>
                        {Account && avavible ? (
                            <>
                                {GEN === 1 && (
                                    <GetChart
                                        setSpeedup={setSpeedup}
                                        setPullup={setPullup}
                                    />
                                )}
                                {GEN === 2 && (
                                    <BreedFrom
                                        setSpeedup={setSpeedup}
                                        setPullup={setPullup}
                                    />
                                )}
                            </>
                        ) : (
                            <div className={style.slogan}>
                                <p className={style.sloganTop}>
                                    {sloganTopArr.map((char, index) => (
                                        <span
                                            key={char}
                                            style={{
                                                animationDelay: `${Math.random() * (index + 1)}s`,
                                            }}
                                        >
                                            {char}
                                        </span>
                                    ))}
                                </p>
                                <p className={style.sloganBottom}>
                                    {sloganBottomArr.map((char, index) => (
                                        <span
                                            key={char}
                                            style={{
                                                animationDelay: `${Math.random() * (index + 1)}s`,
                                            }}
                                        >
                                            {char}
                                        </span>
                                    ))}
                                </p>
                                <p className={style.copy}>
                                    {sloganCopyArr.map((char, index) => (
                                        <span
                                            key={char}
                                            style={{
                                                animationDelay: `${Math.random() * (index + 1)}s`,
                                            }}
                                        >
                                            {char}
                                        </span>
                                    ))}
                                </p>
                            </div>
                        )}
                        <SNS />
                    </div>
                    <Intro />
                    <Connect />
                    <Profit />
                </div>
            </div>
        </>
    )
}

export default Astro;
