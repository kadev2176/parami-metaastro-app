import { Button, Space } from 'antd';
import React from 'react';
import { useModel, SelectLang, useIntl } from 'umi';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const intl = useIntl();

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }
  return (
    <Space className={className}>
      <div className={styles.appButton}>
        <Button
          size='large'
          type='primary'
          shape='round'
        >
          {intl.formatMessage({
            id: 'common.app',
          })}
        </Button>
      </div>
      <SelectLang className={styles.action} />
    </Space>
  );
};
export default GlobalHeaderRight;
