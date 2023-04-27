﻿//==本JS是加载Lodop插件或Web打印服务CLodop/Lodop7的综合示例，可直接使用，建议理解后融入自己程序==

//用双端口加载主JS文件Lodop.js(或CLodopfuncs.js兼容老版本)以防其中某端口被占:
var MainJS = 'CLodopfuncs.js',
  URL_WS1 = 'ws://localhost:8000/' + MainJS, //ws用8000/18000
  URL_WS2 = 'ws://localhost:18000/' + MainJS,
  URL_HTTP1 = 'http://localhost:8000/' + MainJS, //http用8000/18000
  URL_HTTP2 = 'http://localhost:18000/' + MainJS,
  URL_HTTP3 = 'https://localhost.lodop.net:8443/' + MainJS; //https用8000/8443

var CreatedOKLodopObject, CLodopIsLocal, LoadJsState;

//==判断是否需要CLodop(那些不支持插件的浏览器):==
function needCLodop() {
  try {
    var ua = navigator.userAgent;
    if (ua.match(/Windows\sPhone/i) || ua.match(/iPhone|iPod|iPad/i) || ua.match(/Android/i) || ua.match(/Edge\D?\d+/i))
      return true;
    var verTrident = ua.match(/Trident\D?\d+/i);
    var verIE = ua.match(/MSIE\D?\d+/i);
    var verOPR = ua.match(/OPR\D?\d+/i);
    var verFF = ua.match(/Firefox\D?\d+/i);
    var x64 = ua.match(/x64/i);
    if (!verTrident && !verIE && x64) return true;
    else if (verFF) {
      verFF = verFF[0].match(/\d+/);
      if (verFF[0] >= 41 || x64) return true;
    } else if (verOPR) {
      verOPR = verOPR[0].match(/\d+/);
      if (verOPR[0] >= 32) return true;
    } else if (!verTrident && !verIE) {
      var verChrome = ua.match(/Chrome\D?\d+/i);
      if (verChrome) {
        verChrome = verChrome[0].match(/\d+/);
        if (verChrome[0] >= 41) return true;
      }
    }
    return false;
  } catch (err) {
    return true;
  }
}

//==检查加载成功与否，如没成功则用http(s)再试==
//==低版本CLODOP6.561/Lodop7.043及前)用本方法==
function checkOrTryHttp() {
  if (window.getCLodop) {
    LoadJsState = 'complete';
    return true;
  }
  if (LoadJsState == 'loadingB' || LoadJsState == 'complete') return;
  LoadJsState = 'loadingB';
  var head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
  var JS1 = document.createElement('script'),
    JS2 = document.createElement('script'),
    JS3 = document.createElement('script');
  JS1.src = URL_HTTP1;
  JS2.src = URL_HTTP2;
  JS3.src = URL_HTTP3;
  JS1.onload =
    JS2.onload =
    JS3.onload =
    JS2.onerror =
    JS3.onerror =
      function () {
        LoadJsState = 'complete';
      };
  JS1.onerror = function (e) {
    if (window.location.protocol !== 'https:') head.insertBefore(JS2, head.firstChild);
    else head.insertBefore(JS3, head.firstChild);
  };
  head.insertBefore(JS1, head.firstChild);
}

window.checkOrTryHttp = checkOrTryHttp;

//==加载Lodop对象的主过程:==
(function loadCLodop() {
  if (!needCLodop()) return;
  CLodopIsLocal = !!(URL_WS1 + URL_WS2).match(/\/\/localho|\/\/127.0.0./i);
  LoadJsState = 'loadingA';
  if (!window.WebSocket && window.MozWebSocket) window.WebSocket = window.MozWebSocket;
  //ws方式速度快(小于200ms)且可避免CORS错误,但要求Lodop版本足够新:
  try {
    var WSK1 = new WebSocket(URL_WS1);
    WSK1.onopen = function (e) {
      console.log('WSK1 onopen');
      setTimeout('window.checkOrTryHttp();', 500);
    };
    WSK1.onmessage = function (e) {
      if (!window.getCLodop) eval(e.data);
    };
    WSK1.onerror = function (e) {
      console.log('WSK1 onerror');
      var WSK2 = new WebSocket(URL_WS2);
      WSK2.onopen = function (e) {
        console.log('WSK2 onopen');
        setTimeout('window.checkOrTryHttp();', 500);
      };
      WSK2.onmessage = function (e) {
        if (!window.getCLodop) eval(e.data);
      };
      WSK2.onerror = function (e) {
        console.log('WSK2 onerror');
        checkOrTryHttp();
      };
    };
  } catch (e) {
    console.log('catch checkOrTryHttp');
    checkOrTryHttp();
  }
})();

