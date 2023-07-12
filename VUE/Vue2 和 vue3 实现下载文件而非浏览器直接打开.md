## Vue2 和 vue3 实现下载文件而非浏览器直接打开

1. 采用 vue 自定义指令来处理，将文件链接转换为 blob 进行下载。
2. 直接使用 button，开启 `download` 属性，增加 `target="_blank"`，相当于浏览器打开新的窗口来实现下载。

### 问题背景

对于一个 txt 文本、图片、视频、音频等浏览器可以直接使用浏览器进行预览的文件，使用传统的 a 标签加 download 属性，需要加 target 为 "\_blank" ，才可以实现下载功能。那有没有别的方式来实现下载呢？

### 实现流程

#### 实现思路

使用 vue 自定义指令，对文件链接进行处理，将链接转化为 blob 进行下载，当然，vue2 和 vue3 在写法上有所区别。

#### 定义指令

指令中使用 `fetch` 获取文件内容，并转换为 `blob`，然后通过构造的 `a` 标签模拟点击进行下载。

在 src/directive/vdown.js 文件中，编写指令：

```js
import Vue from 'vue';
Vue.directive('down', {
  inserted: (el, binding) => {
    el.addEventListener('click', () => {
      let link = document.createElement('a');
      let url = binding.value;
      // 这里是将url转成blob地址，
      fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          // 将链接地址字符内容转变成blob地址
          link.href = URL.createObjectURL(blob);
          console.log(link.href);
          link.download = '';
          document.body.appendChild(link);
          link.click();
        });
    });
  },
});
```

```ts
let vdown = {
  mounted: (el, binding) => {
    el.addEventListener('click', () => {
      console.log(binding.value);
      let link = document.createElement('a');
      let url = binding.value;
      // 这里是将url转成blob地址，
      console.log(url);
      fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          // 将链接地址字符内容转变成blob地址
          link.href = URL.createObjectURL(blob);
          console.log(link.href);
          link.download = '';
          document.body.appendChild(link);
          link.click();
        });
    });
  },
};
export default vdown;
```

#### 注册指令

在 Vue2 写法中，已经使用 `Vue.directive` 注册了指令，所以直接在 `main` 中引入自定义指令的脚本文件即可：

```js
import '@/directive/vdown';
```

而在 Vue3 写法中，定义指令的脚本中只是定义了指令的内容而未注册，所以需要在 main 中进行注册：

```ts
import { createApp } from 'vue';
import App from './App.vue';
var app = createApp(App);
// 注册指令
import vdown from '@/directive/vdown';
app.directive('down', vdown);
// 注册结束
app.mount('#app');
```

#### 使用指令

在 Vue 文件中，直接定义下载按钮，添加 v-down 指令并传递要下载的 URL，即可完成下载：

```vue
<template>
  <a v-down="'http://127.0.0.1:8888/file.txt'">下载文件</a>
</template>
```

#### 跨域问题

若遇到跨域问题，配置 proxy 代理解决即可，在 vue.config.js 中添加如下内容：

```js
module.exports = {
  devServer: {
    proxy: {
      '/serverfile': {
        target: 'http://www.xxx.com', //这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, //允许跨域
        pathRewrite: {
          '^/serverfile': '/', //请求的时候使用这个api就可以
        },
      },
    },
  },
};
```

修改下载按钮中的连接：

```
<a v-down="'/serverfile/file.txt'">下载文件</a>
```

然后点击下载即可成功下载。

### 其他思路

1. 以下是 `vue3` 的写法（通过开启 `download` 属性，增加 `target="_blank"`，相当于浏览器打开新的窗口来实现下载）：

```vue
<template>
  <a-button
    type="link"
    :href="ApiConfig.env === 'production' ? MainImgProd : MainImgTest"
    target="_blank"
    download="二维码">
    下载二维码
  </a-button>
</template>
<script setup lang="ts">
import { ApiConfig } from '@/config';
// vue3，将文件放在 assets 下面，再引入进来，即可
import MainImgTest from '@/assets/images/main_img_test.png';
import MainImgProd from '@/assets/images/main_img_prod.png';
</script>
```

2. 以下是 `vue2` 的写法，与上面同理：

```vue
<template>
  <div :class="$style.root">
    <a target="_blank" :href="ExelImg" download="二维码">下载二维码</a>
    <el-link target="_blank" :href="ExelImg" download="二维码">下载二维码1</el-link>
  </div>
</template>

<style lang="scss" module>
.root {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
</style>

<script>
import ExelImg from '@/assets/images/ic_excel.jpg';
export default {
  // 设置meta信息
  metaInfo: {
    title: '欢迎',
  },
  data: () => {
    return {
      ExelImg,
    };
  },
};
</script>
```

### 参考链接

1. [Vue 实现下载文件而非浏览器直接打开](https://www.javafeng.com/20230114/vue-download.html)
