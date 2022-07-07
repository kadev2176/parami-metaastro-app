import { ArrowRightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Countdown from 'antd/lib/statistic/Countdown';
import React from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import SNS from '../SNS';
import style from './style.less';

const Landing: React.FC<{
  PageScroll: number;
  onSale: boolean;
  startTime: number;
  endTime: number;
  setStoryModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ PageScroll, onSale, startTime, endTime, setStoryModal }) => {
  const sloganTopArr = 'CONNECT YOUR SOUL'.split('');
  const sloganBottomArr = 'TO METAVERSES'.split('');
  const sloganCopyArr = 'WITH ASTROLOGY POWER'.split('');

  return (
    <div className={style.landingContainer}>
      <div className={style.sloganContainer}>
        {onSale && !!endTime && (
          <Countdown
            title={<div className={style.countdownTitle}>Today’s auction ends in</div>}
            className={style.countdown}
            value={endTime}
          />
        )}
        {!onSale && !!startTime && (
          <Countdown
            title={<div className={style.countdownTitle}>Next round begins in</div>}
            className={style.countdown}
            value={startTime}
          />
        )}
        <p className={style.sloganTop}>
          {sloganTopArr.map((char, index) => (
            <span
              key={index}
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
              key={index}
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
              key={index}
              style={{
                animationDelay: `${Math.random() * (index + 1)}s`,
              }}
            >
              {char}
            </span>
          ))}
        </p>
        <Button
          type="link"
          size="large"
          icon={<ArrowRightOutlined />}
          onClick={() => {
            setStoryModal(true);
          }}
          className={style.learnMore}
        >
          Learn More About MetaAstro Phase I<br />- GENESIS OF THE GODS -
        </Button>
      </div>
      <div
        className={style.mouse}
        style={{
          opacity: PageScroll > 100 ? 0 : 0.5,
        }}
      >
        <RiArrowDownSLine className={style.icon} />
      </div>
      <SNS />
    </div>
  );
};

export default Landing;
