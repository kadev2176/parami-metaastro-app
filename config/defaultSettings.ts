import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  primaryColor: '#ff5b00',
  layout: 'top',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: false,
  colorWeak: true,
  title: 'Parami - Build AD3 for Web3',
  pwa: false,
  logo: '/images/logo-round-core.svg',
  iconfontUrl: '',
};

export default Settings;
