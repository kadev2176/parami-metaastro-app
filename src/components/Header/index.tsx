import SelectWallet from '@/pages/Astro/components/SelectWallet/selectWallet';
import { Button } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'umi';
import BigModal from '../ParamiModal/BigModal';
import style from './style.less';

const Header: React.FC = () => {
    const [modal, setModal] = useState<boolean>(true);

    const intl = useIntl();

    return (
        <>
            <div className={style.headerContainer}>
                <div className={style.logo}>
                    <img
                        src={'/images/background/moon.svg'}
                        className={style.logoImg}
                    />
                    <span>MetaAstro</span>
                </div>
                <div className={style.connectWallet}>
                    <Button
                        type='primary'
                        size='large'
                        shape='round'
                        className={style.connectWalletBtn}
                        onClick={() => {
                            setModal(true);
                        }}
                    >
                        {intl.formatMessage({
                            id: 'header.connectWallet',
                            defaultMessage: 'Connect Wallet',
                        })}
                    </Button>
                </div>
            </div>
            <BigModal
                visable={modal}
                content={<SelectWallet />}
                footer={false}
            />
        </>
    );
};

export default Header;
