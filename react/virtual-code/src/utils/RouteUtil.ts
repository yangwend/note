import { createHashHistory } from 'history';
import UrlUtil from './UrlUtil';

const history = createHashHistory();

export default class RouteUtil {
  static history = history;

  /**
   * @description 解决 ios 拍照后页面重新刷新的问题，故携带参数
   * @author yangwen
   * @static
   * @param {string} path
   * @memberof RouteUtil
   */
  static addSearchParams = (path: string): string => {
    const params = UrlUtil.parseUrlParams(window.location.href);
    console.log('获取到页面查询参数 -> ', params);
    return `${path}${path.indexOf('?') > -1 ? '&' : '?'}staffCode=${
      params?.staffCode || ''
    }&token=${params?.token || ''}`;
  };

  static goPage = (path: string) => {
    history.push(RouteUtil.addSearchParams(path));
  };

  static replacePage = (path: string) => {
    history.replace(RouteUtil.addSearchParams(path));
  };

  static back = () => {
    history.back();
  };
}
