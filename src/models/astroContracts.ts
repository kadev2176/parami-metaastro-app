import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
// abi
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
    const [MintContract, setMintContract] = useState<ethers.Contract | null>(null);
    const [BreedContract, setBreedContract] = useState<ethers.Contract | null>(null);
    // Initialize contract instances
    useEffect(() => {
        if (!!Account) {
            if (ChainId !== 1 && ChainId !== 4) {
                setMintContract(null);
                setBreedContract(null);
                return;
            }
            if (!Provider || !Signer) {
                return;
            }
            const mint = new ethers.Contract(contractAddresses.mint[ChainId], MintAbi, Signer);
            const breed = new ethers.Contract(contractAddresses.breed[ChainId], BreedAbi, Signer);
            setMintContract(mint);
            setBreedContract(breed);
        }
    }, [Account, Provider, Signer, ChainId]);

    return {
        MintContract,
        BreedContract,
    };
}
