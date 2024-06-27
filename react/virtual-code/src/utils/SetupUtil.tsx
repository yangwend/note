import { FetchAgent } from '../services';
import { History } from 'history';
import { BUILD_ENV } from '@/constant';
import ApiConfig from '@/config';
// import SensorUtil from './sensors';

export default class SetupUtil {
  static init = (history: History) => {
    console.log('env.mode -> ', ApiConfig.getAppEnv());

    // 神策 初始化
    // SensorUtil.init();

    if (ApiConfig.getAppEnv() !== BUILD_ENV.PROD) {
      import('vconsole').then((m) => {
        const VConsole = m.default;
        const vconsole = new VConsole();
        console.log(`vconsole init, version is ${vconsole.version}`);
      });
    }
    // 打印接口日志
    FetchAgent.setDebug(false);
    FetchAgent.setTimeout(5 * 60 * 1000);

    console.log('注册路由监听 --> ', history);

    history.listen((location) => {
      console.log(`location change: `, location);
    });

    window.addEventListener<'hashchange'>(
      'hashchange',
      (event) => {
        const oldURL = event.oldURL; // 上一个URL
        const newURL = event.newURL; // 当前的URL
        console.log('hashchange --> ', newURL, oldURL);
        return true;
      },
      {
        once: false,
      }
    );
  };
}
