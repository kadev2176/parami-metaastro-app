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
                        defaultMessage: 'Connect to complete',
                    })}
                </div>
                <div className={style.content}>
                    {intl.formatMessage({
                        id: 'connect.content',
                        defaultMessage: 'There are people you are meant to meet in the metaverse if you let the MetaAstros be the matchmaker. Initially, the MetaAstro will be available in limited quantities, and the content of the chart will be permanently stored on the blockchain (native to the blockchain, not dependent on third-party storage such as IPFS). Build up connections where metaverse guides you.',
                    })}
                </div>
                <div className={style.sections}>
                    <div className={`${style.section} ${style.sectionLeft}`}>
                        <div className={style.title}>
                            {intl.formatMessage({
                                id: 'connect.section1.title',
                                defaultMessage: '7th House',
                            })}
                        </div>
                        <div className={style.content}>
                            {intl.formatMessage({
                                id: 'connect.section1.content',
                                defaultMessage: 'Partners, long term relationships, fair and exclusive',
                            })}
                        </div>
                    </div>
                    <div className={`${style.section} ${style.sectionRight}`}>
                        <div className={style.title}>
                            {intl.formatMessage({
                                id: 'connect.section2.title',
                                defaultMessage: '5th House',
                            })}
                        </div>
                        <div className={style.content}>
                            {intl.formatMessage({
                                id: 'connect.section2.content',
                                defaultMessage: 'Romance, fun relationships, gambling buddies',
                            })}
                        </div>
                    </div>
                </div>
                <div className={style.flexContainer}>
                    <div className={style.flexItem}>
                        <div className={style.card}>
                            <div className={style.cardTitle}>
                                {intl.formatMessage({
                                    id: 'astro.feature.card.title',
                                    defaultMessage: 'Sun in Scorpio',
                                })}
                            </div>
                            <small>28°15’3” TWELFTH HOUSE</small>
                            <p>
                                {intl.formatMessage({
                                    id: 'astro.feature.card.content',
                                    defaultMessage: 'The sun determines your ego, identity, and "role" in life. It\'s the core of who you are, and is the sign you\'re most likely already know. Your is in Scorpio, meaning you have a fundamental urge to get to the bottom of things, which can at times lead you to be manipulative or power-hungry, but it comes down to an intense passion for authenticity, real intimacy, and the truth. It rules your fifth house, meaning you feel the need to  distinguish yourself from others through romance, self-expression, creativity, and pleasure.'
                                })}
                            </p>
                        </div>
                        <div className={style.personalizedCard}>
                            <div className={style.personalizedCardTitle}>
                                {intl.formatMessage({
                                    id: 'astro.feature.personalizedCard.title',
                                    defaultMessage: 'Hyper-personalized astrology',
                                })}
                            </div>
                            <p>
                                {intl.formatMessage({
                                    id: 'astro.feature.personalizedCard.content',
                                    defaultMessage: 'Unlike the broad and vague horoscopes you usually read in magazines, we take more than just your sun sign into account. We use a complete picture of the sky when and where you were born to generate hyper-personalized horoscopes.'
                                })}
                            </p>
                        </div>
                    </div>
                    <div className={style.astroList}>
                        <div className={style.astroListItem}>
                            <div className={style.info}>
                                <div className={style.astroListItemTitle}>
                                    {intl.formatMessage({
                                        id: 'astro.better.anna.title',
                                        defaultMessage: 'Anna',
                                    })}
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
                                    {intl.formatMessage({
                                        id: 'astro.better.banu.title',
                                        defaultMessage: 'Banu',
                                    })}
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
                                    {intl.formatMessage({
                                        id: 'astro.better.ben.title',
                                        defaultMessage: 'Ben',
                                    })}
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
                                    {intl.formatMessage({
                                        id: 'astro.better.francesca.title',
                                        defaultMessage: 'Francesca',
                                    })}
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
                                    {intl.formatMessage({
                                        id: 'astro.better.hanna.title',
                                        defaultMessage: 'Hanna',
                                    })}
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
                            <div className={style.info}>
                                <div className={style.astroListItemTitle}>
                                    {intl.formatMessage({
                                        id: 'astro.better.laura.title',
                                        defaultMessage: 'Laura',
                                    })}
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
