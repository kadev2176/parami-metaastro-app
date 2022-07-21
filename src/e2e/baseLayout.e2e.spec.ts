/**
 * @ Author: Hikaru
 * @ Create Time: 2022-07-08 05:21:42
 * @ Modified by: Hikaru
 * @ Modified time: 2022-07-22 00:18:09
 * @ Description: i@rua.moe
 */

import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
const { uniq } = require('lodash');
const RouterConfig = require('../../config/routes').default;

const BASE_URL = `http://localhost:${process.env.PORT || 8001}`;

function formatter(routes: any, parentPath = ''): string[] {
  const fixedParentPath = parentPath.replace(/\/{1,}/g, '/');
  let result: string[] = [];
  routes.forEach((item: { path: string; routes: string }) => {
    if (item.path && !item.path.startsWith('/')) {
      result.push(`${fixedParentPath}/${item.path}`.replace(/\/{1,}/g, '/'));
    }
    if (item.path && item.path.startsWith('/')) {
      result.push(`${item.path}`.replace(/\/{1,}/g, '/'));
    }
    if (item.routes) {
      result = result.concat(
        formatter(item.routes, item.path ? `${fixedParentPath}/${item.path}` : parentPath),
      );
    }
  });
  return uniq(result.filter((item) => !!item));
}

const testPage = (path: string, page: Page) => async () => {
  await page.evaluate(() => {
    localStorage.setItem('antd-pro-authority', '["admin"]');
  });
  await page.goto(`${BASE_URL}${path}`);
  await page.waitForSelector('footer', {
    timeout: 2000,
  });
  const haveFooter = await page.evaluate(() => document.getElementsByTagName('footer').length > 0);
  expect(haveFooter).toBeTruthy();
};

const routers = formatter(RouterConfig);

routers.forEach((route) => {
  test(`test route page ${route}`, async ({ page }) => {
    await testPage(route, page);
  });
});
