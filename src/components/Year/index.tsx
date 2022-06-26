import React, { useState } from 'react';
import style from '@/style/components.less';
import { useIntl } from 'umi';
import { Button, DatePicker } from 'antd';
import moment from 'moment';
import { useEffect } from 'react';

const Year: React.FC<{
  yearOfBirth: number | undefined;
  breed?: boolean | false;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setYearOfBirth: React.Dispatch<React.SetStateAction<number | undefined>>;
}> = ({ yearOfBirth, breed, setStep, setYearOfBirth }) => {
  const [placeholder, setPlaceholder] = useState<string>('Please select your year of birth');

  const intl = useIntl();

  useEffect(() => {
    setYearOfBirth(1990);
  }, []);

  return (
    <div className={style.nftWrapper}>
      <div className={style.nftTitle}>
        {!breed
          ? intl.formatMessage({
              id: 'astro.inputYear',
              defaultMessage: '2/4, What is your birth year?',
            })
          : intl.formatMessage({
              id: 'astro.inputYear',
              defaultMessage: '2/3, What is your birth year?',
            })}
      </div>
      <div className={style.inputContainer}>
        <div className={style.prefix}>
          {intl.formatMessage({
            id: 'astro.year.prefix',
            defaultMessage: 'I was born in',
          })}
        </div>
        <DatePicker
          className={style.input}
          allowClear={false}
          suffixIcon={undefined}
          picker="year"
          format={['YYYY', 'YY']}
          onChange={(_, dateString) => {
            setYearOfBirth(Number(dateString));
          }}
          defaultValue={moment('1990', 'YYYY')}
          placeholder={yearOfBirth?.toString() || placeholder}
          onClick={() => {
            setPlaceholder('');
          }}
          onBlur={() => {
            setPlaceholder('Please select your year of birth');
          }}
        />
      </div>
      <div className={style.buttons}>
        <Button
          size="large"
          shape="round"
          type="primary"
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
  );
};

export default Year;
