/**
 * @ Author: Hikaru
 * @ Create Time: 2022-04-23 19:37:14
 * @ Modified by: Hikaru
 * @ Modified time: 2022-07-22 01:56:49
 * @ Description: i@rua.moe
 */

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
            <img src={"/images/partner/nodoor.svg"} alt='nodoor' />
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
            <img src={"/images/partner/planetix.svg"} alt='planetix' />
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
            <img src={"/images/partner/playerone.svg"} alt='playerone' />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Partner;
