/**
 * @ Author: Hikaru
 * @ Create Time: 2022-07-08 05:20:45
 * @ Modified by: Hikaru
 * @ Modified time: 2022-07-22 00:22:21
 * @ Description: i@rua.moe
 */

import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import PrimeAbi from '@/config/abi/Prime.json';
import OrdinaryAbi from '@/config/abi/Ordinary.json';
import { contractAddresses } from '@/config/contract';
import { useModel } from 'umi';

export default () => {
  const { Account, ChainId, Instance, Signer } = useModel('web3');

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
      if (!Instance || !Signer) {
        return;
      }
      const prime = new ethers.Contract(contractAddresses.prime[ChainId], PrimeAbi, Signer);
      const ordinary = new ethers.Contract(
        contractAddresses.ordinary[ChainId],
        OrdinaryAbi,
        Signer,
      );
      setPrimeContract(prime);
      setOrdinaryContract(ordinary);
    }
  }, [Account, Instance, Signer, ChainId]);

  return {
    PrimeContract,
    OrdinaryContract,
  };
};
