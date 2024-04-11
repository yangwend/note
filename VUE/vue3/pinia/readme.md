## pinia

> Vue 的存储库，它允许您跨组件/页面共享状态。
> vue2 和 vue3 都可以使用。

### 优势

- dev-tools 支持
  - 跟踪动作、突变的时间线
  - Store 出现在使用它们的组件中
  - time travel 和 更容易的调试
- 热模块更换
  - 在不重新加载页面的情况下修改您的 Store
  - 在开发时保持任何现有状态
- 插件：使用插件扩展 Pinia 功能
- 为 JS 用户提供适当的 TypeScript 支持或 **autocompletion**
- 服务器端渲染支持

### pinia 在封装请求的文件中使用报错的问题

大概说一下背景，vue3 + vite + ts + ant design vue + pinia + axios 的项目中，有一个封装的公共的接口请求的文件 request.ts。request.ts 中使用了 pinia 去获取全局的数据。然后页面启动后报错：

```
Uncaught ReferenceError: Cannot access 'useStore' before initialization
```

究其原因，是在 request.ts 文件封装的公用方法外部直接实例化了公用 store。

```ts
import Vue from 'vue';
import axios from 'axios';
import base62 from 'base62';
const store = CommonStore();
// ...
```

如果放在外面的话，是在 `pinia` 挂载之前使用，这个时候是会出错的，但是在方法里使用的话，这个时候是可以的！

所以在方法里面去调用 CommonStore() 就不会出错了。
![pinia外部使用报错](./images/pinia外部使用报错.png)

### 使用 pinia 修改 state 值

有 5 种方式可以修改 state 的值：

state

```ts
import { defineStore } from 'pinia';
// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useStore = defineStore('main', {
  state: () => {
    return {
      name: 'zs',
      age: 18,
    };
  },
  getters: {},
  actions: {
    setName(name: string) {
      this.name = name;
    },
  },
});
```

修改 state

```vue
<template>
  <div>
    {{ user.name }}----{{ user.age }}
    <button @click="change">改变值</button>
  </div>
</template>

<script setup lang="ts">
import { useStore } from './store';

const user = useStore();

// 第一种方式修改state
/* const change = () => {
  useStore.name = '小黑'
} */

// 第二种方式 调用 $patch 方法，可以修改多个数据
/* const change = () => {
  user.$patch({
    name: "小黑",
    age: 20,
  });
}; */

// 第三种方式 $patch 方法也接受一个函数来批量修改
/* const change = () => {
  user.$patch((state)=>{
    state.name = '小黑'
    state.age = 20
  })
}; */

// 第四种方式 可以通过将其 $state 属性设置为新对象来替换 Store 的整个状态
/* const change = () => {
  user.$state = {
    name: '小黑',
    age: 20
  }
}; */

// 第五种 使用 actions
const change = () => {
  user.setName('小黑');
};
</script>

<style scoped></style>
```

### 参考链接

1. [pinia 官网](https://pinia.web3doc.top/introduction.html)

2. [pinia/vuex 在封装请求的文件中使用报错的问题](https://zhuanlan.zhihu.com/p/447969990)

3. [Vue3 中使用 pinia 修改 state 值的五种方式](https://blog.csdn.net/qq_52099965/article/details/127466446)

4. [vue 中如何优雅高效的使用 pinia](https://zhuanlan.zhihu.com/p/619297883?utm_id=0)
