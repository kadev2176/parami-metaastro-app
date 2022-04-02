import React, { useEffect, useState } from 'react';
import styles from '@/style/common.less';
import style from './style.less';
import { useIntl, useModel, history } from 'umi';
import Background from '@/components/Background';
import { Col∂, Row, Steps } from 'antd';
import { FaBirthdayCake } from 'react-icons/fa';
import { MdOutlineVerified } from 'react-icons/md';
import { GiScales } from 'react-icons/gi';
import { RightOutlined } from '@ant-design/icons';
import { SiTwitter, SiDiscord } from 'react-icons/si';
import { RiArrowDownSLine } from 'react-icons/ri';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Countdown from 'antd/lib/statistic/Countdown';

const sloganTopArr = 'CONNECT YOUR SOUL'.split('');
const sloganBottomArr = 'TO METAVERSES'.split('');
const sloganCopyArr = 'WITH ASTROLOGY POWER'.split('');

const Index: React.FC = () => {
    const { Web3Provider, ChainId, Account, connect } = useModel('web3');
    const [avavible, setAvavible] = useState<boolean>(false);
    const [popBottomBar, setPopBottomBar] = useState<boolean>(false);
    const [PageScroll, setPageScroll] = useState<number>(0);
    const [startTime, setStartTime] = useState<number>(0);
    const [endTime, setEndTime] = useState<number>(0);
    const [onSale, setOnSale] = useState<boolean>(false);
    const {
        MintContract
    } = useModel('astroContracts');

    const intl = useIntl();

    const { Step } = Steps;

    Chart.register(ArcElement, ChartDataLabels);
    const labels = [
        'Fire',
        'Water',
        'Earth',
        'Air',
    ];

    const pieConfig = {
        datasets: [{
            data: [0.4, 0.375, 0.125, 0.1],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 2
        }],
    };

    const pieOptions = {
        plugins: {
            datalabels: {
                formatter: (_: any, ctx: any) => {
                    const datasets = ctx.chart.data.datasets;
                    if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
                        return labels[ctx.dataIndex];
                    } else {
                        return labels[0]
                    }
                },
                color: ["rgba(255, 99, 132, 1)", 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
                font: {
                    weight: "bold",
                    size: "16px"
                }
            }
        }
    };

    const handleScroll = async () => {
        const pageScroll = document.documentElement.scrollTop;

        setPageScroll(pageScroll);
        if (pageScroll > 1320) {
            setPopBottomBar(true);
        } else {
            setPopBottomBar(false);
        }
    };

    const getSalesTime = async () => {
        const timeRange = await MintContract?.getSalesTimes();

        const date = new Date();
        const now = date.getTime() / 1000;
        const currentDay = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) / 1000;

        setStartTime((timeRange[0].toNumber() + currentDay) * 1000);
        setEndTime((timeRange[1].toNumber() + currentDay) * 1000);

        if (now <= timeRange[0].toNumber() + currentDay || now >= timeRange[1].toNumber() + currentDay) {
            setOnSale(false);
        } else {
            setOnSale(true);
        }
    };

    useEffect(() => {
        if (ChainId === 4) {
            setAvavible(true);
        } else {
            setAvavible(false);
        }
    }, [ChainId, Account, avavible]);

    useEffect(() => {
        if (!!MintContract && !!Web3Provider) {
            getSalesTime();
        }
    }, [MintContract, Web3Provider]);

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
                    {Account && onSale && (
                        <Countdown title="The rest of the day's auction" value={endTime} />
                    )}
                    {Account && !onSale && (
                        <Countdown title="Opening time of the next auction" value={startTime} />
                    )}
                    <div
                        className={style.mouse}
                        style={{
                            opacity: PageScroll > 100 ? 0 : 0.5,
                        }}
                    >
                        <RiArrowDownSLine className={style.icon} />
                    </div>
                </div>
                <div className={style.introContainer}>
                    <Row gutter={[16, 16]}>
                        <Col
                            className={style.introCol}
                            xs={24} sm={24} md={24} lg={12} xl={12}
                        >
                            <div className={style.title}>
                                {intl.formatMessage({
                                    id: 'intro.title',
                                    defaultMessage: 'What is MetaAstro?',
                                })}
                            </div>
                            <Row gutter={[16, 16]} className={style.introItem}>
                                <Col span={4} className={style.introItemCol}>
                                    <FaBirthdayCake
                                        className={style.icon}
                                    />
                                </Col>
                                <Col span={20}>
                                    <div className={style.subtitle}>
                                        {intl.formatMessage({
                                            id: 'intro.subtitle1',
                                            defaultMessage: 'Natal chart for Metaverse',
                                        })}
                                    </div>
                                    <p className={style.content}>
                                        {intl.formatMessage({
                                            id: 'intro.content1',
                                            defaultMessage: 'Astrology based, hyper-personalized, infrastructure of Soulbound virtual character with attributes in Metaverse.',
                                        })}
                                    </p>
                                </Col>
                            </Row>
                            <Row gutter={[16, 16]} className={style.introItem}>
                                <Col span={4} className={style.introItemCol}>
                                    <MdOutlineVerified
                                        className={style.icon}
                                    />
                                </Col>
                                <Col span={20}>
                                    <div className={style.subtitle}>
                                        {intl.formatMessage({
                                            id: 'intro.subtitle2',
                                            defaultMessage: 'ERC-721 based',
                                        })}
                                    </div>
                                    <p className={style.content}>
                                        {intl.formatMessage({
                                            id: 'intro.content2',
                                            defaultMessage: 'The MetaAstro contract works with any compatible service and exchange.',
                                        })}
                                    </p>
                                </Col>
                            </Row>
                            <Row gutter={[16, 16]} className={style.introItem}>
                                <Col span={4} className={style.introItemCol}>
                                    <GiScales
                                        className={style.icon}
                                    />
                                </Col>
                                <Col span={20}>
                                    <div className={style.subtitle}>
                                        {intl.formatMessage({
                                            id: 'intro.subtitle3',
                                            defaultMessage: 'Fair Launch',
                                        })}
                                    </div>
                                    <p className={style.content}>
                                        {intl.formatMessage({
                                            id: 'intro.content3',
                                            defaultMessage: 'No early access. No founder’s allocation. No investor privilege. No Ponzi scheme. No FOMO.',
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
                <div className={style.howContainer}>
                    <div className={style.title}>
                        {intl.formatMessage({
                            id: 'how.title',
                            defaultMessage: 'How does MetaAstro work?',
                        })}
                    </div>
                    <p className={style.content}>
                        {intl.formatMessage({
                            id: 'why.content1',
                            defaultMessage: 'MetaAstro will be available in limited quantities, and the content of the chart will be permanently and entirely stored on the blockchain. With our powerful natural-language engine using swiss ephemeris data, MetaAstro endows your metaverse character with a series of attributes which is relative to yourself.',
                        })}
                    </p>
                </div>
                <div className={style.adamContainer}>
                    <div className={style.title}>
                        {intl.formatMessage({
                            id: 'user.title',
                            defaultMessage: 'Connecting Users To Their Metaverse Characters',
                        })}
                    </div>
                    <Row gutter={[32, 32]} className={style.adamContainerRow}>
                        <Col
                            xs={24} sm={24} md={24} lg={12} xl={12}
                            className={style.adamContainerCol}
                        >
                            <div className={style.attribute}>
                                <div className={style.title}>
                                    {intl.formatMessage({
                                        id: 'adam.attribute.title',
                                        defaultMessage: 'User’s attribute',
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
                                            Courage / Strength
                                        </div>
                                    </Col>
                                    <Col span={5}>
                                        80
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
                                            Charm / Manner
                                        </div>
                                    </Col>
                                    <Col span={5}>
                                        75
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
                                            Sensitivity / Empathy
                                        </div>
                                    </Col>
                                    <Col span={5}>
                                        50
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
                                            Faith / Inclusivity
                                        </div>
                                    </Col>
                                    <Col span={5}>
                                        90
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
                                        70
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
                                            Intelligence / Speed
                                        </div>
                                    </Col>
                                    <Col span={5}>
                                        60
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
                                            Construction / Endurance
                                        </div>
                                    </Col>
                                    <Col span={5}>
                                        10
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
                                        35
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col
                            xs={24} sm={24} md={24} lg={12} xl={12}
                            className={style.adamContainerCol}
                        >
                            <div className={style.pieChartContainer}>
                                <Doughnut
                                    data={pieConfig}
                                    options={pieOptions}
                                />
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className={style.friendsContainer}>
                    <div className={style.title}>
                        {intl.formatMessage({
                            id: 'user.friends.title',
                            defaultMessage: 'User’s Interaction with MetaAstro Friends',
                        })}
                    </div>
                    <div className={style.astroList}>
                        <div className={`${style.astroListItem} ${style.astroListItemLeft}`}>
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
                        </div>
                        <div className={`${style.astroListItem} ${style.astroListItemRight}`}>
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
                        </div>
                    </div>
                </div>
                <div className={style.profitContainer}>
                    <div className={style.title}>
                        {intl.formatMessage({
                            id: 'profit.title',
                            defaultMessage: 'Profit from Ownership',
                        })}
                    </div>
                    <p className={style.content}>
                        {intl.formatMessage({
                            id: 'profit.content1',
                            defaultMessage: 'MetaAstro brings profits to its holder in many ways:',
                        })}
                    </p>
                    <div className={style.sections}>
                        <div className={`${style.section} ${style.sectionLeft}`}>
                            <div className={style.title}>
                                {intl.formatMessage({
                                    id: 'profit.section1.title',
                                    defaultMessage: 'Charge Minting Fees',
                                })}
                            </div>
                            <div className={style.content}>
                                {intl.formatMessage({
                                    id: 'profit.section1.content',
                                    defaultMessage: 'Earn rewards by helping others generate MetaAstros of the same date (you set your own minting fee).',
                                })}
                            </div>
                        </div>
                        <div className={`${style.section} ${style.sectionMid}`}>
                            <div className={style.title}>
                                {intl.formatMessage({
                                    id: 'profit.section2.title',
                                    defaultMessage: 'Trade on Marketplace',
                                })}
                            </div>
                            <div className={style.content}>
                                {intl.formatMessage({
                                    id: 'profit.section2.content',
                                    defaultMessage: 'The rarity of a MetaAstro lies in its generation, its holder, and its certain features.',
                                })}
                            </div>
                        </div>
                        <div className={`${style.section} ${style.sectionRight}`}>
                            <div className={style.title}>
                                {intl.formatMessage({
                                    id: 'profit.section3.title',
                                    defaultMessage: 'Receive Airdrops',
                                })}
                            </div>
                            <div className={style.content}>
                                {intl.formatMessage({
                                    id: 'profit.section3.content',
                                    defaultMessage: 'A MetaAstro is soulbound to one’s Web3 idenity, serving as a voucher for precise airdrops.',
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.howtoContainer}>
                    <div className={style.title}>
                        {intl.formatMessage({
                            id: 'howto.title',
                            defaultMessage: 'Now it‘s time to mint your MetaAstro !',
                        })}
                    </div>
                    <Steps
                        progressDot
                        current={2}
                        className={style.steps}
                        direction="vertical"
                    >
                        <Step
                            title="Stage 1: Dutch Auction"
                            description="From day 1 to day 31, a total of 366 Gen 0 MetaAstros are up for Dutch Auction. A Gen0 MetaAstro can breed unlimited number of same-date MetaAstros."
                            className={style.step}
                        />
                        <Step
                            title="Stage 2: Limited Mint"
                            description="During the auction month, you can mint a MetaAstro of the same date that has already been minted. A Gen1 MetaAstro can breed 1,024 same-date MetaAstros."
                            className={style.step}
                        />
                        <Step
                            title="Stage 3: Unlimited Mint"
                            description="You can mint a MetaAstro of any date. After Gen1, the number of MetaAstros that can be minted in subsequent generations is reduced by half."
                            className={style.step}
                        />
                    </Steps>
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
                    onClick={async () => {
                        if (!!Account && avavible) {
                            history.push('/mint');
                        } else {
                            await connect();
                        }
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
                                defaultMessage: 'MetaAstro',
                            })}
                        </p>
                        <p className={style.titleBottom}>
                            Mint Now
                            <RightOutlined
                                style={{
                                    marginLeft: '1rem',
                                }}
                            />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index;
