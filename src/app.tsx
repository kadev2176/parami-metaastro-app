import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import RightContent from '@/components/RightContent';
import defaultSettings from '../config/defaultSettings';
import Loading from './components/Loading/Loading';
import { notification } from 'antd';
import { config } from './config/config';
import NoFoundPage from './pages/404';
import Header from './components/Header';

export const initialStateConfig = {
  loading: <Loading />,
};

export async function getInitialState(): Promise<{
  collapsed?: boolean | undefined;
  settings?: Partial<LayoutSettings>;
  loading?: boolean;
}> {
  return {
    collapsed: false,
    settings: defaultSettings,
  };
}

export const request: RequestConfig = {
  errorHandler: (error: any) => {
    const { response } = error;

    if (!response) {
      notification.error({
        description: 'An exception has occurred in your network. Cannot connect to the server',
        message: 'Network exception',
      });
    }
    throw error;
  },
};

export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: true,
    footerRender: () => undefined,
    headerRender: () => (
      <>
        <Header />
      </>
    ),
    headerTitleRender: () => (
      <>
        <div
          className="headerLogo"
          onClick={() => {
            window.location.href = config.page.homePage;
          }}
        >
          <img src="/images/logo-text.svg" />
        </div>
      </>
    ),
    menuHeaderRender: () => (
      <>
        <div
          className="headerLogo"
          onClick={() => {
            window.location.href = config.page.homePage;
          }}
        >
          <img src="/images/logo-text.svg" />
        </div>
      </>
    ),
    menuExtraRender: () => (
      <>
        <div
          className="headerLogo"
          style={{
            display: 'block'
          }}
          onClick={() => {
            window.location.href = config.page.homePage;
          }}
        >
          <img src="/images/logo-text.svg" />
        </div>
      </>
    ),
    onPageChange: () => {
      setInitialState({ ...initialState, collapsed: true });
    },
    collapsed: initialState?.collapsed,
    onCollapse: (collapsed) => {
      setInitialState({ ...initialState, collapsed });
    },
    headerTheme: "light",
    headerHeight: 70,
    unAccessible: <NoFoundPage />,
    ...initialState?.settings,
  };
};
