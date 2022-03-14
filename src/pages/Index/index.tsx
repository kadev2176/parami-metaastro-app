import React, { useEffect, useState } from 'react';
import styles from '@/style/common.less';
import style from './style.less';
import { useIntl, useModel, history } from 'umi';
import Background from '@/components/Background';
import { Button, Col, Row } from 'antd';
import { FaBirthdayCake } from 'react-icons/fa';
import { MdOutlineVerified } from 'react-icons/md';
import { SiWeb3Dotjs } from 'react-icons/si';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import { Pie } from '@ant-design/plots';
import { ArrowRightOutlined } from '@ant-design/icons';
import { SiTwitter, SiDiscord } from 'react-icons/si';

const sloganTopArr = 'CONNECT YOUR SOUL'.split('');
const sloganBottomArr = 'TO METAVERSES'.split('');
const sloganCopyArr = 'WITH ASTROLOGY POWER'.split('');

const Index: React.FC = () => {
    const { Account, ChainId, connect } = useModel('web3');
    const [avavible, setAvavible] = useState<boolean>(true);
    const [popBottomBar, setPopBottomBar] = useState<boolean>(false);

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
                    fill: '#ac303e',
                };
            }

            if (title === 'Wind') {
                return {
                    fill: '#026d49',
                }
            }

            if (title === 'Water') {
                return {
                    fill: '#2478d2',
                }
            }

            if (title === 'Soil') {
                return {
                    fill: '#e8cc5e',
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

    const handleScroll = async () => {
        const pageScroll = document.documentElement.scrollTop;

        if (pageScroll > 1320) {
            setPopBottomBar(true);
        } else {
            setPopBottomBar(false);
        }
    };

    useEffect(() => {
        if (!!Account && ChainId !== 4) {
            setAvavible(false);
            return;
        }
    }, [ChainId, Account]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={styles.mainContainer}>
            <Background />
            <div className={styles.pageContainer}>
                <div className={style.firstContainer}>
                    <div className={style.sloganContainer}>
                        <p className={style.sloganTop}>
                            {sloganTopArr.map((char, index) => (
                                <span
                                    key={char}
                                    style={{
                                        animationDelay: `${Math.random() * (index + 1)}s`,
                                    }}
                                >
                                    {char}
                                </span>
                            ))}
                        </p>
                        <p className={style.sloganBottom}>
                            {sloganBottomArr.map((char, index) => (
                                <span
                                    key={char}
                                    style={{
                                        animationDelay: `${Math.random() * (index + 1)}s`,
                                    }}
                                >
                                    {char}
                                </span>
                            ))}
                        </p>
                        <p className={style.copy}>
                            {sloganCopyArr.map((char, index) => (
                                <span
                                    key={char}
                                    style={{
                                        animationDelay: `${Math.random() * (index + 1)}s`,
                                    }}
                                >
                                    {char}
                                </span>
                            ))}
                        </p>
                    </div>
                </div>
                <div className={style.introContainer}>
                    <Row gutter={[32, 32]}>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <div className={style.title}>
                                {intl.formatMessage({
                                    id: 'intro.title',
                                    defaultMessage: 'What is MetaAstro?',
                                })}
                            </div>
                            <Row gutter={[32, 32]} className={style.introItem}>
                                <Col span={4} className={style.introItemCol}>
                                    <FaBirthdayCake
                                        className={style.icon}
                                    />
                                </Col>
                                <Col span={20}>
                                    <div className={style.subtitle}>
                                        {intl.formatMessage({
                                            id: 'intro.subtitle1',
                                            defaultMessage: 'Natal chart',
                                        })}
                                    </div>
                                    <p className={style.content}>
                                        {intl.formatMessage({
                                            id: 'intro.content1',
                                            defaultMessage: 'Take a snapshot of the sky at the time of your birth and that\'s what astrologers call a birth chart. This is a spiritual identity that connects our life to the vast universe.',
                                        })}
                                    </p>
                                </Col>
                            </Row>
                            <Row gutter={[32, 32]} className={style.introItem}>
                                <Col span={4} className={style.introItemCol}>
                                    <MdOutlineVerified
                                        className={style.icon}
                                    />
                                </Col>
                                <Col span={20}>
                                    <div className={style.subtitle}>
                                        {intl.formatMessage({
                                            id: 'intro.subtitle2',
                                            defaultMessage: 'ERC-721',
                                        })}
                                    </div>
                                    <p className={style.content}>
                                        {intl.formatMessage({
                                            id: 'intro.content2',
                                            defaultMessage: 'The MetaAstro contract the governs ownership is a standard ERC-721 that works with any compatible service or exchange.',
                                        })}
                                    </p>
                                </Col>
                            </Row>
                            <Row gutter={[32, 32]} className={style.introItem}>
                                <Col span={4} className={style.introItemCol}>
                                    <SiWeb3Dotjs
                                        className={style.icon}
                                    />
                                </Col>
                                <Col span={20}>
                                    <div className={style.subtitle}>
                                        {intl.formatMessage({
                                            id: 'intro.subtitle3',
                                            defaultMessage: 'Web 3',
                                        })}
                                    </div>
                                    <p className={style.content}>
                                        {intl.formatMessage({
                                            id: 'intro.content3',
                                            defaultMessage: 'MetaAstro stores this data on the blockchain that can be used to indicate individual characteristics and predict one’s future using Web 3 technology. If Loot is your Metaverse gear, MetaAstro is the seed to your Metaverse character.',
                                        })}
                                    </p>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <img
                                className={style.demoChart}
                                src={'/images/demo/demo.svg'}
                            />
                        </Col>
                    </Row>
                </div>
                <div className={style.bannerContainer}>
                    <div className={style.title}>
                        {intl.formatMessage({
                            id: 'astro.feature.card.title',
                            defaultMessage: 'Sun in Aries',
                        })}
                    </div>
                    <small>Moon in Sagittarius, Ascendant in Libra</small>
                    <p className={style.content}>
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
                <div className={style.whyContainer}>
                    <div className={style.title}>
                        {intl.formatMessage({
                            id: 'why.title',
                            defaultMessage: 'Why on Blockchain?',
                        })}
                    </div>
                    <p className={style.content}>
                        {intl.formatMessage({
                            id: 'why.content1',
                            defaultMessage: 'Initially, the MetaAstro will be available in limited quantities, and the content of the chart will be permanently stored on the blockchain (native to the blockchain, not dependent on third-party storage such as IPFS).',
                        })}
                    </p>
                    <p className={style.content}>
                        {intl.formatMessage({
                            id: 'why.content2',
                            defaultMessage: 'Information generated from a MetaAstro provides continuous usability for many Metaverse scenarios. Such as gaining talents in an NFT game, finding your other half on-chain, or upgrading rarity by synastry to name a few.',
                        })}
                    </p>
                </div>
                <div className={style.tellConatiner}>
                    <Row gutter={[32, 32]} className={style.tellConatinerRow}>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <div className={style.zodiacList}>
                                <Row gutter={[32, 32]} className={style.zodiacItem}>
                                    <Col span={4} className={style.zodiacItemCol}>
                                        <div className={style.icon}>
                                            ☉
                                        </div>
                                    </Col>
                                    <Col span={20}>
                                        <div className={style.text}>
                                            Courage / Strength
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={[32, 32]} className={style.zodiacItem}>
                                    <Col span={4} className={style.zodiacItemCol}>
                                        <div className={style.icon}>
                                            ↑
                                        </div>
                                    </Col>
                                    <Col span={20}>
                                        <div className={style.text}>
                                            Charm / Manner
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={[32, 32]} className={style.zodiacItem}>
                                    <Col span={4} className={style.zodiacItemCol}>
                                        <div className={style.icon}>
                                            ☽
                                        </div>
                                    </Col>
                                    <Col span={20}>
                                        <div className={style.text}>
                                            Sensitivity / Empathy
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={[32, 32]} className={style.zodiacItem}>
                                    <Col span={4} className={style.zodiacItemCol}>
                                        <div className={style.icon}>
                                            ♃
                                        </div>
                                    </Col>
                                    <Col span={20}>
                                        <div className={style.text}>
                                            Faith / Inclusivity
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={[32, 32]} className={style.zodiacItem}>
                                    <Col span={4} className={style.zodiacItemCol}>
                                        <div className={style.icon}>
                                            ♂
                                        </div>
                                    </Col>
                                    <Col span={20}>
                                        <div className={style.text}>
                                            Attack damage
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={[32, 32]} className={style.zodiacItem}>
                                    <Col span={4} className={style.zodiacItemCol}>
                                        <div className={style.icon}>
                                            ☿
                                        </div>
                                    </Col>
                                    <Col span={20}>
                                        <div className={style.text}>
                                            Intelligence / Speed
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={[32, 32]} className={style.zodiacItem}>
                                    <Col span={4} className={style.zodiacItemCol}>
                                        <div className={style.icon}>
                                            ♄
                                        </div>
                                    </Col>
                                    <Col span={20}>
                                        <div className={style.text}>
                                            Construction / Endurance
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={[32, 32]} className={style.zodiacItem}>
                                    <Col span={4} className={style.zodiacItemCol}>
                                        <div className={style.icon}>
                                            ♀
                                        </div>
                                    </Col>
                                    <Col span={20}>
                                        <div className={style.text}>
                                            Ability power
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <div className={style.title}>
                                {intl.formatMessage({
                                    id: 'tell.title',
                                    defaultMessage: 'What your MetaAstro tells about you',
                                })}
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className={style.adamContainer}>
                    <div className={style.title}>
                        {intl.formatMessage({
                            id: 'adam.title',
                            defaultMessage: 'How Adam is connected with his character in metaverse',
                        })}
                    </div>
                    <Row gutter={[32, 32]} className={style.adamContainerRow}>
                        <Col
                            xs={24} sm={24} md={24} lg={8} xl={8}
                            className={style.adamContainerCol}
                        >
                            <div className={style.attribute}>
                                <div className={style.title}>
                                    {intl.formatMessage({
                                        id: 'adam.attribute.title',
                                        defaultMessage: 'Adam’s attribute',
                                    })}
                                </div>
                                <Row gutter={[16, 16]} className={style.zodiacItem}>
                                    <Col span={4} className={style.zodiacItemCol}>
                                        <div className={style.icon}>
                                            ☉
                                        </div>
                                    </Col>
                                    <Col span={15}>
                                        <div className={style.text}>
                                            Strength
                                        </div>
                                    </Col>
                                    <Col span={5}>
                                        0.8
                                    </Col>
                                </Row>
                                <Row gutter={[16, 16]} className={style.zodiacItem}>
                                    <Col span={4} className={style.zodiacItemCol}>
                                        <div className={style.icon}>
                                            ↑
                                        </div>
                                    </Col>
                                    <Col span={15}>
                                        <div className={style.text}>
                                            Charm
                                        </div>
                                    </Col>
                                    <Col span={5}>
                                        0.75
                                    </Col>
                                </Row>
                                <Row gutter={[16, 16]} className={style.zodiacItem}>
                                    <Col span={4} className={style.zodiacItemCol}>
                                        <div className={style.icon}>
                                            ☽
                                        </div>
                                    </Col>
                                    <Col span={15}>
                                        <div className={style.text}>
                                            Sensitivity
                                        </div>
                                    </Col>
                                    <Col span={5}>
                                        0.5
                                    </Col>
                                </Row>
                                <Row gutter={[16, 16]} className={style.zodiacItem}>
                                    <Col span={4} className={style.zodiacItemCol}>
                                        <div className={style.icon}>
                                            ♃
                                        </div>
                                    </Col>
                                    <Col span={15}>
                                        <div className={style.text}>
                                            Inclusivity
                                        </div>
                                    </Col>
                                    <Col span={5}>
                                        0.9
                                    </Col>
                                </Row>
                                <Row gutter={[16, 16]} className={style.zodiacItem}>
                                    <Col span={4} className={style.zodiacItemCol}>
                                        <div className={style.icon}>
                                            ♂
                                        </div>
                                    </Col>
                                    <Col span={15}>
                                        <div className={style.text}>
                                            Attack damage
                                        </div>
                                    </Col>
                                    <Col span={5}>
                                        0.7
                                    </Col>
                                </Row>
                                <Row gutter={[16, 16]} className={style.zodiacItem}>
                                    <Col span={4} className={style.zodiacItemCol}>
                                        <div className={style.icon}>
                                            ☿
                                        </div>
                                    </Col>
                                    <Col span={15}>
                                        <div className={style.text}>
                                            Intelligence
                                        </div>
                                    </Col>
                                    <Col span={5}>
                                        0.6
                                    </Col>
                                </Row>
                                <Row gutter={[16, 16]} className={style.zodiacItem}>
                                    <Col span={4} className={style.zodiacItemCol}>
                                        <div className={style.icon}>
                                            ♄
                                        </div>
                                    </Col>
                                    <Col span={15}>
                                        <div className={style.text}>
                                            Endurance
                                        </div>
                                    </Col>
                                    <Col span={5}>
                                        0.1
                                    </Col>
                                </Row>
                                <Row gutter={[16, 16]} className={style.zodiacItem}>
                                    <Col span={4} className={style.zodiacItemCol}>
                                        <div className={style.icon}>
                                            ♀
                                        </div>
                                    </Col>
                                    <Col span={15}>
                                        <div className={style.text}>
                                            Ability power
                                        </div>
                                    </Col>
                                    <Col span={5}>
                                        0.35
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col
                            xs={24} sm={24} md={24} lg={8} xl={8}
                            className={style.adamContainerCol}
                        >
                            <div className={style.models}>
                                <div className={style.rightArrow}>
                                    <BiRightArrow className={style.icon} />
                                </div>
                                <div className={style.leftArrow}>
                                    <BiLeftArrow className={style.icon} />
                                </div>
                                <div className={style.humanContainer}>
                                    <img
                                        src={"/images/male_23_dab10889bafab6e35b0bad276474374956e6d0ca.jpeg"}
                                        className={style.image}
                                    />
                                    <span className={style.name}>
                                        {intl.formatMessage({
                                            id: 'adam.human.name',
                                            defaultMessage: 'Adam in real world',
                                        })}
                                    </span>
                                </div>
                                <div className={style.line} />
                                <div className={style.centerContainer}>
                                    <span className={style.text}>
                                        Adam’s MetaAstro
                                    </span>
                                    <div className={style.mask} />
                                </div>
                                <div className={style.line} />
                                <div className={style.metaContainer}>
                                    <img
                                        src={"/images/model.svg"}
                                        className={style.image}
                                    />
                                    <span className={style.name}>
                                        {intl.formatMessage({
                                            id: 'adam.meta.name',
                                            defaultMessage: 'Adam in metaverse',
                                        })}
                                    </span>
                                </div>
                            </div>
                        </Col>
                        <Col
                            xs={24} sm={24} md={24} lg={8} xl={8}
                            className={style.adamContainerCol}
                        >
                            <div className={style.pieChartContainer}>
                                <Pie data={pieData} {...pieConfig} />
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className={style.friendsContainer}>
                    <div className={style.title}>
                        {intl.formatMessage({
                            id: 'adam.friends.title',
                            defaultMessage: 'Adam and his friend with MetaAstro',
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
                <div className={style.profitContainer}>
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
                <div className={style.partnerContainer}>
                    <div className={style.title}>
                        {intl.formatMessage({
                            id: 'partner.title',
                            defaultMessage: 'Partner with MetaAstro',
                        })}
                    </div>
                    <Row gutter={[32, 32]} className={style.partnerContainerRow}>
                        <Col
                            xs={24} sm={24} md={12} lg={6} xl={6}
                            className={style.partnerItemCol}
                            onClick={() => {
                                window.open('https://nodoor.com/', '_blank');
                            }}
                        >
                            <div className={style.partnerItem}>
                                <img src={"/images/partner/nodoor.svg"} />
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className={style.snsContainer}>
                    <div
                        className={style.snsButtonItem}
                        onClick={() => {
                            window.open('https://twitter.com/ParamiProtocol', '_blank');
                        }}
                    >
                        <SiTwitter className={style.snsButtonItemSvg} />
                    </div>
                    <div
                        className={style.snsButtonItem}
                        onClick={() => {
                            window.open('https://discord.com/invite/bxFuekgvYJ', '_blank');
                        }}
                    >
                        <SiDiscord className={style.snsButtonItemSvg} />
                    </div>
                    <div
                        className={style.snsButtonItem}
                        onClick={() => {
                            window.open('https://opensea.io/collection/metaastro', '_blank');
                        }}
                    >
                        <img
                            src={'/images/sns/opensea.svg'}
                            className={style.snsButtonItemSvg}
                        />
                    </div>
                </div>
                <div
                    className={style.gotoMintContainer}
                    style={{
                        right: popBottomBar ? '2rem' : '-30rem',
                    }}
                >
                    <img
                        src={"/images/background/astronomy.svg"}
                        className={style.astronomyIcon}
                    />
                    <div className={style.title}>
                        <p className={style.titleTop}>
                            {intl.formatMessage({
                                id: 'gotoMint.title1',
                                defaultMessage: 'Explore',
                            })}
                        </p>
                        <p className={style.titleBottom}>
                            MetaAstro
                        </p>
                    </div>
                    {Account && avavible ? (
                        <Button
                            type="default"
                            size="large"
                            className={style.button}
                            onClick={() => {
                                history.push('/mint');
                            }}
                        >
                            {intl.formatMessage({
                                id: 'gotoMint.button',
                                defaultMessage: 'MINT NOW',
                            })}
                            <ArrowRightOutlined />
                        </Button>
                    ) : (
                        <Button
                            type="default"
                            size="large"
                            className={style.button}
                            onClick={async () => {
                                await connect();
                            }}
                        >
                            {intl.formatMessage({
                                id: 'connect.button',
                                defaultMessage: 'Connect',
                            })}
                            <ArrowRightOutlined />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Index;
