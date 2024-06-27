

import { IOptions } from '@/types';

/**
 * 环境
 */
export const BUILD_ENV = {
  PROD: 'production',
  TEST: 'testing',
  DEV: 'development',
  MOCK: 'mock',
};
/**
 * 版本号信息
 */
export enum VERSION {
  label = '1.0.0',
  value = 100,
}

const apiEnv = import.meta.env.VITE_API_ENV ?? BUILD_ENV.PROD;
console.log('meta.env: ', import.meta.env);

/**
 * 企业微信环境appId
 */
export const APP_ID = (() => {
  switch (apiEnv) {
    case BUILD_ENV.PROD:
      return 'xxx';
    case BUILD_ENV.TEST:
      return 'xxx';
    case BUILD_ENV.DEV:
      return 'xxx';
  }
})();

/**
 * 商户ID
 */
export const MERCHANT_ID = (() => {
  switch (apiEnv) {
    case BUILD_ENV.PROD:
      return 'xxx';
    case BUILD_ENV.TEST:
      return 'xxx';
    case BUILD_ENV.DEV:
      return 'xxx';
  }
})();

export const COMPANY_LIST: IOptions[] = [
  {
    value: 'xx',
    label: 'xx',
  },
  {
    value: 'xx',
    label: 'xx',
  },
  {
    value: 'xx',
    label: 'xx',
  },
  {
    value: 'xx',
    label: 'xx',
  },
  {
    value: 'xx',
    label: 'xx',
  },
  {
    value: 'xx',
    label: 'xx',
  },
  {
    value: 'xx',
    label: 'xx',
  },
  {
    value: 'xx',
    label: 'xx',
  },
  {
    value: 'xx',
    label: 'xx',
  },
  {
    value: 'xx',
    label: 'xx',
  },
  {
    value: 'xx',
    label: 'xx',
  },
];
