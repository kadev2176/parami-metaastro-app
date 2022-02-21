import React from 'react';
import style from './style.less';
import { SiTwitter, SiDiscord } from 'react-icons/si';

const Header: React.FC = () => {
    return (
        <>
            <div className={style.headerContainer}>
                <div className={style.logo}>
                    <img
                        src={'/images/background/moon.svg'}
                        className={style.logoImg}
                    />
                    <span>Meta Astro</span>
                </div>
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
            </div>
        </>
    )
}

export default Header;
