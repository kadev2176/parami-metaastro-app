/**
 * @ Author: Hikaru
 * @ Create Time: 2022-04-23 19:20:47
 * @ Modified by: Hikaru
 * @ Modified time: 2022-07-22 00:25:29
 * @ Description: i@rua.moe
 */

import React from 'react';
import style from './style.less';

const Friend: React.FC = () => {
  return (
    <div className={style.friendsContainer}>
      <div className={style.title}>
        User’s Interaction with MetaAstro Friends
      </div>
      <div className={style.astroList}>
        <div className={`${style.astroListItem} ${style.astroListItemLeft}`}>
          <div className={style.tag}>
            Matched as life partner
          </div>
          <div className={style.info}>
            <div className={style.astroListItemTitle}>
              0x9afe....06d3
            </div>
            <div className={style.astroListItemContent}>
              <div className={style.astroListItemContentItem}>
                <span>☉</span>
                Scorpio
              </div>
              <div className={style.astroListItemContentItem}>
                <span>↑</span>
                Virgo
              </div>
              <div className={style.astroListItemContentItem}>
                <span>☽</span>
                Leo
              </div>
            </div>
          </div>
        </div>
        <div className={style.astroListItem}>
          <div className={style.tag}>
            Matched as evil lover
          </div>
          <div className={style.info}>
            <div className={style.astroListItemTitle}>
              0x01ca....d15b
            </div>
            <div className={style.astroListItemContent}>
              <div className={style.astroListItemContentItem}>
                <span>☉</span>
                Scorpio
              </div>
              <div className={style.astroListItemContentItem}>
                <span>↑</span>
                Cancer
              </div>
              <div className={style.astroListItemContentItem}>
                <span>☽</span>
                Leo
              </div>
            </div>
          </div>
        </div>
        <div className={`${style.astroListItem} ${style.astroListItemRight}`}>
          <div className={style.tag}>
            Perfect parent for you
          </div>
          <div className={style.info}>
            <div className={style.astroListItemTitle}>
              0x401a....0252
            </div>
            <div className={style.astroListItemContent}>
              <div className={style.astroListItemContentItem}>
                <span>☉</span>
                Pisces
              </div>
              <div className={style.astroListItemContentItem}>
                <span>↑</span>
                Leo
              </div>
              <div className={style.astroListItemContentItem}>
                <span>☽</span>
                Libra
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Friend;
