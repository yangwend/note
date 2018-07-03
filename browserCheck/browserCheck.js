/*
浏览器判断
*/

// 判断 ie 浏览器：
var ua = navigator.userAgent;
if (/MSIE ([^;]+)/.test(ua) || /Trident\/[^"]*rv:([^\s,^\)]+)/.test(ua)) {
    if (parseInt(RegExp['$1'], 10) <= 9) {
        // 您的浏览器版本过低，请更换浏览器访问
    }
}

// 区分浏览器，不判断版本
function myBrowser(){
    var userAgent = navigator.userAgent; //取得浏览器的 userAgent 字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera"
    }; // 判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } // 判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1){
        return "Chrome";
    } // 判断是否Chrome浏览器
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } // 判断是否Safari浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    }; // 判断是否IE浏览器
}