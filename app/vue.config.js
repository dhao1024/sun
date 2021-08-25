module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:9688',
        // target: 'http://api.sun.com',
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
};
