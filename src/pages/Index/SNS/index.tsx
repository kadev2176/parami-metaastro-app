import React from 'react';
import { SiDiscord, SiTwitter } from 'react-icons/si';
import style from './style.less';

const SNS: React.FC = () => {
  return (
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
  )
}

export default SNS;
