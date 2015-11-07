export default {
  isProduction: process.env.NODE_ENV === 'production',
  port: 9000,
  version: require('../../package').version
};
