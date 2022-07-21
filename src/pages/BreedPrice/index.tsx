/**
 * @ Author: Hikaru
 * @ Create Time: 2022-06-27 04:26:09
 * @ Modified by: Hikaru
 * @ Modified time: 2022-07-22 00:24:46
 * @ Description: i@rua.moe
 */

import React, { useEffect, useState } from 'react';
import style from './style.less';
import { useIntl, useModel } from 'umi';
import BigModal from '@/components/ParamiModal/BigModal';
import { Button, InputNumber, notification } from 'antd';
import { ethers } from 'ethers';

const BreedPrice: React.FC<{
  setBreedPriceModal: React.Dispatch<React.SetStateAction<boolean>>;
  breedPriceModal: boolean;
}> = ({ setBreedPriceModal, breedPriceModal }) => {
  const { Account, ChainId } = useModel('web3');
  const [tokenId, setTokenId] = useState<any>();
  const [price, setPrice] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const intl = useIntl();

  const { PrimeContract, OrdinaryContract } = useModel('astroContracts');

  useEffect(() => {
    if (!!Account && ChainId !== 1 && ChainId !== 4) {
      return;
    }
  }, [ChainId, Account]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const owner = await PrimeContract?.ownerOf(tokenId);
      if (owner !== ethers.utils.getAddress(Account as string)) {
        notification.error({
          message: 'You are not the owner of this token.',
          duration: null,
        });
        setLoading(false);
        return;
      }

      const tx = await OrdinaryContract?.setBreedPrice(tokenId, price);
      console.log('tx', tx);

      setLoading(false);
      setBreedPriceModal(false);
    } catch (e: any) {
      console.log(e?.error?.message || e?.message || e);
      notification.error({
        message: e?.error?.message || e?.message || e,
        duration: null,
      });
      setLoading(false);
    }
  };

  return (
    <>
      <BigModal
        visable={breedPriceModal}
        title={undefined}
        bodyStyle={{
          backgroundColor: '#000',
          border: '2px solid #fff',
        }}
        content={
          <div className={style.breedPriceInputContainer}>
            <div className={style.userInputContainer}>
              {intl.formatMessage(
                {
                  id: 'astro.breedPriceInput',
                  defaultMessage: 'I want to set {tokenId} breed price to {price}.',
                },
                {
                  tokenId: (
                    <InputNumber
                      className={style.input}
                      placeholder={intl.formatMessage({
                        id: 'astro.tokenIdInputPlaceholder',
                        defaultMessage: 'Token ID',
                      })}
                      type="number"
                      min={1}
                      onChange={(e) => {
                        setTokenId(e);
                      }}
                    />
                  ),
                  price: (
                    <InputNumber
                      className={style.input}
                      placeholder={intl.formatMessage({
                        id: 'astro.breedPriceInputPlaceholder',
                        defaultMessage: 'Price',
                      })}
                      type="number"
                      min={0}
                      onChange={(e: number) => {
                        if (!!e) {
                          setPrice(ethers.utils.parseEther(e.toString()).toString());
                        }
                      }}
                    />
                  ),
                },
              )}
            </div>
            <Button
              size="large"
              shape="round"
              type="primary"
              className={style.button}
              disabled={!tokenId || !price}
              loading={loading}
              onClick={() => {
                handleSubmit();
              }}
            >
              {intl.formatMessage({
                id: 'astro.confirm',
                defaultMessage: 'Confirm',
              })}
            </Button>
          </div>
        }
        footer={false}
        close={() => {
          setBreedPriceModal(false);
        }}
      />
    </>
  );
};

export default BreedPrice;
