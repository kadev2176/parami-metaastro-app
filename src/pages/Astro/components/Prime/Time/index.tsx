import React from 'react';
import style from './style.less';
import { useIntl } from 'umi';
import { Button, TimePicker } from 'antd';

const Time: React.FC<{
  timeOfBirth: string[];
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setTimeOfBirth: React.Dispatch<React.SetStateAction<string[]>>;
}> = ({ timeOfBirth, setStep, setTimeOfBirth }) => {
  const intl = useIntl();

  return (
    <div className={style.nftWrapper}>
      <div className={style.nftTitle}>
        {intl.formatMessage({
          id: 'astro.inputYear',
          defaultMessage: 'Last, you need to choose the time you were born',
        })}
      </div>
      <TimePicker
        inputReadOnly
        className={style.input}
        allowClear={false}
        suffixIcon={undefined}
        format={['HH:mm:ss']}
        placeholder={intl.formatMessage({
          id: 'astro.time.placeholder',
          defaultMessage: 'Choose time',
        })}
        onChange={(_, timeString) => {
          setTimeOfBirth(timeString.split(':'));
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
          onClick={() => {
            setStep(3);
          }}
        >
          {intl.formatMessage({
            id: 'astro.previousStep',
            defaultMessage: 'Previous Step',
          })}
        </Button>
        <Button
          block
          size='large'
          shape='round'
          type='primary'
          className={style.button}
          disabled={!timeOfBirth}
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
