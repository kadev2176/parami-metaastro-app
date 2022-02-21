import React, { useState } from 'react';
import BigModal from '@/components/ParamiModal/BigModal';
import MetaMask, { MetamaskModal } from './metamask';

const SelectWallet: React.FC = () => {
    const [waitingModal, setWaitingModal] = useState<boolean>(false);
    const [walletType, setWalletType] = useState<string>('');

    return (
        <>
            <MetaMask
                setWaitingModal={setWaitingModal}
                setWalletType={setWalletType}
            />
            <BigModal
                visable={waitingModal}
                title={walletType}
                content={walletType === 'Metamask' && (
                    <MetamaskModal />
                )}
                footer={false}
            />
        </>
    )
}

export default SelectWallet;
