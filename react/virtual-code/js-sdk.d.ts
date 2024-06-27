declare namespace wx {
  type ImageSizeType = 'original' | 'compressed';
  type ImageSourceType = 'album' | 'camera';
  type ApiMethod =
    | 'onMenuShareTimeline'
    | 'onMenuShareAppMessage'
    | 'onMenuShareQQ'
    | 'onMenuShareWeibo'
    | 'onMenuShareQZone'
    | 'startRecord'
    | 'stopRecord'
    | 'onVoiceRecordEnd'
    | 'playVoice'
    | 'pauseVoice'
    | 'stopVoice'
    | 'onVoicePlayEnd'
    | 'uploadVoice'
    | 'downloadVoice'
    | 'chooseImage'
    | 'previewImage'
    | 'uploadImage'
    | 'downloadImage'
    | 'translateVoice'
    | 'getNetworkType'
    | 'openLocation'
    | 'getLocation'
    | 'hideOptionMenu'
    | 'showOptionMenu'
    | 'hideMenuItems'
    | 'showMenuItems'
    | 'hideAllNonBaseMenuItem'
    | 'showAllNonBaseMenuItem'
    | 'closeWindow'
    | 'scanQRCode'
    | 'chooseWXPay'
    | 'openProductSpecificView'
    | 'addCard'
    | 'chooseCard'
    | 'openCard'
    | 'checkJsApi'
    | 'onRecordEnd'
    | 'openWXDeviceLib'
    | 'closeWXDeviceLib'
    | 'configWXDeviceWiFi'
    | 'getWXDeviceInfos'
    | 'sendDataToWXDevice'
    | 'startScanWXDevice'
    | 'stopScanWXDevice'
    | 'connectWXDevice'
    | 'disconnectWXDevice'
    | 'getWXDeviceTicket'
    | 'WeixinJSBridgeReady'
    | 'onWXDeviceBindStateChange'
    | 'onWXDeviceStateChange'
    | 'onScanWXDeviceResult'
    | 'onReceiveDataFromWXDevice'
    | 'onWXDeviceBluetoothStateChange';

  // 所有JS接口列表
  type jsApiList = ApiMethod[];

  function config(conf: {
    /** 企业微信必须true，否则wx.invoke调用形式的jsapi会有问题 */
    beta?: boolean;
    /** 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开  ，参数信息会通过log打出，仅在pc端时才会打印。*/
    debug?: boolean;
    /** 必填，公众号的唯一标识  */
    appId: string;
    /** 必填，生成签名的时间戳*/
    timestamp: number;
    /** 必填，生成签名的随机串 */
    nonceStr: string;
    /** 必填，生成签名的随机串 */
    signature: string;
    /** 必填，签名，见附录1 */
    jsApiList?: jsApiList;
  }): void;

  interface Resouce {
    localId: string;
  }

  interface BaseParams {
    success?(...args: any[]): void;
    /** 接口调用失败的回调函数 */
    fail?(...args: any[]): void;
    /** 接口取消调用的回调函数 */
    cancel?(...args: any[]): void;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(...args: any[]): void;
  }

  function ready(fn: () => void): void;

  function error(fn: (err: { errMsg: string }) => void): void;

  interface IcheckJsApi extends BaseParams {
    /** 需要检测的JS接口列表，所有JS接口列表见附录2, */
    jsApiList: jsApiList;
    // 以键值对的形式返回，可用的api值true，不可用为false
    // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
    success(res: { checkResult: { [api: string]: boolean }; errMsg: string }): void;
  }
  /**
   * 判断当前客户端版本是否支持指定JS接口
   * 备注：checkJsApi接口是客户端6.0.2新34气的一个预留接口，第一期开放的接口均可不使用checkJsApi来检测。
   */
  function checkJsApi(params: IcheckJsApi): void;

  /*=============================图像接口================================*/
  interface IchooseImage extends BaseParams {
    /** 最多可以选择的图片张数，默认9 */
    count?: number;
    /** original 原图，compressed 压缩图，默认二者都有 */
    sizeType?: ImageSizeType[];
    /** album 从相册选图，camera 使用相机，默认二者都有 */
    sourceType?: ImageSourceType[];
    /** 成功则返回图片的本地文件路径列表 tempFilePaths */
    success(res: {
      sourceType: string; // weixin album camera
      localIds: string[];
      errMsg: string;
    }): void;
    cancel(): void;
  }
  /**
   * 从本地相册选择图片或使用相机拍照。
   */
  function chooseImage(params: IchooseImage): void;

  interface IpreviewImage extends BaseParams {
    /** 当前显示图片的http链接 */
    current: string;
    /** 需要预览的图片http链接列表 */
    urls: string[];
  }
  /**
   * 预览图片接口
   */
  function previewImage(params: IpreviewImage): void;

  interface IuploadImage extends BaseParams {
    /** 需要上传的图片的本地ID，由chooseImage接口获得 */
    localId: string;
    /** 默认为1，显示进度提示 */
    isShowProgressTips: number;
    /** 返回图片的服务器端ID */
    success(res: { serverId: string }): void;
  }
  /**
   * 上传图片接口
   */
  function uploadImage(params: IuploadImage): void;

  interface IdownloadImage extends BaseParams {
    /** 需要下载的图片的服务器端ID，由uploadImage接口获得 */
    serverId: string;
    /** 默认为1，显示进度提示 */
    isShowProgressTips: number;
    /** 返回图片下载后的本地ID */
    success(res: Resouce): void;
  }
  /**
   * 下载图片接口
   */
  function downloadImage(params: IdownloadImage): void;

  interface IgetLocalImgData extends BaseParams {
    /** 图片的localID */
    localId: string; //
    /** localData是图片的base64数据，可以用img标签显示 */
    success(res: { localData: string }): void;
  }

  /**
   * 获取本地图片接口
   */
  function getLocalImgData(params: IgetLocalImgData): void;
  /*=============================图像接口================================*/
  /*=============================微信扫一扫================================*/

  type scanType = 'qrCode' | 'barCode';

  interface IscanQRCode extends BaseParams {
    desc?: string;
    /** 默认为0，扫描结果由微信处理，1则直接返回扫描结果， */
    needResult: 0 | 1;
    /** 可以指定扫二维码还是一维码，默认二者都有 */
    scanType: scanType[];
    /** 当needResult 为 1 时，扫码返回的结果 */
    success(res: { resultStr: string }): void;
    error(fn: (err: { errMsg: string }) => void): void;
  }
  /**
   * 调起微信扫一扫接口
   */
  function scanQRCode(params: IscanQRCode): void;
  /*=============================微信扫一扫================================*/
  /*=============================关闭当前网页窗口================================*/
  /**
   * 关闭当前网页窗口接口
   */
  function closeWindow(): void;
  /*=============================关闭当前网页窗口================================*/
}
