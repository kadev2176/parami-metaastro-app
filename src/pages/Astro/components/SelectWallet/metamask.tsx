import React from 'react';
import { useModel, useIntl } from 'umi';
import { Button, Divider, Image } from 'antd';
import style from './style.less';

export const MetamaskModal: React.FC = () => {
    const intl = useIntl();

    return (
        <>
            <div className={style.modalContainer}>
                <Image
                    src='/images/sns/metamask-logo.svg'
                    preview={false}
                    className={style.logo}
                />
                <span>
                    {intl.formatMessage({
                        id: 'dashboard.bridge.waitingWallet',
                        defaultMessage: 'Waiting for confirmation from {name}',
                    }, {
                        name: 'Metamask',
                    })}
                </span>
                <Divider />
                <div className={style.getWallet}>
                    {intl.formatMessage({
                        id: 'dashboard.bridge.dontHaveWallet',
                        defaultMessage: 'Don\'t have wallet?',
                    })}
                    <Button
                        type='link'
                        size='middle'
                    >
                        {intl.formatMessage({
                            id: 'dashboard.bridge.downloadHere',
                            defaultMessage: 'Download here',
                        })}
                    </Button>
                </div>
            </div>
        </>
    )
}

export const MetaMask: React.FC<{
    setWaitingModal: React.Dispatch<React.SetStateAction<boolean>>;
    setWalletType: (value: React.SetStateAction<string>) => void;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setWaitingModal, setWalletType, setModal }) => {
    const {
        metaMaskConnect,
    } = useModel("metaMask");

    const intl = useIntl();

    return (
        <>
            <div
                className={style.button}
                onClick={async () => {
                    setWaitingModal(true);
                    setWalletType('Metamask');
                    await metaMaskConnect();
                    setWaitingModal(false);
                    setModal(false);
                }}
            >
                <Image
                    src='/images/sns/metamask_circle.svg'
                    className={style.appIcon}
                    preview={false}
                />
                <div className={style.appName}>MetaMask</div>
                <div className={style.appDesc}>
                    {intl.formatMessage({
                        id: 'astro.metamask.desc',
                        defaultMessage: 'Connect to your MetaMask Wallet',
                    })}
                </div>
            </div>
        </>
    )
}

export default MetaMask;
