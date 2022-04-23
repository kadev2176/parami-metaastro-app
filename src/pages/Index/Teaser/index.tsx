import React from 'react';
import style from './style.less';

const Teaser: React.FC = () => {
  return (
    <div className={style.teaserContainer}>
      <div className={style.title}>
        Para Metaverse Phase II Teaser
      </div>
      <div className={style.content}>
        The Primordial Gods who own the sacred minting power of souls each established their own Legion: MetaAstro DAOs, and implemented a set of laws to govern the influx and distribution of parami energy to each MetaAstro DAO, so the souls shall never extinguish…
      </div>
    </div>
  )
}

export default Teaser;
