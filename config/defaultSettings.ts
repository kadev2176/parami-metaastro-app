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
  title: 'MetaAstro',
  pwa: false,
  logo: '/images/background/moon.svg',
  iconfontUrl: '',
};

export default Settings;
