/**
 * @ Author: Hikaru
 * @ Create Time: 2022-04-23 19:31:53
 * @ Modified by: Hikaru
 * @ Modified time: 2022-07-22 02:07:01
 * @ Description: i@rua.moe
 */

import { ArrowRightOutlined } from '@ant-design/icons';
import { Steps } from 'antd';
import React from 'react';
import style from './style.less';

const { Step } = Steps;

const Stage: React.FC = () => {
  return (
    <div className={style.stageContainer}>
      <div className={style.title}>Now it‘s time to mint your MetaAstro !</div>
      <Steps progressDot current={2} className={style.steps} direction="vertical">
        <Step
          title="Stage 1: Dutch Auction (Day 1 ~ Day 31)"
          description={
            <>
              <p>
                From day 1 to day 31, a total of 366 Gen 0 MetaAstros are up for Dutch Auction. A
                Gen0 MetaAstro can breed unlimited number of same-date MetaAstros.
              </p>
              <a
                onClick={() => {
                  window.open('https://hikaru-4.gitbook.io/parami/auction-rules', '_blank');
                }}
              >
                <ArrowRightOutlined
                  style={{
                    marginRight: '10px',
                  }}
                />
                Auction Rules
              </a>
            </>
          }
          className={style.step}
        />
        <Step
          title="Stage 2: Limited Mint (Day 1 ~ Day 31)"
          description={
            <>
              <p>
                During the dutch auction month, you can mint a MetaAstro from the one with the same
                date that has already been minted.
              </p>
            </>
          }
          className={style.step}
        />
        <Step
          title="Stage 3: Unlimited Mint (Day 32 ~ )"
          description={
            <>
              <p>
                You can mint a MetaAstro of any date. After Gen1, the number of MetaAstros that can
                be minted in subsequent generations is reduced by half.
              </p>
              <a
                onClick={() => {
                  window.open('https://hikaru-4.gitbook.io/parami/minting-rules', '_blank');
                }}
              >
                <ArrowRightOutlined
                  style={{
                    marginRight: '10px',
                  }}
                />
                Mint Rules
              </a>
            </>
          }
          className={style.step}
        />
      </Steps>
    </div>
  );
};

export default Stage;
