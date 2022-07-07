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
