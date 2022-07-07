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
