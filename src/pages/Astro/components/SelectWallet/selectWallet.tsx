import React, { useState } from 'react';
import BigModal from '@/components/ParamiModal/BigModal';
import MetaMask, { MetamaskModal } from './metamask';
import WalletConnect, { WalletConnectModal } from './walletconnect';
import style from './style.less';

const SelectWallet: React.FC = () => {
    const [waitingModal, setWaitingModal] = useState<boolean>(false);
    const [walletType, setWalletType] = useState<string>('');

    return (
        <>
            <div className={style.selectWallet}>
                <div className={style.item}>
                    <MetaMask
                        setWaitingModal={setWaitingModal}
                        setWalletType={setWalletType}
                    />
                </div>
                <div className={style.item}>
                    <WalletConnect
                        setWaitingModal={setWaitingModal}
                        setWalletType={setWalletType}
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
