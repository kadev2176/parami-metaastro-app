/**
 * @ Author: Hikaru
 * @ Create Time: 2022-07-08 05:21:42
 * @ Modified by: Hikaru
 * @ Modified time: 2022-07-22 00:08:58
 * @ Description: i@rua.moe
 */

export default {
  dev: {
    '/api/': {
      target: 'https://parami.io',
      changeOrigin: true,
    },
  },
  test: {
    '/api/': {
      target: 'https://parami.io',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/api/': {
      target: 'https://parami.io',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
