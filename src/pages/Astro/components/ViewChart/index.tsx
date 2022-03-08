import React, { useState } from 'react';
import style from './style.less';
import { useIntl, useModel } from 'umi';
import { ArrowLeftOutlined, BlockOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { Divider } from 'antd';
import { contractAddresses, opensea } from '../../config';

const ViewChart: React.FC = () => {
    const { Account } = useModel('web3');
    const [mintCharts, setMintCharts] = useState<number[]>([]);
    const [breedCharts, setBreedCharts] = useState<number[]>([]);
    const [modal, setModal] = useState<boolean>(false);

    const {
        MintContract,
        BreedContract
    } = useModel('astroContracts');

    const intl = useIntl();

    const getAllCharts = async () => {
        try {
            await MintContract?.tokenOfOwnerByIndex(Account, 0);
            const charts: number[] = [];
            for (let i = 0; i < 5; i++) {
                const chart = await MintContract?.tokenOfOwnerByIndex(Account, i);
                charts.push(chart.toNumber());
            }
            setMintCharts(charts);
            setModal(true);
        } catch (e: any) {
            console.log(e.message);
        }

        try {
            await BreedContract?.tokenOfOwnerByIndex(Account, 0);
            const charts = [];
            for (let i = 0; i < 5; i++) {
                const chart = await BreedContract?.tokenOfOwnerByIndex(Account, i);
                charts.push(chart.toNumber());
            }
            setBreedCharts(charts);
            setModal(true);
        } catch (e: any) {
            console.log(e.message);
        }
    };

    useEffect(() => {
        if ((!!Account) && !!MintContract && !!BreedContract) {
            getAllCharts();
        }
    }, [Account, MintContract, BreedContract]);

    return (
        <>
            <div
                className={style.viewChartModal}
                onClick={() => { setModal(!modal) }}
            >
                <span>
                    <BlockOutlined className={style.arrowIcon} />
                    {intl.formatMessage({
                        id: 'astro.viewChart.title',
                        defaultMessage: 'View Chart',
                    })}
                </span>
            </div>
            <div
                className={style.viewChartModalContent}
                style={{
                    left: modal ? '0' : '-140px',
                }}
            >
                {!!mintCharts.length && (
                    <>
                        <div className={style.title}>Prime</div>
                        {mintCharts.map((chart) => (
                            <div
                                className={style.chartItem}
                                key={chart}
                                onClick={() => {
                                    window.open(`${opensea.url}/assets/${contractAddresses.mint[4]}/${chart}`, '_blank');
                                }}
                            >
                                #{chart}
                            </div>
                        ))}
                    </>
                )}
                {!!breedCharts.length && (
                    <>
                        <Divider />
                        <div className={style.title}>Ordinary</div>
                        {breedCharts.map((chart) => (
                            <div
                                className={style.chartItem}
                                key={chart}
                            >
                                #{chart}
                            </div>
                        ))}
                    </>
                )}
                <div className={style.rightButton}>
                    <div
                        className={style.closeBtn}
                        onClick={() => { setModal(!modal) }}
                    >
                        <ArrowLeftOutlined />
                    </div>
                    <div className={style.viewMyOpensea}>
                        {intl.formatMessage({
                            id: 'astro.viewChart.viewMoreOnOpensea',
                            defaultMessage: 'View more on Opensea',
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewChart;
