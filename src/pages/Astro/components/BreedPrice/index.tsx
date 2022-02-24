import React, { useEffect, useState } from 'react';
import style from './style.less';
import { useIntl, useModel } from 'umi';
import { BlockOutlined } from '@ant-design/icons';
import BigModal from '@/components/ParamiModal/BigModal';
import { Button, InputNumber, message } from 'antd';
import { extractTokenIdFromEvent } from '@/utils/astro';
import { ethers } from 'ethers';

const BreedPrice: React.FC = () => {
    const { account, chainId, provider, signer } = useModel('metaMask');
    const [modal, setModal] = useState<boolean>(false);
    const [WalletReady, setWalletReady] = useState<boolean>(false);
    const [tokenId, setTokenId] = useState<any>();
    const [price, setPrice] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    const intl = useIntl();

    const {
        BreedContract
    } = useModel('astroContracts');

    useEffect(() => {
        if (chainId !== 1 && chainId !== 4) {
            setWalletReady(false);
            return;
        }
        if (account && account !== '') {
            setWalletReady(true);
        }
    }, [chainId, account]);

    const handleSubmit = async () => {
        if (!provider || !signer) return;
        setLoading(true);
        try {
            const tx = await BreedContract?.setBreedPrice(tokenId, price);
            console.log('tx', tx);
            const receipt = await extractTokenIdFromEvent(tx);
            console.log('receipt', receipt);

            setLoading(false);
        } catch (e: any) {
            message.error(e.message);
            ethers.utils.ErrorFragment.from(e);
            console.log(e.message)
            setLoading(false);
        }
    };

    return (
        account && WalletReady ? (
            <>
                <div
                    className={style.breedPriceModal}
                    onClick={() => { setModal(!modal) }}
                >
                    <span>
                        {intl.formatMessage({
                            id: 'astro.breedPrice',
                            defaultMessage: 'Breed Price',
                        })}
                    </span>
                    <BlockOutlined className={style.arrowIcon} />
                </div>
                <BigModal
                    visable={modal}
                    title={intl.formatMessage({
                        id: 'astro.breedPrice',
                        defaultMessage: 'Breed Price',
                    })}
                    content={
                        <div className={style.breedPriceInputContainer}>
                            <div className={style.userInputContainer}>
                                {intl.formatMessage({
                                    id: 'astro.breedPriceInput',
                                    defaultMessage: 'I want to set {tokenId} breed price to {price}.',
                                }, {
                                    tokenId: (
                                        <InputNumber
                                            className={style.input}
                                            placeholder={intl.formatMessage({
                                                id: 'astro.tokenIdInputPlaceholder',
                                                defaultMessage: 'Token ID',
                                            })}
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
                                            onChange={(e) => {
                                                setPrice(e);
                                            }}
                                        />
                                    ),
                                })}
                            </div>
                            <Button
                                size='large'
                                shape='round'
                                type='primary'
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
                    close={() => { setModal(false) }}
                />
            </>
        ) : (<></>)
    )
}

export default BreedPrice;
