import { Col, Row } from 'antd';
import React from 'react';
import { useIntl } from 'umi';
import { FcGlobe, FcSalesPerformance, FcElectronics, FcLightAtTheEndOfTunnel } from 'react-icons/fc';
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
                        defaultMessage: 'About Meta Astro',
                    })}
                </div>
                <div className={style.content}>
                    {intl.formatMessage({
                        id: 'intro.content',
                        defaultMessage: 'Meta Astro, powered by Parami Protocol, is an Astro chart that indicates your Para Meta Identity in metaverse. It snapshots the location of the major planets at your birth time. When a Meta Astro is generated, your journey in parallel metaverses begins.',
                    })}
                </div>
                <Row
                    gutter={16}
                    className={style.icons}
                >
                    <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                        <div className={style.iconItem}>
                            <FcGlobe />
                            <span className={style.iconItemText}>
                                {intl.formatMessage({
                                    id: 'intro.icon.naturalLanguage',
                                    defaultMessage: 'Natural Language'
                                })}
                            </span>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                        <div className={style.iconItem}>
                            <FcSalesPerformance />
                            <span className={style.iconItemText}>
                                {intl.formatMessage({
                                    id: 'intro.icon.assets',
                                    defaultMessage: 'Assets'
                                })}
                            </span>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                        <div className={style.iconItem}>
                            <FcElectronics />
                            <span className={style.iconItemText}>
                                {intl.formatMessage({
                                    id: 'intro.icon.intelligence',
                                    defaultMessage: 'Intelligence'
                                })}
                            </span>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                        <div className={style.iconItem}>
                            <FcLightAtTheEndOfTunnel />
                            <span className={style.iconItemText}>
                                {intl.formatMessage({
                                    id: 'intro.icon.future',
                                    defaultMessage: 'Future'
                                })}
                            </span>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Intro;
