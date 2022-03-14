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
    const [Web3, setWeb3] = useState<Web3Modal>(new Web3Modal);
    const [Account, setAccount] = useState<string>('');
    const [Provider, setProvider] = useState<any>(null);
    const [Web3Provider, setWeb3Provider] = useState<providers.Web3Provider | null>(null);
    const [Signer, setSigner] = useState<providers.JsonRpcSigner | null>(null);
    const [BlockNumber, setBlockNumber] = useState<number>(0);
    const [ChainId, setChainId] = useState<number>(defaultChainId);
    const [ChainName, setChainName] = useState<string>('');
    const [Network, setNetwork] = useState<providers.Network>();
    const [NoProvider, setNoProvider] = useState<boolean>(false);

    const initWeb3Modal = async () => {
        const web3Modal = new Web3Modal({
            network: 'rinkeby',
            cacheProvider: false,
            providerOptions,
        });
        setWeb3(web3Modal);
    };

    useEffect(() => {
        initWeb3Modal();
    }, []);

    useEffect(() => {
        Provider?.on('block', (blockNo: number) => {
            setBlockNumber(blockNo);
        });
        setChainName(ethNet[ChainId]);
        return () => {
            Provider?.removeAllListeners();
        };
    }, [ChainId, ChainName, Provider]);

    const disconnect = useCallback(async () => {
        try {
            Web3.clearCachedProvider();
            await Provider?.close();
            setProvider(null);
            setWeb3Provider(null);
            setSigner(null);
            setAccount('');
            setNetwork(undefined);
        } catch (e: any) {
            message.error(e.message);
            setNoProvider(true);
        }
    }, []);

    const connect = useCallback(async () => {
        try {
            const provider = await Web3.connect();
            await provider.enable();
            setProvider(provider);
            const web3Provider = new providers.Web3Provider(provider);
            setWeb3Provider(web3Provider);
            const signer = web3Provider.getSigner();
            setSigner(signer);
            const account = await signer.getAddress();
            setAccount(account);
            const network = await web3Provider.getNetwork();
            setNetwork(network);
            const chainId = await signer.getChainId();
            setChainId(chainId);
            provider.on('chainChanged', (newChainId: string) => {
                setChainId(parseInt(newChainId));
            });
            provider.on('disconnect', (error: ProviderRpcError) => {
                disconnect();
                console.log('disconnect', error.code, error.message, error.data);
                provider.removeAllListeners();
            });
            provider.on('accountsChanged', function (newAccounts: string[]) {
                console.log('accountsChanged', newAccounts);
                if (newAccounts.length === 0) {
                    setAccount('');
                    setSigner(null);
                }
                setAccount(newAccounts[0]);
                const newSign = web3Provider.getSigner()
                setSigner(newSign);
            });
        } catch (e: any) {
            message.error(e.message);
            setNoProvider(true);
        }
    }, []);

    return {
        Web3,
        Account,
        Provider,
        Web3Provider,
        Signer,
        BlockNumber,
        ChainId,
        ChainName,
        NoProvider,
        Network,
        connect,
        disconnect,
    }
}