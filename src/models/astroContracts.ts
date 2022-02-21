import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
// abi
import ERC20Abi from '@/pages/Astro/abi/ERC20.json';
import AstroAbi from '@/pages/Astro/abi/Astro.json';
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
    const [AstroContract, setAstroContract] = useState<ethers.Contract | null>(null);
    // Initialize contract instances
    useEffect(() => {
        if (chainId !== 1 && chainId !== 4) {
            setErc20Contract(null);
            setAstroContract(null);
            return;
        }
        if (!provider || !signer) {
            return;
        }
        const ad3 = new ethers.Contract(contractAddresses.ad3[chainId], ERC20Abi, signer);
        const astro = new ethers.Contract(contractAddresses.astro[chainId], AstroAbi, signer);
        setErc20Contract(ad3);
        setAstroContract(astro);
    }, [provider, signer, chainId]);

    return {
        Erc20Contract,
        AstroContract,
    };
}
