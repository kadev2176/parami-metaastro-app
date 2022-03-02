import ethNet from '@/config/ethNet';
import { ethers } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import WalletConnectProvider from "@walletconnect/web3-provider";
import { message } from 'antd';

const INFURA_KEY = '774b1e4252de48c3997d66ac5f5078d8'; //process.env.REACT_APP_INFURA_KEY

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
        Provider?.on('block', (blockNo: number) => {
            setBlockNumber(blockNo);
        });
        setChainName(ethNet[ChainId]);
        return () => {
            Provider?.removeAllListeners();
        };
    }, [ChainId, ChainName, Provider]);

    const connect = useCallback(async () => {
        const newProvider = new WalletConnectProvider({
            infuraId: INFURA_KEY,
        });
        await newProvider.disconnect();
        await newProvider.enable();
        let account: string = '';
        if (!!newProvider) {
            const ethersProvider = new ethers.providers.Web3Provider(newProvider);
            setProvider(ethersProvider);
            const newSigner = ethersProvider.getSigner();
            setSigner(newSigner);
            try {
                account = await await newSigner.getAddress();
            }
            catch (e: any) {
                message.error('This dapp requires access to your account information.');
                return;
            }
            setAccount(account);
            const initChainId = await newSigner.getChainId();
            // if (initChainId !== 4) {
            //     //TODO: add some condition to switch chainId
            //     await newProvider.request({
            //         method: 'wallet_switchEthereumChain',
            //         params: [{ chainId: '0x04' }], // chainId must be in hexadecimal numbers
            //     });
            //     initChainId = await newSigner.getChainId();
            // }
            setChainId(initChainId);
            newProvider.on('chainChanged', (newChainId: string) => {
                setChainId(parseInt(newChainId));
            });
            newProvider.on('disconnect', (error: ProviderRpcError) => {
                console.log('disconnect', error.code, error.message, error.data);
                ethersProvider.removeAllListeners();
            });
            newProvider.on('accountsChanged', function (newAccounts: string[]) {
                console.log('accountsChanged', newAccounts);
                if (newAccounts.length === 0) {
                    setAccount('');
                    setSigner(null);
                }
                setAccount(newAccounts[0]);
                // The MetaMask plugin also allows signing transactions to
                // send ether and pay to change state within the blockchain.
                // For this, you need the account signer...
                const newSign = ethersProvider.getSigner()
                setSigner(newSign);
                // Time to reload your interface with accounts[0]!
            });
        } else {
            setNoWalletconnect(true);
            message.error('Please install WalletConnect!');
        }

        // signin implementation
        // setUser(user from signin API)
    }, []);

    return {
        walletConnectAccount: Account,
        walletConnectProvider: Provider,
        walletConnectSigner: Signer,
        NoWalletconnect,
        walletConnectChainId: ChainId,
        walletConnectChainName: ChainName,
        walletConnectBlockNumber: BlockNumber,
        walletConnect: connect,
    }
}