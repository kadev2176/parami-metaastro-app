/**
 * @ Author: Hikaru
 * @ Create Time: 2022-04-23 16:43:53
 * @ Modified by: Hikaru
 * @ Modified time: 2022-07-22 01:58:03
 * @ Description: i@rua.moe
 */

import { ArrowRightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Countdown from 'antd/lib/statistic/Countdown';
import React from 'react';
import SNS from '../SNS';
import style from './style.less';

const PreDayCountDown: React.FC<{
  preDate: any;
  setStoryModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ preDate, setStoryModal }) => {
  return (
    <div className={style.leftTopContainer}>
      <h1>
        Countdown to Genesis:{' '}
        <Countdown
          value={Date.parse(preDate)}
          className={style.countdown}
          format="HH:mm:ss"
          style={{
            display: 'inline-block',
          }}
          onFinish={() => {
            window.location.reload();
          }}
        />
      </h1>
      <h4>A singularity big-banged into galaxies and stars</h4>
      <h4>Energy channeling through Para Metaverse</h4>
      <h4>Behold the birth of 366 primordial gods</h4>
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
      <SNS />
    </div>
  );
};

export default PreDayCountDown;
