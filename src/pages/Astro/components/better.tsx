import { ArrowRightOutlined } from '@ant-design/icons';
import React from 'react';
import { useIntl } from 'umi';
import styles from '../style.less';
import style from './better.less';

const Better: React.FC = () => {
    const intl = useIntl();

    return (
        <div className={style.featureContainer}>
            <div className={styles.contentContainer}>
                <div className={style.flexContainer}>
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
                    <div className={style.intro}>
                        <div className={style.introItem}>
                            <span>☽</span>
                            MOODS &amp; EMOTIONS
                        </div>
                        <div className={style.introItem}>
                            <span>☿</span>
                            INTELLECT &amp; COMMUNICATION
                        </div>
                        <div className={style.introItem}>
                            <span>♀</span>
                            LOVE &amp; PLEASURE
                        </div>
                        <div className={style.introItem}>
                            <span>♅</span>
                            IMAGINATION
                        </div>
                        <div className={style.introItem}>
                            <span>☉</span>
                            BASIC IDENTITIES
                        </div>
                        <div className={style.introItem}>
                            <span>↑</span>
                            FIRST IMPRESSIONS
                        </div>
                        <div className={style.introItem}>
                            <span>♂</span>
                            SEX &amp; AGGRESSION
                        </div>
                        <div className={style.introItem}>
                            <span>♄</span>
                            SENSES OF RESPONSIBILITIY
                        </div>
                        <div className={style.introItem}>
                            <span>♃</span>
                            PHILOSOPHIES OF LIFE
                        </div>
                        <div className={style.togetherCard}>
                            <div className={style.togetherCardTitle}>
                                {intl.formatMessage({
                                    id: 'astro.feature.togetherCard.title',
                                    defaultMessage: 'Better together',
                                })}
                            </div>
                            <p>
                                {intl.formatMessage({
                                    id: 'astro.feature.togetherCard.content',
                                    defaultMessage: 'Keep track of your friends, see what\'s up with them astrologically if they’re having a bad day, and, of course, see whether you’re fated to fall in love.'
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Better;
