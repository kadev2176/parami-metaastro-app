import { Col, Row } from 'antd';
import React from 'react';
import { FaBirthdayCake } from 'react-icons/fa';
import { MdOutlineVerified } from 'react-icons/md';
import style from './style.less';

const Intro: React.FC = () => {
  return (
    <div className={style.introContainer}>
      <Row gutter={[16, 16]}>
        <Col className={style.introCol} xs={24} sm={24} md={24} lg={12} xl={12}>
          <div className={style.title}>What is MetaAstro?</div>
          <Row gutter={[16, 16]} className={style.introItem}>
            <Col span={4} className={style.introItemCol}>
              <FaBirthdayCake className={style.icon} />
            </Col>
            <Col span={20}>
              <div className={style.subtitle}>Natal chart for Metaverse</div>
              <p className={style.content}>
                Each Primordial Gods’ uniqueness is determined by their MetaAstro, an Astrology
                based, hyper-personalized Natal Chart, which contains soul-bound attributes across
                metaverses.
              </p>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className={style.introItem}>
            <Col span={4} className={style.introItemCol}>
              <MdOutlineVerified className={style.icon} />
            </Col>
            <Col span={20}>
              <div className={style.subtitle}>ERC-721 based</div>
              <p className={style.content}>
                The MetaAstro NFT (ERC 721) is generated based on your birth date, which endows your
                metaverse character with a series of attributes relative to yourself.
              </p>
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <Row gutter={[2, 2]} className={style.introItem}>
            <Col span={12} className={style.demoChartItem}>
              <div className={`${style.tag} ${style.earth}`}>Earth Style</div>
              <img className={style.demoChart} src={'/images/demo/earth.gif'} alt="Earth" />
            </Col>
            <Col span={12} className={style.demoChartItem}>
              <div className={`${style.tag} ${style.fire}`}>Fire Style</div>
              <img className={style.demoChart} src={'/images/demo/fire.png'} alt="Fire" />
            </Col>
            <Col span={12} className={style.demoChartItem}>
              <div className={`${style.tag} ${style.water}`}>Water Style</div>
              <img className={style.demoChart} src={'/images/demo/water.png'} alt="Water" />
            </Col>
            <Col span={12} className={style.demoChartItem}>
              <div className={`${style.tag} ${style.wind}`}>Air Style</div>
              <img className={style.demoChart} src={'/images/demo/wind.png'} alt="Wind" />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Intro;
