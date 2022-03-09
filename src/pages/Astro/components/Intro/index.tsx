import React from 'react';
import { useIntl } from 'umi';
import styles from '../../style.less';
import style from './style.less';

const Intro: React.FC = () => {
    const intl = useIntl();

    return (
        <div className={style.introContainer}>
            <div className={styles.contentContainer}>
                <div className={style.title}>
                    {intl.formatMessage({
                        id: 'intro.title',
                        defaultMessage: 'What is MetaAstro?',
                    })}
                </div>
                <p className={style.content}>
                    {intl.formatMessage({
                        id: 'intro.content1',
                        defaultMessage: 'Take a snapshot of the sky at the time of your birth and that\'s what astrologers call a birth chart. This is a spiritual identity that connects our life to the vast universe.',
                    })}
                </p>
                <p className={style.content}>
                    {intl.formatMessage({
                        id: 'intro.content2',
                        defaultMessage: 'MetaAstro stores this data on the blockchain that can be used to indicate individual characteristics and predict one’s future using Web 3 technology. If Loot is your Metaverse gear, MetaAstro is the seed to your Metaverse character.',
                    })}
                </p>
                <div className={style.card}>
                    <div className={style.cardTitle}>
                        {intl.formatMessage({
                            id: 'astro.feature.card.title',
                            defaultMessage: 'Sun in Aries',
                        })}
                    </div>
                    <small>Moon in Sagittarius, Ascendant in Libra</small>
                    <p>
                        {intl.formatMessage({
                            id: 'astro.feature.card.content',
                            defaultMessage: '{strong} Your character has bold self-expression, a strong inner drive, walks down adventurous paths and thrives when challenged. While you may come off as sweet, polite, friendly and quite approachable, with an elegant appearance and sociable style, you have an independent soul and spontaneous emotional nature, nourished by exploration, learning and big picture views.'
                        }, {
                            strong: <strong>
                                {intl.formatMessage({
                                    id: 'astro.feature.card.strong',
                                    defaultMessage: 'An elegant fighter nourished by exploration.',
                                })}
                            </strong>
                        })}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Intro;
