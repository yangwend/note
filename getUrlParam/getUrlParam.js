/**
 * 获取 URL 路径后的 hash
 */
var pageHash = window.location.hash.substr(1); // 页面hash

/**
 * @description 获取 URL 路径后面带的参数
 * decodeURI(xxx) : 对 encodeURI() 函数编码过的 URI 进行解码
 * unescape(xxx) : 对通过 escape() 编码的字符串进行解码
 * @author yangwend
 * @returns 
 */
function getRequest() {
    var url = location.search;
    var theRequest = new Object();

    if (-1 !== url.indexOf('?')) {
        var str = decodeURI(url.substr(1));
        var strs = str.split('&');

        for (var value of strs) {
            theRequest[value.split('=')[0]] = unescape(value.split('=')[1]);
        }
    }
    return theRequest;
}

var request = getRequest();
var idStatus = request.xxx; // 某个 param