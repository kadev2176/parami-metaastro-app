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
                        defaultMessage: 'Take a snapshot of the sky at your birth time and that\'s what astrologers call a birth chart. This is an spiritual identity that connects our life to the vast university.',
                    })}
                </p>
                <p className={style.content}>
                    {intl.formatMessage({
                        id: 'intro.content2',
                        defaultMessage: 'MetaAstro stored this data on the blockchain that can be used to indicate individual haracteristics and to predict one’s future using web3 technology. If Loot is your Metaverse gear, MetaAstro is the seed to your Metaverse character.',
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
                            defaultMessage: '{strong} Your character has bold self-expression and strong inner drive, walks down adventurous path and thriving when challenged. While you may come off as sweet, polite, friendly and quite approachable, with elegant appearance and sociable style. You have an independent soul and spontaneous emotional nature, nourished by exploration and learning and big picture view.'
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
