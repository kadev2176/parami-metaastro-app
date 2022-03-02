import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';
import { useState, useCallback, useEffect } from 'react'
import { message } from 'antd';
import ethNet from '@/config/ethNet';
import { defaultChainId } from '@/pages/Astro/config';

export default () => {
    // Web3 status
    const [account, setAccount] = useState<string>('');
    const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
    const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(null);
    const [noMetamask, setNoMetamask] = useState<boolean>(false);
    const [blockNumber, setBlockNumber] = useState<number>(0);
    const [chainId, setChainId] = useState<number>(defaultChainId);
    const [chainName, setChainName] = useState<string>('');

    interface ProviderRpcError {
        message: string;
        code: number;
        data?: unknown;
    }

    useEffect(() => {
        provider?.on('block', (blockNo: number) => {
            setBlockNumber(blockNo);
        });
        setChainName(ethNet[chainId]);
        return () => {
            provider?.removeAllListeners();
        };
    }, [chainId, chainName, provider]);

    const connect = useCallback(async () => {
        const newProvider = await detectEthereumProvider();
        let accounts: string[] = [];
        if (!!newProvider) {
            try {
                accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
            }
            catch (e: any) {
                message.error('This dapp requires access to your account information.');
                return;
            }
            console.log('connect', accounts);
            const ethersProvider = new ethers.providers.Web3Provider((window as any).ethereum as any)
            setProvider(ethersProvider);
            setAccount(accounts[0]);
            const newSigner = ethersProvider.getSigner();
            setSigner(newSigner);
            const initChainId = await newSigner.getChainId();
            // if (initChainId !== 4) {
            //     //TODO: add some condition to switch chainId
            //     await (window as any).ethereum.request({
            //         method: 'wallet_switchEthereumChain',
            //         params: [{ chainId: '0x04' }], // chainId must be in hexadecimal numbers
            //     });
            //     initChainId = await newSigner.getChainId();
            // }
            setChainId(initChainId);
            (window as any).ethereum.on('chainChanged', (newChainId: string) => {
                setChainId(parseInt(newChainId));
            });
            (window as any).ethereum.on('disconnect', (error: ProviderRpcError) => {
                console.log('disconnect', error.code, error.message, error.data);
                ethersProvider.removeAllListeners();
            });
            (window as any).ethereum.on('accountsChanged', function (newAccounts: string[]) {
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
            setNoMetamask(true);
            message.error('Please install MetaMask!');
        }

        // signin implementation
        // setUser(user from signin API)
    }, []);

    return {
        metaMaskAccount: account,
        metaMaskProvider: provider,
        metaMaskSigner: signer,
        NoMetamask: noMetamask,
        metaMaskChainId: chainId,
        metaMaskChainName: chainName,
        metaMaskBlockNumber: blockNumber,
        metaMaskConnect: connect,
    }
}