import React from 'react';
import { useIntl } from 'umi';
import styles from '../../style.less';
import style from './style.less';

const Profit: React.FC = () => {
    const intl = useIntl();

    return (
        <div className={style.featureContainer}>
            <div className={styles.contentContainer}>
                <div className={style.title}>
                    {intl.formatMessage({
                        id: 'profit.title',
                        defaultMessage: 'How to profit',
                    })}
                </div>
                <div className={style.content}>
                    {intl.formatMessage({
                        id: 'profit.content1',
                        defaultMessage: 'Using the web3 global login feature, your MetaAstro can be obtained and utilized when using other Metaverse products. Initially there will be a limited number of 366 MetaAstro, one for each of the 365 days of the year plus leap year. The MetaAstro will be acquired through a Dutch Auction with no reservations.',
                    })}
                </div>
                <div className={style.content}>
                    {intl.formatMessage({
                        id: 'profit.content2',
                        defaultMessage: 'Each MetaAstro supports minting a limited number of same-date MetaAstros. The first generation MetaAstro can mint 1,024 same-date; the number of MetaAstros that can be minted in subsequent generations is then reduced by half.',
                    })}
                </div>
                <div className={style.sections}>
                    <div className={`${style.section} ${style.sectionLeft}`}>
                        <div className={style.title}>
                            {intl.formatMessage({
                                id: 'profit.section1.title',
                                defaultMessage: 'Charge minting fees',
                            })}
                        </div>
                        <div className={style.content}>
                            {intl.formatMessage({
                                id: 'profit.section1.content',
                                defaultMessage: 'With MetaAstro you can earn rewards by helping other users generate their own birth chart of the same date (you set your own price).',
                            })}
                        </div>
                    </div>
                    <div className={`${style.section} ${style.sectionMid}`}>
                        <div className={style.title}>
                            {intl.formatMessage({
                                id: 'profit.section2.title',
                                defaultMessage: 'Trade',
                            })}
                        </div>
                        <div className={style.content}>
                            {intl.formatMessage({
                                id: 'profit.section2.content',
                                defaultMessage: 'The earlier the generation of the MetaAstro, the rarer it is. It can also be minted with other same date charts (in a different year and/or at different birth time).',
                            })}
                        </div>
                    </div>
                    <div className={`${style.section} ${style.sectionRight}`}>
                        <div className={style.title}>
                            {intl.formatMessage({
                                id: 'profit.section3.title',
                                defaultMessage: 'Receive airdrops',
                            })}
                        </div>
                        <div className={style.content}>
                            {intl.formatMessage({
                                id: 'profit.section3.content',
                                defaultMessage: 'The MetaAstro serves as a strong identity symbol and can be used to get user rewards based on the characteristics of your MetaAstro.',
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profit;
