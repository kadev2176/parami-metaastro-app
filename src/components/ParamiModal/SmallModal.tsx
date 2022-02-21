import type { ReactNode } from 'react';
import React from 'react';
import { Modal } from 'antd';

import styles from './style.less';


const SmallModal: React.FC<{
    visable: boolean,
    content: ReactNode,
    footer: ReactNode
}> = ({ visable, content, footer }) => {
    return (
        <Modal
            title={false}
            closable={false}
            className={styles.modal}
            centered
            visible={visable}
            width={650}
            footer={footer}
        >
            {content}
        </Modal >
    );
}
export default SmallModal;