//==获取LODOP对象主过程,判断是否安装、需否升级:==
function getLodop(callback, oOBJECT, oEMBED) {
  var rootPath = getRootPath();
  var strFontTag = "<br><font color='#FF0000'>打印控件";
  var strLodopInstall =
    strFontTag + "未安装!点击这里<a href='" + rootPath + "/install_lodop32.exe' target='_self'>执行安装</a>";
  var strLodopUpdate =
    strFontTag + "需要升级!点击这里<a href='" + rootPath + "/install_lodop32.exe' target='_self'>执行升级</a>";
  var strLodop64Install =
    strFontTag + "未安装!点击这里<a href='" + rootPath + "/install_lodop64.exe' target='_self'>执行安装</a>";
  var strLodop64Update =
    strFontTag + "需要升级!点击这里<a href='" + rootPath + "/install_lodop64.exe' target='_self'>执行升级</a>";

  var strCLodopInstallA =
    "<br><font color='#FF0000'>Web打印服务CLodop未安装启动，点击这里<a href='" +
    rootPath +
    "/CLodop_Setup_for_Win32NT.exe' target='_self'>下载执行安装32位打印服务</a>，点击这里<a href='" +
    rootPath +
    "/CLodop_Setup_for_Win64NT_6.571EN.exe' target='_self'>下载执行安装64位打印服务</a>";

  var strCLodopInstallB =
    "<br>（若此前已安装过，可<a href='CLodop.protocol:setup' target='_self'>点这里直接再次启动</a>）";
  var strCLodopInstallC =
    "<br><font color='#FF0000'>注意：<br>" +
    '（1）CLodop安装完成后，会自启动，请不要禁止CLodop的启动；<br>' +
    '（2）卸载时若未卸载干净，可能会导致端口号被占用，无法调起CLodop服务；</font>';

  var strCLodopUpdate =
    "<br><font color='#FF0000'>Web打印服务CLodop需升级!点击这里<a href='" +
    rootPath +
    "/CLodop_Setup_for_Win32NT.exe' target='_self'>执行32位升级</a>，或点击这里<a href='" +
    rootPath +
    "/CLodop_Setup_for_Win64NT_6.571EN.exe' target='_self'>执行64位升级</a>";
  var strInstallOK = '，成功后请刷新本页面或重启浏览器。</font>';

  var LODOP;

  try {
    var ua = navigator.userAgent;
    var isWinIE = /MSIE/i.test(ua) || /Trident/i.test(ua);
    var isWinIE64 = isWinIE && /x64/i.test(ua);

    console.log('ua---' + ua);
    console.log('isWinIE---' + isWinIE + '；isWinIE64---' + isWinIE64);

    if (needCLodop()) {
      try {
        LODOP = window.getCLodop();
      } catch (err) {}
      // if (!LODOP && LoadJsState !== 'complete') {
      //   if (!LoadJsState) alert('未曾加载Lodop主JS文件，请先调用loadCLodop过程.');
      //   else alert('网页还没下载完毕，请稍等一下再操作.');
      //   return;
      // }
      if (!LODOP) {
        callback(strCLodopInstallA + (CLodopIsLocal ? strCLodopInstallB : '') + strInstallOK + strCLodopInstallC);
        return;
      } else {
        console.log('CLODOP.CVERSION---' + CLODOP.CVERSION);
        if (CLODOP.CVERSION < '6.5.7.1') {
          callback(strCLodopUpdate + strInstallOK);
        }
      }
    } else {
      //==如果页面有Lodop插件就直接使用,否则新建:==
      if (oOBJECT || oEMBED) {
        if (isWinIE) LODOP = oOBJECT;
        else LODOP = oEMBED;
      } else if (!CreatedOKLodopObject) {
        LODOP = document.createElement('object');
        LODOP.setAttribute('width', 0);
        LODOP.setAttribute('height', 0);
        LODOP.setAttribute('style', 'position:absolute;left:0px;top:-100px;width:0px;height:0px;');
        if (isWinIE) LODOP.setAttribute('classid', 'clsid:2105C259-1E0C-4534-8141-A753534CB4CA');
        else LODOP.setAttribute('type', 'application/x-print-lodop');
        document.documentElement.appendChild(LODOP);
        CreatedOKLodopObject = LODOP;
      } else LODOP = CreatedOKLodopObject;
      //==Lodop插件未安装时提示下载地址:==
      if (!LODOP || !LODOP.VERSION) {
        callback((isWinIE64 ? strLodop64Install : strLodopInstall) + strInstallOK);
        return LODOP;
      }
      if (LODOP.VERSION < '6.2.2.6') {
        callback((isWinIE64 ? strLodop64Update : strLodopUpdate) + strInstallOK);
        return LODOP;
      }
    }
    //===如下空白位置适合调用统一功能(如注册语句、语言选择等):=======================

    //===============================================================================
    return LODOP;
  } catch (err) {
    alert('getLodop出错:' + err);
  }
}

// 获取项目根路径
function getRootPath() {
  if (!window.location.origin) {
    window.location.origin =
      window.location.protocol +
      '//' +
      window.location.hostname +
      (window.location.port ? ':' + window.location.port : '');
  }

  return `${window.location.origin}${process.env.REACT_APP_PUBLIC_PATH}print`;
}

window.getLodop = getLodop;
