import React from 'react';
import { useModel, useIntl } from 'umi';
import { Button, Divider, Image } from 'antd';
import style from './style.less';

export const WalletConnectModal: React.FC = () => {
    const intl = useIntl();

    return (
        <>
            <div className={style.modalContainer}>
                <Image
                    src='/images/sns/walletconnect-logo.svg'
                    preview={false}
                    className={style.logo}
                />
                <span>
                    {intl.formatMessage({
                        id: 'dashboard.bridge.waitingWallet',
                        defaultMessage: 'Waiting for confirmation from {name}',
                    }, {
                        name: 'WalletConnect',
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

export const WalletConnect: React.FC<{
    setWaitingModal: React.Dispatch<React.SetStateAction<boolean>>;
    setWalletType: (value: React.SetStateAction<string>) => void;
}> = ({ setWalletType }) => {
    const {
        walletConnect,
    } = useModel("walletconnect");

    return (
        <>
            <Button
                size='large'
                shape='round'
                type='primary'
                className={style.button}
                icon={
                    <Image
                        src='/images/sns/walletconnect_circle.svg'
                        className={style.appIcon}
                        preview={false}
                    />
                }
                style={{
                    backgroundColor: '#2F80ED',
                }}
                onClick={async () => {
                    // setWaitingModal(true);
                    setWalletType('WalletConnect');
                    await walletConnect();
                    // setWaitingModal(false);
                }}
            >
                WalletConnect
            </Button>
        </>
    )
}

export default WalletConnect;
