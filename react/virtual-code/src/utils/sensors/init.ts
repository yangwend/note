/* eslint-disable camelcase */
import APIConfig from '@/config';
import { BUILD_ENV } from '@/constant';
import sensors from 'sa-sdk-javascript';
// @ts-ignore
import pageload from 'sa-sdk-javascript/dist/web/plugin/pageload/index.es6.js';
// @ts-ignore
import pageleave from 'sa-sdk-javascript/dist/web/plugin/pageleave/index.es6.js';

const init = () => {
  const serverUrl = APIConfig.getSaServerUrl;

  if (!serverUrl) {
    return;
  }

  /**
   * 设置公共属性-产品名称
   * 必填
   */
  sensors.registerPage({
    /**
     * 产品名称
     * 不能使用 "-" 符合，可以中文、字母、数字组合
     */
    sys_name: '价格市调H5',
  });

  /**
   * 页面浏览时长
   */
  sensors.use(pageleave, {
    heartbeat_interval_time: 5, // 心跳记录刷新时间，单位：秒
    max_duration: 1 * 24 * 60 * 60, // 最大页面浏览时长(1天)，单位：秒
    isCollectUrl: function (_url: string) {
      // url 为要采集页面浏览时长的页面地址。
      return true; // 采集
      // return false; // 不采集
    },
  });

  /**
   * 页面加载时长
   * max_duration：最大页面加载时长，超过这个时长将不再上报 event_duration 属性。单位：秒
   */
  sensors.use(pageload, { max_duration: 120 });

  /**
   * 初始化
   */
  sensors.init({
    server_url: serverUrl,
    heatmap: {
      clickmap: 'not_collect', // 是否开启点击图，default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭
      scroll_notice_map: 'not_collect', // 是否开启触达图，not_collect 表示关闭，不会自动采集 $WebStay 事件，可以设置 'default' 表示开启。
    },
    is_track_single_page: true, // 单页面配置，默认开启，若页面中有锚点设计，需要将该配置删除，否则触发锚点会多触发 $pageview 事件
    use_client_time: true,
    send_type: 'beacon',
    show_log: APIConfig.getAppEnv() !== BUILD_ENV.PROD, // 是否在控制台开启日志打印
  });

  /**
   * 表示自动采集全埋点数据
   * 无如特殊的需求，不建议开启
   * 注意：如果进首页不会自动 redirect 时，sa.quick('autoTrack') 是需要的，否则不需要。
   * 注意：开启后，若用户使用 hash 的路由模式，也会监听 popstate 和 hashchange 事件来自动触发 $pageview 事件。不需要再进行手动模式埋点
   */
  sensors.quick('autoTrack'); // 用于采集 $pageview 事件。
};

export default init;
