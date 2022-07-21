/**
 * @ Author: Hikaru
 * @ Create Time: 2022-02-18 15:19:59
 * @ Modified by: Hikaru
 * @ Modified time: 2022-07-21 23:50:44
 * @ Description: Email: i@rua.moe
 */

import styles from '@/style/common.less';
import { StarFilled } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';

const Loading: React.FC = () => {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.pageContainer}>
          <Spin indicator={<StarFilled style={{ fontSize: 32 }} spin />} />
        </div>
      </div>
    </>
  );
};

export default Loading;
