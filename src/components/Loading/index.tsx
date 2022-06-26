import React from 'react';
import styles from '@/style/common.less';
import { Spin } from 'antd';
import { StarFilled } from '@ant-design/icons';

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
