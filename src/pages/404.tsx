import {config} from '@/config/config';
import React from 'react';
import { useEffect } from 'react';
import { history } from 'umi';

const NoFoundPage: React.FC = () => {
  useEffect(() => {
    history.push(config.page.homePage);
  }, []);

  return (
    <></>
  )
};

export default NoFoundPage;
