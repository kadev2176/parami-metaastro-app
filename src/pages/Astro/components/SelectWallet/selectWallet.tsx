import React, { useState } from 'react';
import BigModal from '@/components/ParamiModal/BigModal';
import MetaMask, { MetamaskModal } from './metamask';
import WalletConnect, { WalletConnectModal } from './walletconnect';
import style from './style.less';
import { Divider } from 'antd';

const SelectWallet: React.FC<{
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setModal }) => {
    const [waitingModal, setWaitingModal] = useState<boolean>(false);
    const [walletType, setWalletType] = useState<string>('');

    return (
        <>
            <div className={style.selectWallet}>
                <div className={style.item}>
                    <MetaMask
                        setWaitingModal={setWaitingModal}
                        setWalletType={setWalletType}
                        setModal={setModal}
                    />
                </div>
                <Divider />
                <div className={style.item}>
                    <WalletConnect
                        setWaitingModal={setWaitingModal}
                        setWalletType={setWalletType}
                        setModal={setModal}
                    />
                </div>
            </div>
            <BigModal
                visable={waitingModal}
                title={walletType}
                content={[
                    walletType === 'Metamask' && (
                        <MetamaskModal />
                    ),
                    walletType === 'WalletConnect' && (
                        <WalletConnectModal />
                    )
                ]
                }
                footer={false}
            />
        </>
    )
}

export default SelectWallet;
