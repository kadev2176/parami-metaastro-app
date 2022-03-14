import style from './style.less';
import { SiTwitter, SiDiscord } from 'react-icons/si';

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
          window.open('https://opensea.io/collection/metaastro', '_blank');
        }}
      >
        <img
          src={'/images/sns/opensea.svg'}
          className={style.snsButtonItemSvg}
        />
      </div>
    </div>
  );
};
