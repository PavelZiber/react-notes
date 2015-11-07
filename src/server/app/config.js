'use strict';

export default {
  isProduction: process.env.NODE_ENV === 'production',
  port: 9000,
  version: require('../../../package').version,
  validatorOptions : {
    customValidators : {
      isArray: function(value) {
        return Array.isArray(value);
      }
    }
  }
};
