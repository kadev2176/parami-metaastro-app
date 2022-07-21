/**
 * @ Author: Hikaru
 * @ Create Time: 2022-07-11 21:54:33
 * @ Modified by: Hikaru
 * @ Modified time: 2022-07-22 00:16:41
 * @ Description: i@rua.moe
 */

import React, { useState } from 'react';
import style from '@/style/components.less';
import { useIntl } from 'umi';
import { Button, TimePicker } from 'antd';
import { DownCircleOutlined } from '@ant-design/icons';

const Time: React.FC<{
  timeOfBirth: string[];
  breed?: boolean | false;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setTimeOfBirth: React.Dispatch<React.SetStateAction<string[]>>;
}> = ({ timeOfBirth, breed, setStep, setTimeOfBirth }) => {
  const [placeholder, setPlaceholder] = useState<string>('Please select your time of birth');

  const intl = useIntl();

  return (
    <div className={style.nftWrapper}>
      <div className={style.nftTitle}>
        {!breed
          ? intl.formatMessage({
              id: 'astro.inputYear',
              defaultMessage: '4/4, Submit more info to generate your MetaAstro.',
            })
          : intl.formatMessage({
              id: 'astro.inputYear',
              defaultMessage: '3/3, Submit more info to generate your MetaAstro.',
            })}
      </div>
      <div className={style.inputContainer}>
        <div className={style.prefix}>
          {intl.formatMessage({
            id: 'astro.time.prefix',
            defaultMessage: 'My birth time is',
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
          renderExtraFooter={() => (
            <div className={style.timePickerFooter}>
              <span>Hour</span>
              <span>Minute</span>
              <span>Second</span>
            </div>
          )}
        />
        <DownCircleOutlined />
      </div>
      <div className={style.buttons}>
        <Button
          size="large"
          shape="round"
          type="primary"
          className={style.button}
          disabled={!timeOfBirth.length}
          onClick={() => {
            setStep(!breed ? 5 : 4);
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

export default Time;
