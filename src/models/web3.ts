/**
 * @ Author: Hikaru
 * @ Create Time: 2022-07-08 05:20:45
 * @ Modified by: Hikaru
 * @ Modified time: 2022-08-15 04:53:47
 * @ Description: i@rua.moe
 */

import WalletConnectProvider from '@walletconnect/web3-provider';
import { providers } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import Web3Modal from 'web3modal';
import { defaultChainId } from '@/config/contract';
import ethNet from '@/config/ethNet';
import { message } from 'antd';
import Fortmatic from 'fortmatic';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';

const customNetworkOptions = {
  rpcUrl: 'https://mainnet.infura.io/v3/eca99940fe244068a87095aa826a34fa',
  chainId: 1,
};

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: 'eca99940fe244068a87095aa826a34fa',
    },
  },
  fortmatic: {
    package: Fortmatic,
    options: {
      key: 'pk_live_505720FB6B5901C9',
      network: customNetworkOptions,
    },
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: 'MetaAstro', // Required
      infuraId: 'eca99940fe244068a87095aa826a34fa', // Required
      rpc: '',
      chainId: 1,
      darkMode: false,
    },
  },
};

interface ProviderRpcError {
  message: string;
  code: number;
  data?: unknown;
}

export default () => {
  const [Account, setAccount] = useState<string | null>();
  const [Instance, setInstance] = useState<any>(null);
  const [Provider, setProvider] = useState<providers.Web3Provider | null>(null);
  const [Signer, setSigner] = useState<providers.JsonRpcSigner | null>(null);
  const [BlockNumber, setBlockNumber] = useState<number>(0);
  const [ChainId, setChainId] = useState<number>(defaultChainId);
  const [ChainName, setChainName] = useState<string>('');
  const [Network, setNetwork] = useState<providers.Network>();
  const [NoProvider, setNoProvider] = useState<boolean>(false);
  const [WaitingChangeNetwork, setWaitingChangeNetwork] = useState<boolean>(false);

  useEffect(() => {
    Provider?.on('block', (blockNo: number) => {
      setBlockNumber(blockNo);
    });
    setChainName(ethNet[ChainId]);
  }, [ChainId, ChainName, Provider]);

  const disconnect = useCallback(async () => {
    const web3Modal = new Web3Modal({
      network: 'mainnet',
      cacheProvider: true,
      providerOptions,
    });
    try {
      web3Modal.clearCachedProvider();
      setInstance(null);
      setProvider(null);
      setSigner(null);
      setAccount(null);
      setNetwork(undefined);
    } catch (e: any) {
      message.error(e.message);
      setNoProvider(true);
    }
  }, []);

  const connect = useCallback(async () => {
    const web3Modal = new Web3Modal({
      network: 'mainnet',
      cacheProvider: true,
      providerOptions,
    });
    try {
      const instance = await web3Modal.connect();
      setInstance(instance);

      const provider = new providers.Web3Provider(instance);
      setInstance(provider);

      const signer = provider.getSigner();
      setSigner(signer);

      const account = await provider.listAccounts();
      setAccount(account[0]);

      const network = await provider.getNetwork();
      setNetwork(network);

      const { chainId } = await provider.getNetwork();
      setChainId(chainId);
      if (chainId !== 1) {
        await instance.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x1' }],
        });
        setWaitingChangeNetwork(true);
      } else {
        setWaitingChangeNetwork(false);
      }

      instance.on('accountsChanged', function (accounts: string[]) {
        if (accounts.length === 0) {
          setAccount('');
          setSigner(null);
        }
        setAccount(accounts[0]);
        const newSign = provider.getSigner();
        setSigner(newSign);
      });
      instance.on('chainChanged', async (newChainId: number) => {
        setChainId(Number(newChainId));
        if (Number(newChainId) !== 1) {
          setInstance(null);
          setProvider(null);
          setSigner(null);
          setAccount('');
          setNetwork(undefined);
          setWaitingChangeNetwork(true);
          message.error('Please switch to the target network');
          return;
        } else {
          setWaitingChangeNetwork(false);
        }
      });
      instance.on('disconnect', (error: ProviderRpcError) => {
        console.log('disconnect', error.code, error.message, error.data);
        disconnect();
        instance?.removeAllListeners();
      });
    } catch (e: any) {
      message.error(e.message || e);
      setNoProvider(true);
      setInstance(null);
      setProvider(null);
      setSigner(null);
      setAccount(null);
      setNetwork(undefined);
      setWaitingChangeNetwork(true);
      return;
    }
  }, []);

  return {
    Account,
    Instance,
    Provider,
    Signer,
    BlockNumber,
    ChainId,
    ChainName,
    NoProvider,
    Network,
    WaitingChangeNetwork,
    connect,
    disconnect,
  };
};
