/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import 'whatwg-fetch';
import FetchAgent from '@pluve/fetch';
import { Toast } from 'antd-mobile';
import { isPlainObject } from 'lodash';
import { ToolUtil, SensorUtil } from '@/utils';

interface IRequestOptions {
  url: string; // 请求地址
  method?: 'GET' | 'POST'; // 请求参数
  headers?: Headers | {}; // 请求头
  params?: { [key: string]: any };
  data?: any; // 请求体，通常情况传JSON对象即可，支持 application/json 和 application/x-www-form-urlencoded
  body?: any; // data 别名
  submitDataType?: 'json' | 'form'; // 数据提交类型
  timeout?: number; // 超时时间
  isFilterResData?: boolean; // 是否返回 response.data
  filterResDataSuccessCode?: number | string; // 返回 response.data 时 成功状态码
  isShowErrorMessage?: boolean; // 出错时是否弹出错误提示
  credentials?: RequestCredentials | null;
}

const addUrlParams = (url: string, params: { [key: string]: any }) => {
  const isExistParams = /\?/.test(url);
  const addQueryStr = Object.keys(params)
    .filter((k) => !ToolUtil.isEmptyValue(params[k]))
    .map((key) => `${key}=${params[key]}`)
    .join('&');
  return `${url}${isExistParams ? '&' : '?'}${addQueryStr}`;
};

const request = async (options: IRequestOptions): Promise<any> => {
  const {
    url,
    method = 'POST',
    params = {},
    headers = {},
    data = undefined,
    body = undefined,
    submitDataType = 'json',
    timeout = 5 * 60 * 1000, // 默认超时5分钟
    isFilterResData = false,
    filterResDataSuccessCode = 0,
    isShowErrorMessage = true,
    credentials = 'include',
  } = options;

  const finalData = data ?? body ?? {};

  const finalUrl =
    method === 'GET'
      ? addUrlParams(url, {
          ...(isPlainObject(params) ? params : {}),
        })
      : url;

  try {
    const result = await FetchAgent.sendRequest({
      method: method as any,
      url: finalUrl,
      headers: {
        ...headers,
      },
      timeout,
      submitDataType,
      ...(method === 'GET'
        ? {}
        : {
            body: isPlainObject(finalData) ? { ...finalData } : finalData,
          }),
      ...(credentials ? { credentials } : {}),
    });
    if (isFilterResData) {
      if (result?.code === filterResDataSuccessCode) {
        return result.data;
      }
      throw new Error(result?.message);
    }
    return result;
  } catch (error) {
    if (isShowErrorMessage) {
      Toast.show((error as any)?.message ?? '系统错误');
    }

    // // 接口请求超时，上报
    // if ((error as any).code === -999 && (error as any)?.message.indexOf('time out') > -1) {
    //   SensorUtil.api.trackHttpTimeoutEvent({
    //     req_url: finalUrl,
    //     req_params: method === 'GET' ? {} : finalData,
    //   });
    // } else {
    //   // 接口请求失败，上报
    //   SensorUtil.api.trackHttpErrorEvent({
    //     req_url: finalUrl,
    //     req_error: error,
    //     req_params: method === 'GET' ? {} : finalData,
    //   });
    // }

    throw error;
  }
};

export default request;
