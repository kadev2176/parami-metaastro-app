import React from 'react';
import styles from '@/style/common.less';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Loading: React.FC = () => {

    return (
        <>
            <div className={styles.mainContainer}>
                <div className={styles.pageContainer}>
                    <Spin
                        indicator={
                            <LoadingOutlined
                                style={{ fontSize: 32 }}
                                spin
                            />
                        }
                    />
                </div>
            </div>
        </>
    )
}

export default Loading;
