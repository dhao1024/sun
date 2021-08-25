module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 40,
      propList: ['*'],
      selectorBlackList: ['.norem'],
    },
  },
};
