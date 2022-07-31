/**
 * @ Author: Hikaru
 * @ Create Time: 2022-02-18 15:19:59
 * @ Modified by: Hikaru
 * @ Modified time: 2022-07-31 17:44:29
 * @ Description: i@rua.moe
 */

import { opensea } from '@/config/contract';
import { SiDiscord, SiTwitter } from 'react-icons/si';
import style from './style.less';

export default () => {
  return (
    <div className={style.snsButtons}>
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
          window.open(`${opensea.url}/collection/${opensea.primeCollection}`, '_blank');
        }}
      >
        <img src={'/images/sns/opensea.svg'} className={style.snsButtonItemSvg} alt="opensea" />
      </div>
    </div>
  );
};
