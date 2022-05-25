import React, { useState } from 'react';
import style from './style.less';
import { useIntl, useModel } from 'umi';
import { Button, InputNumber } from 'antd';
import { BigNumber } from 'ethers';

const TokenID: React.FC<{
  tokenID: string | undefined;
  PrimaryTokenId: number | undefined;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setPrimaryTokenId: React.Dispatch<React.SetStateAction<number | undefined>>;
  setCurrentPrice: React.Dispatch<React.SetStateAction<BigNumber | undefined>>;
}> = ({ tokenID, PrimaryTokenId, setStep, setPrimaryTokenId, setCurrentPrice }) => {
  const [placeholder, setPlaceholder] = useState<string>('Please input your referred token ID');

  const {
    OrdinaryContract
  } = useModel('astroContracts');

  const intl = useIntl();

  return (
    <div className={style.nftWrapper}>
      <div className={style.nftTitle}>
        {intl.formatMessage({
          id: 'astro.inputYear',
          defaultMessage: 'Last, you need to input your referred token ID',
        })}
      </div>
      <InputNumber
        size='large'
        className={style.input}
        type="number"
        min={1}
        onChange={async (e: any) => {
          setPrimaryTokenId(e);
          const price = await OrdinaryContract?.getBreedConfig(e);
          setCurrentPrice(price[1]);
        }}
        defaultValue={tokenID}
        placeholder={placeholder}
        value={tokenID || PrimaryTokenId}
        onFocus={() => {
          setPlaceholder('');
        }}
        onBlur={() => {
          setPlaceholder('Please input your referred token ID');
        }}
      />
      <div
        className={style.buttons}
      >
        <Button
          size='large'
          shape='round'
          type='primary'
          className={style.button}
          disabled={!PrimaryTokenId}
          onClick={() => {
            setStep(5);
          }}
        >
          {intl.formatMessage({
            id: 'astro.nextStep',
            defaultMessage: 'Next Step',
          })}
        </Button>
      </div>
    </div>
  )
}

export default TokenID;
