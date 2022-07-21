/**
 * @ Author: Hikaru
 * @ Create Time: 2022-07-08 05:21:42
 * @ Modified by: Hikaru
 * @ Modified time: 2022-07-22 00:08:51
 * @ Description: i@rua.moe
 */

import { Settings as LayoutSettings } from '@ant-design/pro-components';

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
  title: 'MetaAstro - Connect your soul to Metaverses',
  pwa: false,
  logo: '/images/background/moon.svg',
  iconfontUrl: '',
};

export default Settings;
