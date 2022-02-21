import React from 'react';
import { useEffect } from 'react';
import { history } from 'umi';

const NoFoundPage: React.FC = () => {
  useEffect(() => {
    history.push('/');
  }, []);

  return (
    <></>
  )
};

export default NoFoundPage;
