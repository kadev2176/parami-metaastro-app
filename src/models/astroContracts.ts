import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
// abi
import ERC20Abi from '@/pages/Astro/abi/ERC20.json';
import MintAbi from '@/pages/Astro/abi/Mint.json';
import BreedAbi from '@/pages/Astro/abi/Breed.json';
import { useModel } from 'umi';
import { contractAddresses } from '@/pages/Astro/config';

export default () => {
    const {
        metaMaskAccount,
        metaMaskProvider,
        metaMaskSigner,
        metaMaskChainId,
    } = useModel('metaMask');
    const {
        walletConnectAccount,
        walletConnectProvider,
        walletConnectSigner,
        walletConnectChainId,
    } = useModel('walletconnect');

    // Contract instances
    const [Erc20Contract, setErc20Contract] = useState<ethers.Contract | null>(null);
    const [MintContract, setMintContract] = useState<ethers.Contract | null>(null);
    const [BreedContract, setBreedContract] = useState<ethers.Contract | null>(null);
    // Initialize contract instances
    useEffect(() => {
        if (!!metaMaskAccount) {
            if (metaMaskChainId !== 1 && metaMaskChainId !== 4) {
                setErc20Contract(null);
                setMintContract(null);
                setBreedContract(null);
                return;
            }
            if (!metaMaskProvider || !metaMaskSigner) {
                return;
            }
            const ad3 = new ethers.Contract(contractAddresses.ad3[metaMaskChainId], ERC20Abi, metaMaskSigner);
            const mint = new ethers.Contract(contractAddresses.mint[metaMaskChainId], MintAbi, metaMaskSigner);
            const breed = new ethers.Contract(contractAddresses.breed[metaMaskChainId], BreedAbi, metaMaskSigner);
            setErc20Contract(ad3);
            setMintContract(mint);
            setBreedContract(breed);
        }
    }, [metaMaskAccount, metaMaskProvider, metaMaskSigner, metaMaskChainId]);

    useEffect(() => {
        if (!!walletConnectAccount) {
            if (walletConnectChainId !== 1 && walletConnectChainId !== 4) {
                setErc20Contract(null);
                setMintContract(null);
                setBreedContract(null);
                return;
            }
            if (!walletConnectProvider || !walletConnectSigner) {
                return;
            }
            const ad3 = new ethers.Contract(contractAddresses.ad3[walletConnectChainId], ERC20Abi, walletConnectSigner);
            const mint = new ethers.Contract(contractAddresses.mint[walletConnectChainId], MintAbi, walletConnectSigner);
            const breed = new ethers.Contract(contractAddresses.breed[walletConnectChainId], BreedAbi, walletConnectSigner);
            setErc20Contract(ad3);
            setMintContract(mint);
            setBreedContract(breed);
        }
    }, [walletConnectAccount, walletConnectProvider, walletConnectSigner, walletConnectChainId]);

    return {
        Erc20Contract,
        MintContract,
        BreedContract,
    };
}
