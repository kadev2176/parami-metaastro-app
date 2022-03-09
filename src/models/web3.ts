import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from 'ethers';
import { useCallback, useEffect, useState } from "react";
import Web3Modal from 'web3modal';
import { defaultChainId } from '@/pages/Astro/config';
import ethNet from "@/config/ethNet";
import { message } from 'antd';

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider, // required
        options: {
            infuraId: 'eca99940fe244068a87095aa826a34fa' // required
        },
    }
};

interface ProviderRpcError {
    message: string;
    code: number;
    data?: unknown;
}

export default () => {
    const [Account, setAccount] = useState<string>('');
    const [Provider, setProvider] = useState<providers.Web3Provider | null>(null);
    const [Signer, setSigner] = useState<providers.JsonRpcSigner | null>(null);
    const [BlockNumber, setBlockNumber] = useState<number>(0);
    const [ChainId, setChainId] = useState<number>(defaultChainId);
    const [ChainName, setChainName] = useState<string>('');
    const [NoProvider, setNoProvider] = useState<boolean>(false);

    useEffect(() => {
        Provider?.on('block', (blockNo: number) => {
            setBlockNumber(blockNo);
        });
        setChainName(ethNet[ChainId]);
        return () => {
            Provider?.removeAllListeners();
        };
    }, [ChainId, ChainName, Provider]);

    const connect = useCallback(async () => {
        try {
            const web3Modal = new Web3Modal({
                network: 'rinkeby',
                cacheProvider: false,
                providerOptions,
            });
            const provider = await web3Modal.connect();
            await provider.enable();
            const web3Provider = new providers.Web3Provider(provider);
            setProvider(web3Provider);
            const signer = web3Provider.getSigner();
            setSigner(signer);
            const account = await signer.getAddress();
            setAccount(account);
            const chainId = await signer.getChainId();
            console.log(chainId);
            setChainId(chainId);
            web3Provider.on('chainChanged', (newChainId: string) => {
                setChainId(parseInt(newChainId));
            });
            web3Provider.on('disconnect', (error: ProviderRpcError) => {
                console.log('disconnect', error.code, error.message, error.data);
                provider.removeAllListeners();
            });
            web3Provider.on('accountsChanged', function (newAccounts: string[]) {
                console.log('accountsChanged', newAccounts);
                if (newAccounts.length === 0) {
                    setAccount('');
                    setSigner(null);
                }
                setAccount(newAccounts[0]);
                const newSign = provider.getSigner()
                setSigner(newSign);
            });
        } catch (e: any) {
            message.error(e.message);
            setNoProvider(true);
        }
    }, []);

    return {
        Account,
        Provider,
        Signer,
        BlockNumber,
        ChainId,
        ChainName,
        NoProvider,
        connect,
    }
}