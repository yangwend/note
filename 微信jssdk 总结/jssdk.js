// 微信 JSSDK 实现分享功能：

// 1. 绑定域名： 先登录微信公众平台进入“ 公众号设置” 的“ 功能设置” 里填写“ JS接口安全域名”。
// 2. 获取签名包
// 3. 在需要调用JS接口的页面引入如下JS文件，（ 支持https）：
//     <script src = "http://res.wx.qq.com/open/js/jweixin-1.0.0.js" ></script>
// 4. 通过config接口注入权限验证配置
wx.config({
    debug: false,
    appId: '<?php echo $signPackage["appId"];?>',
    timestamp: <?php echo $signPackage["timestamp"];?>,
    nonceStr: '<?php echo $signPackage["nonceStr"];?>',
    signature: '<?php echo $signPackage["signature"];?>',
    jsApiList: [
        // 所有要调用的 API 都要加到这个列表中
        'checkJsApi',
        'openLocation',
        'getLocation',
        'onMenuShareTimeline',
        'onMenuShareAppMessage'
    ]
});
// 5. 通过ready接口处理成功验证：需要把相关接口放在ready函数中调用来确保正确执行
wx.ready(function () {
});
// 5.1 通过checkJsApi判断当前客户端版本是否支持分享参数自定义
wx.checkJsApi({
    jsApiList: [
        'onMenuShareTimeline',
        'onMenuShareAppMessage'
    ],
    success: function (res) {
        alert(JSON.stringify(res));
    }
});
// 5.2 实现JS分享功能

wx.onMenuShareTimeline({
    title: shareTitle, // 分享标题
    link: shareLink, // 分享链接 该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    desc: shareDesc,
    imgUrl: shareImgUrl, // 分享显示的缩略图
    success: function() {
        // 用户确认分享后执行的回调函数
        // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
        // alert('分享完成');
    },
    cancel: function() {
        // 用户取消分享后执行的回调函数
        // alert('淘气了哦，你取消分享');
    },
    fail: function(res) {
        alert(JSON.stringify(res));
    }
});

wx.onMenuShareAppMessage({
    title: shareTitle, // 分享标题
    link: shareLink, // 分享链接
    desc: shareDesc,
    imgUrl: shareImgUrl, // 分享显示的缩略图
    success: function() {
        // 用户确认分享后执行的回调函数
        // alert('分享完成');
    },
    cancel: function() {
        // 用户取消分享后执行的回调函数
        // alert('淘气了哦，你取消分享');
    },
    fail: function(res) {
        alert(JSON.stringify(res));
    }
});

link: location.protocol+"//"+location.host+'/share/wechat/resumeDetail/'+encryptStr, // 分享链接

// 有个分享成功和失败的方法，要放到ready()中，不能放到外面
// debug设置为false，否则一直提示errmsg:config:ok；
// onMenuShareAppMessage和onMenuShareTimeline要放到ready()中！！！