/**
 * @ Author: Hikaru
 * @ Create Time: 2022-02-18 15:19:59
 * @ Modified by: Hikaru
 * @ Modified time: 2022-07-22 02:10:38
 * @ Description: i@rua.moe
 */

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
