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
                        defaultMessage: 'A MetaAstro Journey Begins',
                    })}
                </div>
                <div className={style.content}>
                    {intl.formatMessage({
                        id: 'intro.content',
                        defaultMessage: 'Take a snapshot of the sky at your birth time and that’s how the universe leaves a mark on you. Using this data, MetaAstro indicates individual characteristics that can be used to predict one’s future using web3 technology. Information is generated from a MetaAstro storing it forever on the blockchain providing continuous usability for many Metaverse scenarios. If Loot is your Metaverse gear, MetaAstro is the seed to your Metaverse character.',
                    })}
                </div>
                <div className={style.sections}>
                    <div className={`${style.section} ${style.sectionLeft}`}>
                        <div className={style.title}>
                            {intl.formatMessage({
                                id: 'intro.section1.title',
                                defaultMessage: 'Sun / Asc / Moon',
                            })}
                        </div>
                        <div className={style.content}>
                            {intl.formatMessage({
                                id: 'intro.section1.content',
                                defaultMessage: 'Locate yourself in a metaverse, inside and outside',
                            })}
                        </div>
                    </div>
                    <div className={`${style.section} ${style.sectionRight}`}>
                        <div className={style.title}>
                            {intl.formatMessage({
                                id: 'intro.section2.title',
                                defaultMessage: 'South Node / North Node',
                            })}
                        </div>
                        <div className={style.content}>
                            {intl.formatMessage({
                                id: 'intro.section2.content',
                                defaultMessage: 'Where you came from and seek for as a meta soul',
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Intro;
