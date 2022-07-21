/**
 * @ Author: Hikaru
 * @ Create Time: 2022-04-20 17:38:00
 * @ Modified by: Hikaru
 * @ Modified time: 2022-07-22 00:10:53
 * @ Description: i@rua.moe
 */

import { DatePicker } from 'antd';
import React, { useState } from 'react';
import BigModal from '../ParamiModal/BigModal';
import style from './style.less';

const Debug: React.FC<{
  setStartTime: React.Dispatch<React.SetStateAction<string | undefined>>;
  setPreTime: React.Dispatch<React.SetStateAction<string | undefined>>;
}> = ({ setStartTime, setPreTime }) => {
  const [debugModal, setDebugModal] = useState<boolean>(false);

  return (
    <>
      <div className={style.debugContainer} onClick={() => setDebugModal(true)}>
        Debug Panel
      </div>

      <BigModal
        title={'Debug Panel'}
        visable={debugModal}
        close={() => setDebugModal(false)}
        footer={false}
        content={
          <div className={style.modalContainer}>
            <div className={style.field}>
              <div className={style.title}>Countdown start time</div>
              <div className={style.value}>
                <DatePicker
                  size="large"
                  onChange={(_, dateString) => {
                    setStartTime(dateString);
                  }}
                  style={{
                    width: '100%',
                  }}
                />
              </div>
            </div>
            <div className={style.field}>
              <div className={style.title}>Sale time</div>
              <div className={style.value}>
                <DatePicker
                  size="large"
                  onChange={(_, dateString) => {
                    setPreTime(dateString);
                  }}
                  style={{
                    width: '100%',
                  }}
                />
              </div>
            </div>
          </div>
        }
      />
    </>
  );
};

export default Debug;
