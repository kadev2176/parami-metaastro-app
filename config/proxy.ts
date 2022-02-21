/**
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 */
export default {
  dev: {
    '/api/': {
      target: 'https://parami.io',
      changeOrigin: true,
      pathRewrite: { '^': '' },
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
