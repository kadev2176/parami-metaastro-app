import React, { useEffect, useState } from 'react';
import styles from '@/style/common.less';
import style from './style.less';
import GetChart from './components/GetChart';
import { useModel, history } from 'umi';
import BreedFrom from './components/BreedFrom';
import Background from '@/components/Background';

const Astro: React.FC = () => {
    const { Account, ChainId } = useModel('web3');
    const [GEN, setGEN] = useState<number>(1);
    const [pullup, setPullup] = useState<boolean>(false);
    const [speedup, setSpeedup] = useState<boolean>(false);

    const {
        MintContract
    } = useModel('astroContracts');

    const getSalesTime = async () => {
        const timeRange = await MintContract?.getSalesTimes();

        const date = new Date();
        const now = date.getTime() / 1000;
        const currentDay = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) / 1000;

        if (now <= timeRange[0].toNumber() + currentDay || now >= timeRange[1].toNumber() + currentDay) {
            history.push('/');
        }
    }

    useEffect(() => {
        if (!Account || ChainId !== 4) {
            history.push('/');
            return;
        }
    }, [ChainId, Account]);

    useEffect(() => {
        if (!!MintContract && !!Account && Account !== '') {
            getSalesTime();
        }
    }, [MintContract, Account]);

    return (
        <>
            <div className={styles.mainContainer}>
                <Background
                    speedup={speedup}
                    pullup={pullup}
                />
                <div className={style.centerContainer}>
                    <div className={style.firstContainer}>
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default Astro;
