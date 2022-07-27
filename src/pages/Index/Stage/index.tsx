/**
 * @ Author: Hikaru
 * @ Create Time: 2022-04-23 19:31:53
 * @ Modified by: Hikaru
 * @ Modified time: 2022-07-27 22:32:55
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
          title="Phase 1: Genesis of the Primordial Gods - Dutch Auction"
          description={
            <>
              <p>
                From Aug 1st to Aug 31st, a total of 366 Generation 0 MetaAstros will be up for auction, these rare NFTs represent the primordial gods’ astrological charts with unlimited power of recreation.
              </p>
              <p>
                On each day during the auction, we will release 7 to 12 NFTs. One must mint NFTs of the same day of any month on this date. For example, on August 1st, you can mint an NFT using the 1st day of any month. This will be repeated for each day of the month until the 31st.
              </p>
              <p>
                Check Out detailed
                <a
                  onClick={() => {
                    window.open('https://metaastro.gitbook.io/metaastro/genesis-auction/auction-rules', '_blank');
                  }}
                >
                  <ArrowRightOutlined
                    style={{
                      marginRight: '10px',
                    }}
                  />
                  Auction Rules
                </a>
              </p>
            </>
          }
          className={style.step}
        />
        <Step
          title="Phase 2: Creation of the New Gods - Unlimited Mint"
          description={
            <>
              <p>
                If you were interested in becoming a New God (Generation 1 onwards), you could mint a MetaAstro from someone with the same date. New Gods MUST mint from an existing NFT owner to obtain MetaAstro, and subsequently pay a MINTING FEE set by the previous generation’s owner. From Generation 1 onwards, the power of helping others mint will be further limited.
              </p>
              <p>
                Check Out detailed
                <a
                  onClick={() => {
                    window.open('https://metaastro.gitbook.io/metaastro/later-generations/mint-rules', '_blank');
                  }}
                >
                  <ArrowRightOutlined
                    style={{
                      marginRight: '10px',
                    }}
                  />
                  Mint Rules
                </a>
              </p>
            </>
          }
          className={style.step}
        />
        <Step
          title="Phase 3: Populating the Para-Metaverse"
          description={
            <>
              <p>
                You can match, play and social with other MetaAstro holders across various metaverses and DAOs, and even use MetaAstros as badges, as well as privileges for airdrops and benefits etc. MetaAstro will become your metaverse passport!
              </p>
            </>
          }
          className={style.step}
        />
      </Steps>
    </div>
  );
};

export default Stage;
