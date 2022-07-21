/**
 * @ Author: Hikaru
 * @ Create Time: 2022-04-23 19:14:47
 * @ Modified by: Hikaru
 * @ Modified time: 2022-07-22 02:08:05
 * @ Description: i@rua.moe
 */

import { Col, Row } from 'antd';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import style from './style.less';

const User: React.FC = () => {
  Chart.register(ArcElement, ChartDataLabels);
  const labels = [
    'Fire (40%)',
    'Water (37.5%)',
    'Earth (12.5%)',
    'Air (10%)',
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

  return (
    <div className={style.userContainer}>
      <div className={style.title}>
        Connecting Users To Their Metaverse Characters
      </div>
      <div className={style.desc}>
        Each MetaAstro contains 8 attributes with different ratings, determined by your birth date, as your characters’ base attributes in the metaverse. See the example below.
      </div>
      <Row gutter={[32, 32]} className={style.userContainerRow}>
        <Col
          xs={24} sm={24} md={24} lg={12} xl={12}
          className={style.userContainerCol}
        >
          <div className={style.attribute}>
            <div className={style.title}>
              User’s attribute
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
          className={style.userContainerCol}
        >
          <div className={style.pieChartContainer}>
            <div className={style.litleTitle}>
              User’s element<br />
              proportion
            </div>
            <Doughnut
              data={pieConfig}
              options={pieOptions}
            />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default User;
