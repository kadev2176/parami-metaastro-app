/**
 * @ Author: Hikaru
 * @ Create Time: 2022-07-08 05:21:42
 * @ Modified by: Hikaru
 * @ Modified time: 2022-07-22 02:13:52
 * @ Description: i@rua.moe
 */

import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import NoFoundPage from './pages/404';

export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  loading?: boolean;
  leftDays?: number;
}> {
  return {
    settings: defaultSettings,
  };
}

export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    pure: true,
    onPageChange: () => {
      setInitialState({ ...initialState });
    },
    unAccessible: <NoFoundPage />,
    ...initialState?.settings,
  };
};
