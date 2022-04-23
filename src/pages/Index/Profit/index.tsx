import React from 'react';
import style from './style.less';

const Profit: React.FC = () => {
  return (
    <div className={style.profitContainer}>
      <div className={style.title}>
        Ways to Earn From Ownership
      </div>
      <p className={style.content}>
        MetaAstro brings profits to its owner in many ways:
      </p>
      <div className={style.sections}>
        <div className={`${style.section} ${style.sectionLeft}`}>
          <div className={style.title}>
            Charge Minting Fees
          </div>
          <div className={style.content}>
            Earn rewards by helping others generate MetaAstros of the same date (Set your own minting fee by yourself).
          </div>
        </div>
        <div className={`${style.section} ${style.sectionMid}`}>
          <div className={style.title}>
            Trade on Marketplace
          </div>
          <div className={style.content}>
            The rarity of a MetaAstro lies in its generation, its owner, and its certain features.
          </div>
        </div>
        <div className={`${style.section} ${style.sectionRight}`}>
          <div className={style.title}>
            Receive Airdrops
          </div>
          <div className={style.content}>
            A MetaAstro is soulbound to one’s Web3 identity, serving as a voucher for precise airdrops.
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profit;
