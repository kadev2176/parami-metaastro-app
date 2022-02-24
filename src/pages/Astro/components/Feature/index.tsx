import React from 'react';
import { useIntl } from 'umi';
import styles from '../../style.less';
import style from './style.less';

const Feature: React.FC = () => {
    const intl = useIntl();

    return (
        <div className={style.featureContainer}>
            <div className={styles.contentContainer}>
                <div className={style.flexContainer}>
                    <img src={'/images/demo/gen.svg'} />
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
                </div>
            </div>
        </div>
    )
}

export default Feature;
