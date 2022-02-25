import ethNet from '@/config/ethNet';
import { ethers } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import WalletConnectProvider from "@walletconnect/web3-provider";
import { message } from 'antd';

const INFURA_KEY = '4bf032f2d38a4ed6bb975b80d6340847'; //process.env.REACT_APP_INFURA_KEY
const FORMATIC_KEY = process.env.REACT_APP_FORTMATIC_KEY;
const PORTIS_ID = process.env.REACT_APP_PORTIS_ID;

if (typeof INFURA_KEY === 'undefined') {
    throw new Error(`REACT_APP_INFURA_KEY must be a defined environment variable`)
}

export default () => {
    // Web3 status
    const [Account, setAccount] = useState<string>('');
    const [Provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
    const [Signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(null);
    const [NoWalletconnect, setNoWalletconnect] = useState<boolean>(false);
    const [BlockNumber, setBlockNumber] = useState<number>(0);
    const [ChainId, setChainId] = useState<number>(4);
    const [ChainName, setChainName] = useState<string>('');

    interface ProviderRpcError {
        message: string;
        code: number;
        data?: unknown;
    }

    useEffect(() => {
        setChainName(ethNet[ChainId]);
        Provider?.on('block', (blockNo: number) => {
            setBlockNumber(blockNo)
        });
        return () => {
            Provider?.removeAllListeners();
        };
    }, [ChainId, ChainName, Provider]);

    const connect = useCallback(async () => {
        //  Create WalletConnect Provider
        const newProvider = new WalletConnectProvider({
            infuraId: INFURA_KEY,
        });
        let accounts: string[] = [];
        if (newProvider) {
            try {
                accounts = await newProvider.on("accountsChanged");
            } catch (e: any) {
                message.error('This dapp requires access to your account information.');
                return;
            }
            console.log('connect', accounts);
            const ethersProvider = new ethers.providers.Web3Provider(newProvider);
            setProvider(ethersProvider);
            setAccount(accounts[0]);
            const newSigner = ethersProvider.getSigner();
            setSigner(newSigner);
            let initChainId = await newSigner.getChainId();
            if (initChainId !== 4) {
                //TODO: add some condition to switch chainId
                await (window as any).ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x04' }], // chainId must be in hexadecimal numbers
                });
                initChainId = await newSigner.getChainId();
            }
        }
    }, []);
}