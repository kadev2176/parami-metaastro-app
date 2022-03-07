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
