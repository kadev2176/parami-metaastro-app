import { Button } from 'antd';
import React, { useState } from 'react';
import { useIntl, useModel } from 'umi';
import style from './style.less';
import { FaWallet } from 'react-icons/fa';
import { EyeFilled, LogoutOutlined, TagsFilled } from '@ant-design/icons';
import BreedPrice from '@/pages/Astro/components/BreedPrice';
import { opensea } from '@/pages/Astro/config';

const Header: React.FC = () => {
    const { Account, connect } = useModel('web3');
    const [menu, setMenu] = useState<boolean>(false);
    const [breedPriceModal, setBreedPriceModal] = useState<boolean>(false);

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
                    {!!Account ? (
                        <div className={style.menuButton}>
                            <Button
                                type='primary'
                                size='large'
                                shape='round'
                                className={style.connectWalletBtn}
                                icon={<FaWallet className={style.icon} />}
                                onClick={() => {
                                    setMenu(!menu);
                                }}
                            >
                                {`${Account.substring(0, 6)}...${Account.slice(-4)}`}
                            </Button>
                            <div
                                className={style.headerMenu}
                                style={{
                                    height: menu ? '220px' : '0',
                                }}
                            >
                                <div
                                    className={style.menuItem}
                                    onClick={() => {
                                        setBreedPriceModal(true);
                                    }}
                                >
                                    <TagsFilled className={style.icon} />
                                    {intl.formatMessage({
                                        id: 'header.menu.breedPrice',
                                        defaultMessage: 'Breed Price',
                                    })}
                                </div>
                                <div
                                    className={style.menuItem}
                                    onClick={() => {
                                        window.open(`${opensea.url}/${Account}/${opensea.collection}`, '_blank');
                                    }}
                                >
                                    <EyeFilled className={style.icon} />
                                    {intl.formatMessage({
                                        id: 'header.menu.onOpensea',
                                        defaultMessage: 'On Opensea',
                                    })}
                                </div>
                                <div
                                    className={style.menuItem}
                                    onClick={() => {
                                        window.location.reload();
                                    }}
                                >
                                    <LogoutOutlined className={style.icon} />
                                    {intl.formatMessage({
                                        id: 'header.menu.logout',
                                        defaultMessage: 'Logout',
                                    })}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Button
                            type='primary'
                            size='large'
                            shape='round'
                            className={style.connectWalletBtn}
                            icon={<FaWallet className={style.icon} />}
                            onClick={async () => {
                                await connect();
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
            <BreedPrice
                setBreedPriceModal={setBreedPriceModal}
                breedPriceModal={breedPriceModal}
            />
        </>
    );
};

export default Header;
