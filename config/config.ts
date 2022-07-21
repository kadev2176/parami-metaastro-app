/**
 * @ Author: Hikaru
 * @ Create Time: 2022-07-08 05:21:42
 * @ Modified by: Hikaru
 * @ Modified time: 2022-07-22 00:08:29
 * @ Description: i@rua.moe
 */

import { defineConfig } from '@umijs/max';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  request: {},
  initialState: {},
  model: {},
  layout: {
    locale: true,
    ...defaultSettings,
  },
  locale: {
    default: 'en-US',
    antd: true,
    baseNavigator: true,
  },
  targets: {
    ie: 11,
  },
  routes,
  access: {},
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  fastRefresh: true,
  presets: ['umi-presets-pro'],
  analytics: {
    ga: 'G-ZQZG9Y86TV',
  }
});
