/**
 * @ Author: Hikaru
 * @ Create Time: 2022-07-08 05:21:42
 * @ Modified by: Hikaru
 * @ Modified time: 2022-07-22 00:18:14
 * @ Description: i@rua.moe
 */

import Header from '@/components/Header';
import { Layout } from 'antd';
import React from 'react';

const { Content } = Layout;

type LayoutProps = {
  children: React.ReactNode;
};

const BasicLayout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <Layout>
      <Header />
      <Content>{children}</Content>
    </Layout>
  );
};

export default BasicLayout;
