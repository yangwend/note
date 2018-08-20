vue 常用插件：

1. vue-resource
（1）通过XMLHttpRequest或JSONP发起请求并处理响应。
    npm install vue-resource --save
    如果你的项目遵守commonJS规范
    var Vue = require('vue');
    Vue.use(require('vue-resource'));

（2）get：
    this.$http.get('book.json', function(data) {
        this.$set('books', data);
    }).error(function(data, status, request) {
        console.log('fail' + status + "," + request);
    })

（3）post：
    this.$http.post(url,postdata,function callback）

这个$http请求和jquery的ajax还是有点区别，这里的post的data默认
不是以form data的形式，而是request payload。
http: {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
}
或者：Vue.http.options.emulateJSON = true;


2. vue-clipboard2
网页端、H5操作剪切板，辅助功能，使用vue-clipboard2 ，适用于vue2.0。 它是基于 
clipboard.js 的封装。更具体的可以查看clipboard.js
用法如下：
    a. cnpm install --save vue-clipboard2
    b. package.json 中包含： "vue-clipboard2": "^0.0.8"
    c. main.js 中添加：
        import Vue;
        import VueClipboard from 'vue-clipboard2';
        Vue.use(VueClipboard);
    d. 写法：
    <button type="button" class="copy-btn" v-clipboard:copy="message"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
        >去关注</button>

    data() {
        return {
            text: '微信号已复制成功，是否继续跳转到微信进行关注',
            message: 'youjinsuo-yyfax'
        }
    },
    methods: {
        onCopy: function(e) {
            if (!this.isAndroid && !this.isIos) {
                this.text = '微信号已复制成功，请您到微信进行关注';
                return;
            }
        },
        onError: function(e) {
            this.text = '请手动复制微信号并打开微信进行关注';
        }
    }


3. 重置css文件
在main.js中 import './assets/styles/reset.css' 可以使用自己习惯的reset。


4. fastclick （解决移动端点击事件延时300毫秒）
    a. cnpm install fastclick --save
    b. main.js中：
        import fastclick from 'fastclick';
        // 避免移动端300ms延迟
        fastclick.attach(document.body);


5. 滑动插件（vue-awesome-swiper）
    a. cnpm vue-awesome-swiper --save
    b. swiper.vue页面中:
        import VueAwesomeSwiper from 'vue-awesome-swiper';
        import 'swiper/dist/css/swiper.css'

        Vue.use(VueAwesomeSwiper)
    c. 注意：swiper第一次创建的时候，传来的可能是空数据，swiper插件就已经创建完成了，
        可能会导致swiper的图片出错，所以要保证有数据的情况下再加载swiper

6. 页面滑动（better-scroll）
    a. cnpm install better-scroll --save
    b. slide.vue页面中：
        import BScroll from 'better-scroll';
        this.scroll = new BScroll('.wrapper');
