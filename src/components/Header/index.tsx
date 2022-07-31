/**
 * @ Author: Hikaru
 * @ Create Time: 2022-07-08 05:21:42
 * @ Modified by: Hikaru
 * @ Modified time: 2022-07-31 17:49:53
 * @ Description: i@rua.moe
 */

import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useIntl, useModel, history } from 'umi';
import style from './style.less';
import { FaWallet } from 'react-icons/fa';
import { EyeFilled, LogoutOutlined, TagsFilled } from '@ant-design/icons';
import BreedPrice from '@/pages/BreedPrice';
import { opensea } from '@/config/contract';

const Header: React.FC = () => {
  const { Account, ChainId, connect, disconnect } = useModel('web3');
  const { initialState } = useModel('@@initialState');
  const [menu, setMenu] = useState<boolean>(false);
  const [breedPriceModal, setBreedPriceModal] = useState<boolean>(false);
  const [avavible, setAvavible] = useState<boolean>(false);

  const intl = useIntl();

  useEffect(() => {
    if (ChainId === 1) {
      setAvavible(true);
    } else {
      setAvavible(false);
    }
  }, [ChainId, Account]);

  return (
    <>
      <div className={style.headerContainer}>
        <div
          className={style.logo}
          onClick={() => {
            history.push('/');
          }}
        >
          <img src={'/images/background/moon.svg'} className={style.logoImg} alt="MetaAstro" />
          <span>MetaAstro</span>
        </div>
        <div className={style.connectWallet}>
          {(!initialState?.leftDays || initialState?.leftDays === 0) && (
            <>
              {!!Account && avavible ? (
                <div className={style.menuButton}>
                  <Button
                    type="default"
                    size="large"
                    shape="round"
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
                      height: menu ? '200px' : '0',
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
                        window.open(`${opensea.url}/${Account}/${opensea.primeCollection}`, '_blank');
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
                      onClick={async () => {
                        await disconnect();
                        setMenu(false);
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
                  type="default"
                  size="large"
                  shape="round"
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
            </>
          )}
        </div>
      </div>
      <BreedPrice setBreedPriceModal={setBreedPriceModal} breedPriceModal={breedPriceModal} />
    </>
  );
};

export default Header;
