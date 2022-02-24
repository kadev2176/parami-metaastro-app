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
        provider,
        signer,
        chainId,
    } = useModel('metaMask');
    // Contract instances
    const [Erc20Contract, setErc20Contract] = useState<ethers.Contract | null>(null);
    const [MintContract, setMintContract] = useState<ethers.Contract | null>(null);
    const [BreedContract, setBreedContract] = useState<ethers.Contract | null>(null);
    // Initialize contract instances
    useEffect(() => {
        if (chainId !== 1 && chainId !== 4) {
            setErc20Contract(null);
            setMintContract(null);
            setBreedContract(null);
            return;
        }
        if (!provider || !signer) {
            return;
        }
        const ad3 = new ethers.Contract(contractAddresses.ad3[chainId], ERC20Abi, signer);
        const mint = new ethers.Contract(contractAddresses.mint[chainId], MintAbi, signer);
        const breed = new ethers.Contract(contractAddresses.breed[chainId], BreedAbi, signer);
        setErc20Contract(ad3);
        setMintContract(mint);
        setBreedContract(breed);
    }, [provider, signer, chainId]);

    return {
        Erc20Contract,
        MintContract,
        BreedContract,
    };
}
