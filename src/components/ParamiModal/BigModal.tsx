import type { ReactNode } from 'react';
import React from 'react';
import { Button, Modal, Typography } from 'antd';
import styles from './style.less';
import { CloseOutlined } from '@ant-design/icons';

const { Title } = Typography;

const BigModal: React.FC<{
    visable: boolean,
    title?: string,
    content: ReactNode,
    footer: ReactNode,
    close?: () => void,
    bodyStyle?: React.CSSProperties,
}> = ({ visable, title, content, footer, close, bodyStyle }) => {
    return (
        <Modal
            title={
                title ? (
                    <>
                        <Title
                            level={3}
                            className={styles.title}
                        >
                            {title}
                        </Title>
                    </>
                ) : (false)
            }
            closable={close ? true : false}
            closeIcon={
                <>
                    <Button
                        shape='circle'
                        size='large'
                        type='ghost'
                        icon={
                            <CloseOutlined
                                style={{
                                    color: '#ee8240',
                                }}
                                onClick={close}
                            />
                        }
                    />
                </>
            }
            className={styles.modal}
            centered
            visible={visable}
            width={550}
            footer={footer}
            bodyStyle={bodyStyle}
        >
            {content}
        </Modal >
    );
}
export default BigModal;