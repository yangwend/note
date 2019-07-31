function randomString() {
    var startTime = (new Date()).getTime();
    console.log('数组轮询开始时间：' + startTime);
    var str = "";
    var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    for (var i = 0; i < 5; i++) {
        pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
    }
    var endTime = (new Date()).getTime();
    console.log('数组轮询结束时间：' + endTime);
    console.log('数组轮询耗时：' + (endTime - startTime));
    return str;
}

function randomString1() {
    var startTime = (new Date()).getTime();
    console.log('字符串轮询开始时间：' + startTime);
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    var endTime = (new Date()).getTime();
    console.log('字符串轮询结束时间：' + endTime);
    console.log('字符串轮询耗时：' + (endTime - startTime));

    return text;
}

function randomString2() {
    var startTime = (new Date()).getTime();
    console.log('字符串111轮询开始时间：' + startTime);
    var charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < 5; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    var endTime = (new Date()).getTime();
    console.log('字符串111轮询结束时间：' + endTime);
    console.log('字符串111轮询耗时：' + (endTime - startTime));
    return randomString;
}

var aaa = randomString();
console.log('数组轮询得到结果：' + aaa);

var bbb = randomString1();
console.log('字符串轮询得到结果：' + bbb);

var ccc = randomString2();
console.log('字符串111轮询得到结果：' + ccc);