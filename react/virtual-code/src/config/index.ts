
import { BUILD_ENV } from '@/constant';

const apiEnv = import.meta.env.VITE_API_ENV ?? BUILD_ENV.PROD;
console.log('meta.env: ', import.meta.env);

const APIConfig = {
  /** app api环境 */
  getAppEnv: () => apiEnv,

  getApiPrefix: (() => {
    switch (apiEnv) {
      case BUILD_ENV.PROD:
        return 'xxx';
      case BUILD_ENV.TEST:
        return 'xxx';
      case BUILD_ENV.DEV:
        return 'xxx';
      default:
        return '';
    }
  })(),

  getRuleApiPrefix: (() => {
    switch (apiEnv) {
      case BUILD_ENV.PROD:
        return 'xxx';
      case BUILD_ENV.TEST:
        return 'xxx';
      case BUILD_ENV.DEV:
        return 'xxx';
      default:
        return '';
    }
  })(),

  getSSweweOUrl: (() => {
    switch (apiEnv) {
      case BUILD_ENV.PROD:
        return 'prod';
      case BUILD_ENV.TEST:
        return 'test';
      case BUILD_ENV.DEV:
        return 'dev';
      default:
        return '';
    }
  })(),

  getSaServerUrl: (() => {
    switch (apiEnv) {
      case BUILD_ENV.PROD:
        return 'xxx';
      case BUILD_ENV.TEST:
        return 'xxx';
      case BUILD_ENV.DEV:
        return 'xxx';
      default:
        return '';
    }
  })(),
};

export default APIConfig;
