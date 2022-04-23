import { Col, Row } from 'antd';
import React from 'react';
import style from './style.less';

const Partner: React.FC = () => {
  return (
    <div className={style.partnerContainer}>
      <div className={style.title}>
        Partner with MetaAstro
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
        <Col
          xs={24} sm={24} md={12} lg={6} xl={6}
          className={style.partnerItemCol}
          onClick={() => {
            window.open('https://www.planetix.com/', '_blank');
          }}
        >
          <div className={style.partnerItem}>
            <img src={"/images/partner/planetix.svg"} />
          </div>
        </Col>
        <Col
          xs={24} sm={24} md={12} lg={6} xl={6}
          className={style.partnerItemCol}
          onClick={() => {
            window.open('https://www.playerone.world/', '_blank');
          }}
        >
          <div className={style.partnerItem}>
            <img src={"/images/partner/playerone.svg"} />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Partner;
