/** 浏览器类型 */
export enum UserAgentEnum {
  ALIPAY = 'alipay',
  MICRO_MESSENGER = 'MicroMessenger',
  WXWORK = 'wxwork', // 企业微信
  OTHER = 'Other',
}

export enum PlatformEnum {
  Android = 'android', // android
  IOS = 'iOS', // iOS
  Unknown = 'unknown', // 未知
}

export type WXJSApis =
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

export type WXscanTypes =
  | 'qrCode' // 二维码
  | 'barCode'; // 一维码

export type WXImageSize = 'original' | 'compressed';
export type WXSourceType = 'album' | 'camera';
