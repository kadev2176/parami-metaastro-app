/**
 * @ Author: Hikaru
 * @ Create Time: 2022-04-23 19:40:04
 * @ Modified by: Hikaru
 * @ Modified time: 2022-07-22 02:06:50
 * @ Description: i@rua.moe
 */

import React from 'react';
import { SiDiscord, SiTwitter } from 'react-icons/si';
import style from './style.less';

const SNS: React.FC = () => {
  return (
    <div className={style.snsContainer}>
      <div
        className={style.snsButtonItem}
        onClick={() => {
          window.open('https://twitter.com/MetaAstroDAO', '_blank');
        }}
      >
        <SiTwitter className={style.snsButtonItemSvg} />
      </div>
      <div
        className={style.snsButtonItem}
        onClick={() => {
          window.open('https://discord.gg/hqCRDxjmfK', '_blank');
        }}
      >
        <SiDiscord className={style.snsButtonItemSvg} />
      </div>
      <div
        className={style.snsButtonItem}
        onClick={() => {
          window.open('https://opensea.io/collection/meta-astro-genesis', '_blank');
        }}
      >
        <img
          src={'/images/sns/opensea.svg'}
          className={style.snsButtonItemSvg}
          alt="opensea"
        />
      </div>
    </div>
  )
}

export default SNS;
