import { ArrowRightOutlined } from '@ant-design/icons';
import React from 'react';
import { useIntl } from 'umi';
import { Pie } from '@ant-design/plots';
import styles from '../../style.less';
import style from './style.less';
import { Col, Row } from 'antd';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';

const Connect: React.FC = () => {
    const intl = useIntl();

    const pieData = [
        {
            title: 'Fire',
            value: 0.4,
        },
        {
            title: 'Wind',
            value: 0.375,
        },
        {
            title: 'Water',
            value: 0.125,
        },
        {
            title: 'Earth',
            value: 0.1,
        },
    ];
    const pieConfig = {
        appendPadding: 0,
        pieData,
        angleField: 'value',
        colorField: 'title',
        radius: 1,
        innerRadius: 0.6,
        legend: false,
        label: {
            type: 'inner',
            offset: '-50%',
            content: '{name}',
            style: {
                textAlign: 'center',
                fontSize: 14,
            },
        },
        pieStyle: ({ title }: any) => {
            if (title === 'Fire') {
                return {
                    fill: '#e8685c',
                };
            }

            if (title === 'Wind') {
                return {
                    fill: '#6addab',
                }
            }

            if (title === 'Water') {
                return {
                    fill: '#6592f9',
                }
            }

            if (title === 'Soil') {
                return {
                    fill: '#f5c230',
                };
            }
        },
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
        ],
        statistic: {
            title: false,
            content: {
                style: {
                    whiteSpace: 'pre-wrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    color: '#fff',
                    fontSize: 16,
                    lineHeight: 1.5,
                },
                content: 'Adam’s\nzodiac\nelements',
            },
        },
    };

    return (
        <div className={style.featureContainer}>
            <div className={styles.contentContainer}>
                <div className={style.title}>
                    {intl.formatMessage({
                        id: 'connect.title',
                        defaultMessage: 'Why on Blockchain?',
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
                        defaultMessage: 'Information generated from a MetaAstro provides continuous usability for many Metaverse scenarios. Such as gaining talents in an NFT game, finding your other half on-chain, or upgrading rarity by synastry to name a few.',
                    })}
                </p>
                <div className={style.zodiacContainer}>
                    <div className={style.subtitle}>
                        {intl.formatMessage({
                            id: 'connect.subtitle1',
                            defaultMessage: '● What your MetaAstro tells about you',
                        })}
                    </div>
                    <Row
                        gutter={[0, 0]}
                        style={{
                            width: '100%',
                            marginTop: 20,
                        }}
                    >
                        <Col
                            xs={24} sm={24} md={24} lg={12} xl={12}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '2rem',
                            }}
                        >
                            <img
                                src={'/images/demo/demo.svg'}
                                className={style.demoImage}
                            />
                        </Col>
                        <Col
                            xs={24} sm={24} md={24} lg={12} xl={12}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '2rem',
                            }}
                        >
                            <div className={style.starList}>
                                <div className={style.starItem}>
                                    <div className={style.starItemIcon}>☉</div>
                                    <div className={style.starItemName}>Courage / Strength</div>
                                </div>
                                <div className={style.starItem}>
                                    <div className={style.starItemIcon}>↑</div>
                                    <div className={style.starItemName}>Charm / Manner</div>
                                </div>
                                <div className={style.starItem}>
                                    <div className={style.starItemIcon}>☽</div>
                                    <div className={style.starItemName}>Sensitivity / Empathy</div>
                                </div>
                                <div className={style.starItem}>
                                    <div className={style.starItemIcon}>♃</div>
                                    <div className={style.starItemName}>Faith / Inclusivity</div>
                                </div>
                                <div className={style.starItem}>
                                    <div className={style.starItemIcon}>♂</div>
                                    <div className={style.starItemName}>Attack damage</div>
                                </div>
                                <div className={style.starItem}>
                                    <div className={style.starItemIcon}>☿</div>
                                    <div className={style.starItemName}>Intelligence / Speed</div>
                                </div>
                                <div className={style.starItem}>
                                    <div className={style.starItemIcon}>♄</div>
                                    <div className={style.starItemName}>Construction / Endurance</div>
                                </div>
                                <div className={style.starItem}>
                                    <div className={style.starItemIcon}>♀</div>
                                    <div className={style.starItemName}>Ability power</div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className={style.adamContainer}>
                    <div className={style.subtitle}>
                        {intl.formatMessage({
                            id: 'connect.subtitle2',
                            defaultMessage: '● How Adam is connected with his character in metaverse',
                        })}
                    </div>
                    <div className={style.flexContainer}>
                        <div className={style.dataContainer}>
                            <Row
                                gutter={[0, 0]}
                                style={{
                                    width: '100%',
                                }}
                            >
                                <Col
                                    xs={24} sm={24} md={24} lg={8} xl={8}
                                    style={{
                                        position: 'relative',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <div className={style.dataList}>
                                        <div className={style.dataTitle}>
                                            {intl.formatMessage({
                                                id: 'connect.dataTitle1',
                                                defaultMessage: 'Adam’s attribute',
                                            })}
                                        </div>
                                        <div className={style.dataItem}>
                                            <div className={style.dataItemIcon}>☉</div>
                                            <div className={style.dataItemName}>
                                                Strength
                                            </div>
                                        </div>
                                        <div className={style.dataItem}>
                                            <div className={style.dataItemIcon}>↑</div>
                                            <div className={style.dataItemName}>
                                                Charm
                                            </div>
                                        </div>
                                        <div className={style.dataItem}>
                                            <div className={style.dataItemIcon}>☽</div>
                                            <div className={style.dataItemName}>
                                                Sensitivity
                                            </div>
                                        </div>
                                        <div className={style.dataItem}>
                                            <div className={style.dataItemIcon}>♃</div>
                                            <div className={style.dataItemName}>
                                                Inclusivity
                                            </div>
                                        </div>
                                        <div className={style.dataItem}>
                                            <div className={style.dataItemIcon}>♂</div>
                                            <div className={style.dataItemName}>
                                                Attack damage
                                            </div>
                                        </div>
                                        <div className={style.dataItem}>
                                            <div className={style.dataItemIcon}>☿</div>
                                            <div className={style.dataItemName}>
                                                Intelligence
                                            </div>
                                        </div>
                                        <div className={style.dataItem}>
                                            <div className={style.dataItemIcon}>♄</div>
                                            <div className={style.dataItemName}>
                                                Endurance
                                            </div>
                                        </div>
                                        <div className={style.dataItem}>
                                            <div className={style.dataItemIcon}>♀</div>
                                            <div className={style.dataItemName}>
                                                Ability power
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col
                                    xs={24} sm={24} md={24} lg={8} xl={8}
                                    style={{
                                        position: 'relative',
                                    }}
                                >
                                    <div className={style.rightArrow}>
                                        <BiRightArrow className={style.icon} />
                                    </div>
                                    <div className={style.leftArrow}>
                                        <BiLeftArrow className={style.icon} />
                                    </div>
                                    <div className={style.models}>
                                        <img
                                            src={"/images/male_23_dab10889bafab6e35b0bad276474374956e6d0ca.jpeg"}
                                            className={style.human}
                                        />
                                        <div className={style.humanName}>
                                            {intl.formatMessage({
                                                id: 'connect.humanName1',
                                                defaultMessage: 'Adam in real world',
                                            })}
                                        </div>
                                        <div className={style.line} />
                                        <div className={style.circle} >
                                            <span className={style.text}>
                                                Adam’s MetaAstro
                                            </span>
                                            <div className={style.mask} />
                                        </div>
                                        <div className={style.line} />
                                        <div className={style.meta}>
                                            <img
                                                src={"/images/model.svg"}
                                                className={style.metaCharacter}
                                            />
                                        </div>
                                        <div className={style.metaName}>
                                            {intl.formatMessage({
                                                id: 'connect.metaName1',
                                                defaultMessage: 'Adam in metaverse',
                                            })}
                                        </div>
                                    </div>
                                </Col>
                                <Col
                                    xs={24} sm={24} md={24} lg={8} xl={8}
                                    style={{
                                        position: 'relative',
                                    }}
                                >
                                    <div className={style.pieChart}>
                                        <Pie data={pieData} {...pieConfig} />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
                <div className={style.astroList}>
                    <div className={style.subtitle}>
                        {intl.formatMessage({
                            id: 'connect.subtitle3',
                            defaultMessage: '● Adam and his friend with MetaAstro',
                        })}
                    </div>
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
    )
}

export default Connect;
