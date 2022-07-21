/**
 * @ Author: Hikaru
 * @ Create Time: 2022-03-15 22:17:52
 * @ Modified by: Hikaru
 * @ Modified time: 2022-07-22 02:13:15
 * @ Description: i@rua.moe
 */

import { JSEncrypt } from "jsencrypt";

const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDOPcw3rIferK9z0TeJrWj20yewihSc+OWa3/Uzmzqcr+SBvJvkx8Enblc1v4uqUFM9iNztGiiEqUElz2mjUIQ2TdxYC62rui0kb+VE6sykIt43DmQD0NQ9X/DqCl+mJJ9uG8Mj/h1OnCBhrrVadjprn/tfSnBHVZwh+y4dZerapQIDAQAB';

export const RSAEncrypt = (toEncrypt: string) => {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);

  const encrypted = encrypt.encrypt(toEncrypt);
  return encrypted.toString();
};
