import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
// abi
import PrimeAbi from '@/pages/Astro/abi/Prime.json';
import OrdinaryAbi from '@/pages/Astro/abi/Ordinary.json';
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
	const [PrimeContract, setPrimeContract] = useState<ethers.Contract | null>(null);
	const [OrdinaryContract, setOrdinaryContract] = useState<ethers.Contract | null>(null);
	// Initialize contract instances
	useEffect(() => {
		if (!!Account) {
			if (ChainId !== 1 && ChainId !== 4) {
				setPrimeContract(null);
				setOrdinaryContract(null);
				return;
			}
			if (!Provider || !Signer) {
				return;
			}
			const prime = new ethers.Contract(contractAddresses.prime[ChainId], PrimeAbi, Signer);
			const ordinary = new ethers.Contract(contractAddresses.ordinary[ChainId], OrdinaryAbi, Signer);
			setPrimeContract(prime);
			setOrdinaryContract(ordinary);
		}
	}, [Account, Provider, Signer, ChainId]);

	return {
		PrimeContract,
		OrdinaryContract,
	};
}
