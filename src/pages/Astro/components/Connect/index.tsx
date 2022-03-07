import { ArrowRightOutlined } from '@ant-design/icons';
import React from 'react';
import { useIntl } from 'umi';
import styles from '../../style.less';
import style from './style.less';

const Connect: React.FC = () => {
    const intl = useIntl();

    return (
        <div className={style.featureContainer}>
            <div className={styles.contentContainer}>
                <div className={style.title}>
                    {intl.formatMessage({
                        id: 'connect.title',
                        defaultMessage: 'Connect in Metaverse',
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
                    <div className={style.flexItem}>
                        <div className={style.personalizedCard}>
                            <p>
                                {intl.formatMessage({
                                    id: 'astro.feature.personalizedCard.content',
                                    defaultMessage: 'Matched as life partner, Matched as evil lover, Perfect parent for you, To upgrade water element, Partner to make a fortune, Totally different soul.'
                                })}
                            </p>
                        </div>
                    </div>
                    <div className={style.astroList}>
                        <div className={style.astroListItem}>
                            <div className={style.info}>
                                <div className={style.astroListItemTitle}>
                                    0x9afe9b34436fdae2....a7ebfc678611c106d3
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
                            <div className={style.info}>
                                <div className={style.astroListItemTitle}>
                                    0x01ca22cbc26b3ebf....279e2a65789439d15b
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
                            <div className={style.info}>
                                <div className={style.astroListItemTitle}>
                                    0x401a9868b3fb2d10....8f94b68b75a4850252
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
                            <div className={style.info}>
                                <div className={style.astroListItemTitle}>
                                    0xc36442b4a4522e87....717abdd847ab11fe88
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
                            <div className={style.info}>
                                <div className={style.astroListItemTitle}>
                                    0x95a7dc4d66172ac0....2331ce35b5a00829bd
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Connect;
