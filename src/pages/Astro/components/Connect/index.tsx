import { ArrowRightOutlined } from '@ant-design/icons';
import React from 'react';
import { useIntl } from 'umi';
import { Pie } from '@ant-design/plots';
import styles from '../../style.less';
import style from './style.less';

const Connect: React.FC = () => {
    const intl = useIntl();

    const pieData = [
        {
            title: 'Fire',
            value: 0.5,
        },
        {
            title: 'Wind',
            value: 0.375,
        },
        {
            title: 'Water',
            value: 0.125,
        },
    ];
    const pieConfig = {
        appendPadding: 0,
        pieData,
        angleField: 'value',
        colorField: 'title',
        radius: 1,
        innerRadius: 0.6,
        legend: false,
        label: {
            type: 'inner',
            offset: '-50%',
            content: '{name}',
            style: {
                textAlign: 'center',
                fontSize: 14,
            },
        },
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
        ],
        statistic: {
            title: false,
            content: {
                style: {
                    whiteSpace: 'pre-wrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    color: '#fff',
                    fontSize: 16,
                },
                content: 'Your\nElement',
            },
        },
    };

    return (
        <div className={style.featureContainer}>
            <div className={styles.contentContainer}>
                <div className={style.title}>
                    {intl.formatMessage({
                        id: 'connect.title',
                        defaultMessage: 'Why on Blockchain',
                    })}
                </div>
                <p className={style.content}>
                    {intl.formatMessage({
                        id: 'connect.content1',
                        defaultMessage: 'Initially, the MetaAstro will be available in limited quantities, and the content of the chart will be permanently stored on the blockchain (native to the blockchain, not dependent on third-party storage such as IPFS).',
                    })}
                </p>
                <p className={style.content}>
                    {intl.formatMessage({
                        id: 'connect.content2',
                        defaultMessage: 'Information generated from a MetaAstro provides continuous usability for many Metaverse scenarios: to gain talents in an NFT game, to find your other half on-chain, to upgrade rarity by synastry…',
                    })}
                </p>
                <div className={style.flexContainer}>
                    <div className={style.dataContainer}>
                        <div className={style.starList}>
                            <div className={style.starItem}>
                                <div className={style.starItemIcon}>☉</div>
                                <div className={style.starItemName}>Courage, Strength</div>
                            </div>
                            <div className={style.starItem}>
                                <div className={style.starItemIcon}>↑</div>
                                <div className={style.starItemName}>Charm, Manner</div>
                            </div>
                            <div className={style.starItem}>
                                <div className={style.starItemIcon}>☽</div>
                                <div className={style.starItemName}>Sensitivity, Empathy</div>
                            </div>
                            <div className={style.starItem}>
                                <div className={style.starItemIcon}>♃</div>
                                <div className={style.starItemName}>Faith, Inclusivity</div>
                            </div>
                            <div className={style.starItem}>
                                <div className={style.starItemIcon}>♂</div>
                                <div className={style.starItemName}>Attack damage</div>
                            </div>
                            <div className={style.starItem}>
                                <div className={style.starItemIcon}>☿</div>
                                <div className={style.starItemName}>Intelligence, Speed</div>
                            </div>
                            <div className={style.starItem}>
                                <div className={style.starItemIcon}>♄</div>
                                <div className={style.starItemName}>Construction, Endurance</div>
                            </div>
                            <div className={style.starItem}>
                                <div className={style.starItemIcon}>♀</div>
                                <div className={style.starItemName}>Ability power</div>
                            </div>
                        </div>
                        <div className={style.dataList}>
                            <div className={style.pieChart}>
                                <Pie data={pieData} {...pieConfig} />
                            </div>
                            <div className={style.data}>
                                <div className={style.dataItem}>
                                    <div className={style.dataItemName}>
                                        Strength
                                    </div>
                                </div>
                                <div className={style.dataItem}>
                                    <div className={style.dataItemName}>
                                        Charm
                                    </div>
                                </div>
                                <div className={style.dataItem}>
                                    <div className={style.dataItemName}>
                                        Sencitivity
                                    </div>
                                </div>
                                <div className={style.dataItem}>
                                    <div className={style.dataItemName}>
                                        Inclusivity
                                    </div>
                                </div>
                                <div className={style.dataItem}>
                                    <div className={style.dataItemName}>
                                        Attack damage
                                    </div>
                                </div>
                                <div className={style.dataItem}>
                                    <div className={style.dataItemName}>
                                        Ability power
                                    </div>
                                </div>
                                <div className={style.dataItem}>
                                    <div className={style.dataItemName}>
                                        Intelligence
                                    </div>
                                </div>
                                <div className={style.dataItem}>
                                    <div className={style.dataItemName}>
                                        Endurance
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.astroList}>
                        <div className={style.astroListItem}>
                            <div className={style.tag}>
                                {intl.formatMessage({
                                    id: 'connect.astroList.tag1',
                                    defaultMessage: 'Matched as life partner',
                                })}
                            </div>
                            <div className={style.info}>
                                <div className={style.astroListItemTitle}>
                                    0x9afe....06d3
                                </div>
                                <div className={style.astroListItemContent}>
                                    <div className={style.astroListItemContentItem}>
                                        <span>☉</span>
                                        Scorpio
                                    </div>
                                    <div className={style.astroListItemContentItem}>
                                        <span>↑</span>
                                        Virgo
                                    </div>
                                    <div className={style.astroListItemContentItem}>
                                        <span>☽</span>
                                        Leo
                                    </div>
                                </div>
                            </div>
                            <div className={style.arrow}><ArrowRightOutlined /></div>
                        </div>
                        <div className={style.astroListItem}>
                            <div className={style.tag}>
                                {intl.formatMessage({
                                    id: 'connect.astroList.tag2',
                                    defaultMessage: 'Matched as evil lover',
                                })}
                            </div>
                            <div className={style.info}>
                                <div className={style.astroListItemTitle}>
                                    0x01ca....d15b
                                </div>
                                <div className={style.astroListItemContent}>
                                    <div className={style.astroListItemContentItem}>
                                        <span>☉</span>
                                        Scorpio
                                    </div>
                                    <div className={style.astroListItemContentItem}>
                                        <span>↑</span>
                                        Cancer
                                    </div>
                                    <div className={style.astroListItemContentItem}>
                                        <span>☽</span>
                                        Leo
                                    </div>
                                </div>
                            </div>
                            <div className={style.arrow}><ArrowRightOutlined /></div>
                        </div>
                        <div className={style.astroListItem}>
                            <div className={style.tag}>
                                {intl.formatMessage({
                                    id: 'connect.astroList.tag3',
                                    defaultMessage: 'Perfect parent for you',
                                })}
                            </div>
                            <div className={style.info}>
                                <div className={style.astroListItemTitle}>
                                    0x401a....0252
                                </div>
                                <div className={style.astroListItemContent}>
                                    <div className={style.astroListItemContentItem}>
                                        <span>☉</span>
                                        Pisces
                                    </div>
                                    <div className={style.astroListItemContentItem}>
                                        <span>↑</span>
                                        Leo
                                    </div>
                                    <div className={style.astroListItemContentItem}>
                                        <span>☽</span>
                                        Libra
                                    </div>
                                </div>
                            </div>
                            <div className={style.arrow}><ArrowRightOutlined /></div>
                        </div>
                        <div className={style.astroListItem}>
                            <div className={style.tag}>
                                {intl.formatMessage({
                                    id: 'connect.astroList.tag4',
                                    defaultMessage: 'To upgrade water element',
                                })}
                            </div>
                            <div className={style.info}>
                                <div className={style.astroListItemTitle}>
                                    0xc364....fe88
                                </div>
                                <div className={style.astroListItemContent}>
                                    <div className={style.astroListItemContentItem}>
                                        <span>☉</span>
                                        Aries
                                    </div>
                                    <div className={style.astroListItemContentItem}>
                                        <span>↑</span>
                                        Aquarius
                                    </div>
                                    <div className={style.astroListItemContentItem}>
                                        <span>☽</span>
                                        Sagittarius
                                    </div>
                                </div>
                            </div>
                            <div className={style.arrow}><ArrowRightOutlined /></div>
                        </div>
                        <div className={style.astroListItem}>
                            <div className={style.tag}>
                                {intl.formatMessage({
                                    id: 'connect.astroList.tag5',
                                    defaultMessage: 'Partner to make a fortune',
                                })}
                            </div>
                            <div className={style.info}>
                                <div className={style.astroListItemTitle}>
                                    0x95a7....29bd
                                </div>
                                <div className={style.astroListItemContent}>
                                    <div className={style.astroListItemContentItem}>
                                        <span>☉</span>
                                        Pisces
                                    </div>
                                    <div className={style.astroListItemContentItem}>
                                        <span>↑</span>
                                        Leo
                                    </div>
                                    <div className={style.astroListItemContentItem}>
                                        <span>☽</span>
                                        Sagittarius
                                    </div>
                                </div>
                            </div>
                            <div className={style.arrow}><ArrowRightOutlined /></div>
                        </div>
                        <div className={style.astroListItem}>
                            <div className={style.tag}>
                                {intl.formatMessage({
                                    id: 'connect.astroList.tag6',
                                    defaultMessage: 'Totally different soul',
                                })}
                            </div>
                            <div className={style.info}>
                                <div className={style.astroListItemTitle}>
                                    0xeee1....9d88
                                </div>
                                <div className={style.astroListItemContent}>
                                    <div className={style.astroListItemContentItem}>
                                        <span>☉</span>
                                        Cancer
                                    </div>
                                    <div className={style.astroListItemContentItem}>
                                        <span>↑</span>
                                        Virgo
                                    </div>
                                    <div className={style.astroListItemContentItem}>
                                        <span>☽</span>
                                        Cancer
                                    </div>
                                </div>
                            </div>
                            <div className={style.arrow}><ArrowRightOutlined /></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Connect;
