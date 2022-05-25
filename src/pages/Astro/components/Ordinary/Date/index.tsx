import React, { useState } from 'react';
import style from './style.less';
import { useIntl, useModel } from 'umi';
import { Button, DatePicker } from 'antd';
import type { BigNumber } from 'ethers';

const Date: React.FC<{
  dateOfBirth: string[];
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setDateOfBirth: React.Dispatch<React.SetStateAction<string[]>>;
  setPrimaryTokenId: React.Dispatch<React.SetStateAction<number | undefined>>;
  setCurrentPrice: React.Dispatch<React.SetStateAction<BigNumber | undefined>>;
}> = ({ dateOfBirth, setStep, setDateOfBirth, setPrimaryTokenId, setCurrentPrice }) => {
  const [placeholder, setPlaceholder] = useState<string>('Please select your date of birth');

  const intl = useIntl();

  const {
    PrimeContract,
    OrdinaryContract
  } = useModel('astroContracts');

  const getTokenIdAndPrice = async (month: string, day: string) => {
    const tokenId = await PrimeContract?.getTokenIdByMonthAndDay(Number(month), Number(day));
    const price = await OrdinaryContract?.getBreedConfig(tokenId);
    if (tokenId.toNumber() !== 0) {
      setPrimaryTokenId(tokenId.toNumber());
    }
    if (!!price) {
      setCurrentPrice(price[1]);
    }
  };

  return (
    <div className={style.nftWrapper}>
      <div className={style.nftTitle}>
        {intl.formatMessage({
          id: 'astro.inputYear',
          defaultMessage: 'Then, you need to choose the year you were born',
        })}
      </div>
      <DatePicker
        inputReadOnly
        className={style.input}
        allowClear={false}
        suffixIcon={undefined}
        format={['YYYY/MM/DD', 'YY/MM/DD']}
        onChange={async (_, dateString) => {
          setDateOfBirth(dateString.split('/'));
          await getTokenIdAndPrice(dateString.split('/')[1], dateString.split('/')[2]);
        }}
        placeholder={placeholder}
        onClick={() => {
          setPlaceholder('');
        }}
        onBlur={() => {
          setPlaceholder('Please select your year of birth');
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
          disabled={!dateOfBirth.length}
          onClick={() => {
            setStep(3);
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

export default Date;
