// 手机号脱敏
const phone = '18801020102';
const formatPhone: string = phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
console.log(`${phone}脱敏后：${formatPhone}`);

// 使用 url 可以解析url参数（host/hostname/protocol/pathname等等）
// 具体见图【Url-parse方法获得的数据】
import urlParse from 'url';
const parseInfo = urlParse.parse(window.location.href);

// 手机号码格式验证
const phone1 = '15501010101';
const verifyResult = /^(1[1-9][0-9])[0-9]{8}$/.test(phone1);

// 金额千分化(需要注意正负号)
const amount = '1586.36';
const formatAmount = Math.abs(Number(amount)).toFixed(2).replace(/\B(?=(?:\S{3})+$)/g, ',');
const formatAmount1 = Math.abs(Number(amount)).toFixed(2).replace(/\B(?=(\S{3})+$)/g, ',');

// 使用 number-precision
import NP from 'number-precision';

export default class Helper {
    public static centToYuan(cent) {
        cent = Number(cent);
        if (isNaN(cent)) {
            return null;
        }

        return NP.round(NP.divide(cent, 100), 2);
    }

    public static centToYuanOther(cent: any) {
        cent = Number(cent);
        if (isNaN(cent)) {
            return null;
        }
        return parseFloat((cent * 100 / 10000).toPrecision(12));
    }
}

// 循环数组，将每个值都进行分转元处理
var amountInfo = {
    'expectAmount': 1555555,
    'totalProfit': 1555555,
    'yesterdayProfit': 1555555
};
var amountInfoArr = [
    'expectAmount',
    'totalProfit',
    'yesterdayProfit'
];

for (const key of amountInfoArr) {
    amountInfo[key] = Helper.centToYuanOther(amountInfo[key] || 0);
}

// form 表单提交
// 1. 使用 jquery 的 submit() 方法
import * as $ from 'jquery';
$('#form').submit();

// 2. 使用原生的form的提交
setTimeout(() => {
    document.forms && document.forms[0] && document.forms[0].submit();
}, 20);

// input file
const options = {};
$('.form').ajaxSubmit(options);

// 金额校验
// 输入金额前不能有多个0
var mm = '215.36';
var nn = '';
if (/^(?:0{1,})(?:\d+)/g.test(mm)) {
    nn = mm.replace(/^(0{1,})(\d+)/g, '$2');
}

// 小数点前最多9位，小数点后最多2位
if (!/^\d{0,9}(?:\.\d{0,2})?$/g.test(mm)) {
    nn = mm.replace(/^(\d{0,9})(\d{0,})(\.\d{0,2})?(\d{0,})$/g, '$1$3');
}

// 区分是PC 还是 H5
var isMobile = !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/);

// 监听 hash 变化
function hashChange() {}
if (window.addEventListener) {
    window.addEventListener('hashchange', hashChange, false);
} else if (window['attachEvent']) {
    window['attachEvent']('onhashchange', hashChange);
} else {
    window.onhashchange = hashChange;
}

// 身份证号码格式校验
var idCardReg = /(?:^\d{15}$)|(?:^\d{18}$)|(?:^\d{17}(?:\d|X|x)$)/g;

// 50位以内数字或字母
var numberReg = /^[0-9a-zA-Z]{0,50}$/;

// 50字以内字母、数字或中文，不允许特殊符号
var numberStrReg = /^[0-9a-zA-Z\u4e00-\u9fa5]{0,50}$/;

// 匹配 数字 . % 改变颜色
var contentStr = 'wew2er23er23r2';
contentStr = contentStr.replace(/([+\-]?[0-9]+(\.[0-9]+)?(%+)?)/g, "<span class='color-main-fixed text-title'>$& </span>");

// 精确处理 fixed(2)
function toFixed(num, precision) {
    return (Math.round((+num + 'e' + precision) as any) / Math.pow(10, precision)).toFixed(precision);
}

// 判断是否是 IOS/安卓
const u = window.navigator.userAgent;
const isIOS = u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
const isAndroid = -1 < u.indexOf('Android') || -1 < u.indexOf('Adr');

// 深拷贝
function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// 