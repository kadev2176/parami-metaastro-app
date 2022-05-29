import React, { useState } from 'react';
import style from './style.less';
import { useIntl } from 'umi';
import { Button, TimePicker } from 'antd';

const Time: React.FC<{
  timeOfBirth: string[];
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setTimeOfBirth: React.Dispatch<React.SetStateAction<string[]>>;
}> = ({ timeOfBirth, setStep, setTimeOfBirth }) => {
  const [placeholder, setPlaceholder] = useState<string>('Please select your time of birth');

  const intl = useIntl();

  return (
    <div className={style.nftWrapper}>
      <div className={style.nftTitle}>
        {intl.formatMessage({
          id: 'astro.inputYear',
          defaultMessage: 'Last, you need to choose the time you were born',
        })}
      </div>
      <div className={style.inputContainer}>
        <div className={style.prefix}>
          {intl.formatMessage({
            id: 'astro.time.prefix',
            defaultMessage: 'I was born at',
          })}
        </div>
        <TimePicker
          inputReadOnly
          className={style.input}
          allowClear={false}
          suffixIcon={undefined}
          format={['HH:mm:ss']}
          placeholder={placeholder}
          onChange={(_, timeString) => {
            setTimeOfBirth(timeString.split(':'));
          }}
          onFocus={() => {
            setPlaceholder('');
          }}
          onBlur={() => {
            setPlaceholder('Please select your time of birth');
          }}
        />
      </div>
      <div
        className={style.buttons}
      >
        <Button
          size='large'
          shape='round'
          type='primary'
          className={style.button}
          disabled={!timeOfBirth.length}
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

export default Time;
