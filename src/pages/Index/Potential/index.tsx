/**
 * @ Author: Hikaru
 * @ Create Time: 2022-04-23 19:10:15
 * @ Modified by: Hikaru
 * @ Modified time: 2022-07-22 01:56:59
 * @ Description: i@rua.moe
 */

import React from 'react';
import style from './style.less';

const Potential: React.FC = () => {
  return (
    <div className={style.potentialContainer}>
      <div className={style.title}>
        Potential Utilities of Your Natal Chart NFT
      </div>
      <p className={style.content}>
        MetaAstro will be available in limited quantities, and the content of the chart will be permanently and entirely stored on the blockchain. With our powerful natural-language engine using swiss ephemeris data, MetaAstro endows your metaverse character with a series of attributes which is relative to yourself.
      </p>
    </div>
  )
}

export default Potential;
