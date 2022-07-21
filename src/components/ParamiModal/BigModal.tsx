/**
 * @ Author: Hikaru
 * @ Create Time: 2022-03-26 00:00:00
 * @ Modified by: Hikaru
 * @ Modified time: 2022-07-22 00:13:00
 * @ Description: i@rua.moe
 */

import type { ReactNode } from 'react';
import React from 'react';
import { Button, Modal, Typography } from 'antd';
import styles from './style.less';
import { CloseOutlined } from '@ant-design/icons';

const { Title } = Typography;

const BigModal: React.FC<{
	visable: boolean;
	title?: string;
	content: ReactNode;
	footer: ReactNode;
	close?: () => void;
	bodyStyle?: React.CSSProperties;
	width?: number;
}> = ({ visable, title, content, footer, close, bodyStyle, width }) => {
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
									color: '#fff',
									fontSize: '2rem',
									fontWeight: 900,
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
			width={width || 550}
			footer={footer}
			bodyStyle={bodyStyle}
		>
			{content}
		</Modal >
	);
}
export default BigModal;
