import SelectWallet from '@/pages/Astro/components/SelectWallet/selectWallet';
import { Button } from 'antd';
import React, { useState } from 'react';
import { useIntl, useModel } from 'umi';
import BigModal from '../ParamiModal/BigModal';
import style from './style.less';

const Header: React.FC = () => {
    const { metaMaskAccount } = useModel('metaMask');
    const { walletConnectAccount } = useModel('walletconnect');
    const [modal, setModal] = useState<boolean>(false);

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
                    {metaMaskAccount || walletConnectAccount ? (
                        <span className={style.account}>
                            {metaMaskAccount || walletConnectAccount}
                        </span>
                    ) : (
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
                    )}
                </div>
            </div>
            <BigModal
                visable={modal}
                content={<SelectWallet setModal={setModal} />}
                footer={false}
                close={() => { setModal(false) }}
            />
        </>
    );
};

export default Header;
