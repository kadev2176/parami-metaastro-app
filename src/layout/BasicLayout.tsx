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
