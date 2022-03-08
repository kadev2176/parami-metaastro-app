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
        Account,
        ChainId,
        Provider,
        Signer,
    } = useModel('web3');

    // Contract instances
    const [Erc20Contract, setErc20Contract] = useState<ethers.Contract | null>(null);
    const [MintContract, setMintContract] = useState<ethers.Contract | null>(null);
    const [BreedContract, setBreedContract] = useState<ethers.Contract | null>(null);
    // Initialize contract instances
    useEffect(() => {
        if (!!Account) {
            if (ChainId !== 1 && ChainId !== 4) {
                setErc20Contract(null);
                setMintContract(null);
                setBreedContract(null);
                return;
            }
            if (!Provider || !Signer) {
                return;
            }
            const ad3 = new ethers.Contract(contractAddresses.ad3[ChainId], ERC20Abi, Signer);
            const mint = new ethers.Contract(contractAddresses.mint[ChainId], MintAbi, Signer);
            const breed = new ethers.Contract(contractAddresses.breed[ChainId], BreedAbi, Signer);
            setErc20Contract(ad3);
            setMintContract(mint);
            setBreedContract(breed);
        }
    }, [Account, Provider, Signer, ChainId]);

    return {
        Erc20Contract,
        MintContract,
        BreedContract,
    };
}
