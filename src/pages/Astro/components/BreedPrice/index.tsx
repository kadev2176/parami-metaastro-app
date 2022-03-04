import React, { useEffect, useState } from 'react';
import style from './style.less';
import { useIntl, useModel } from 'umi';
import BigModal from '@/components/ParamiModal/BigModal';
import { Button, InputNumber, message } from 'antd';
import { errorParse } from '@/utils/common';
import { ethers } from 'ethers';

const BreedPrice: React.FC<{
    setBreedPriceModal: React.Dispatch<React.SetStateAction<boolean>>;
    breedPriceModal: boolean;
}> = ({ setBreedPriceModal, breedPriceModal }) => {
    const { metaMaskAccount, metaMaskChainId } = useModel('metaMask');
    const { walletConnectAccount, walletConnectChainId } = useModel('walletconnect');
    const [tokenId, setTokenId] = useState<any>();
    const [price, setPrice] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    const intl = useIntl();

    const {
        MintContract,
        BreedContract
    } = useModel('astroContracts');

    useEffect(() => {
        if (!!metaMaskAccount && metaMaskChainId !== 1 && metaMaskChainId !== 4) {
            return;
        }
    }, [metaMaskChainId, metaMaskAccount]);

    useEffect(() => {
        if (walletConnectAccount && walletConnectChainId !== 1 && walletConnectChainId !== 4) {
            return;
        }
    }, [walletConnectChainId, walletConnectAccount]);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const owner = await MintContract?.ownerOf(tokenId);
            if (owner !== ethers.utils.getAddress(metaMaskAccount || walletConnectAccount)) {
                message.error(intl.formatMessage({
                    id: 'astro.breed.error.notOwner',
                    defaultMessage: 'You are not the owner of this token.',
                }));
                setLoading(false);
                return;
            }

            const tx = await BreedContract?.setBreedPrice(tokenId, price);
            console.log('tx', tx);

            setLoading(false);
            setBreedPriceModal(false);
        } catch (e: any) {
            console.log(e.message);
            const error = errorParse(e.message).body?.message;
            message.error(error);
            setLoading(false);
        }
    };

    return (
        <>
            <BigModal
                visable={breedPriceModal}
                title={intl.formatMessage({
                    id: 'astro.breedPrice.title',
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
                close={() => { setBreedPriceModal(false) }}
            />
        </>
    );
}

export default BreedPrice;
