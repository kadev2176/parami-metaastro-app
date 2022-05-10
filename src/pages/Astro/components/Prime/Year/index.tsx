import React, { useState } from 'react';
import style from './style.less';
import { useIntl } from 'umi';
import { Button, DatePicker } from 'antd';

const Year: React.FC<{
  yearOfBirth: number | undefined;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setYearOfBirth: React.Dispatch<React.SetStateAction<number | undefined>>;
}> = ({ yearOfBirth, setStep, setYearOfBirth }) => {
  const [placeholder, setPlaceholder] = useState<string>('Please select your year of birth');

  const intl = useIntl();

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
        picker="year"
        format={['YYYY', 'YY']}
        onChange={(_, dateString) => {
          setYearOfBirth(Number(dateString));
        }}
        placeholder={yearOfBirth?.toString() || placeholder}
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
          block
          size='large'
          shape='round'
          type='primary'
          className={style.button}
          disabled={!yearOfBirth}
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

export default Year;
