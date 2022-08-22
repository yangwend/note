---
layout: center
title: My First Slidev!
themeConfig:
  primary: '#213435'
---

<style>
h2 {
  color: red
}
</style>

## Slidev start

hello Slidev!

---
layout: center
---

## Slidev components
components 目录中的组件可以在 markdown 中直接使用，其组件名与文件名相同。
示例：

<div>
  <Counter :count="10" m="t-4" />
</div>

---
layout: center
---

<style>
blockquote {
  code {
    @apply text-teal-500 dark:text-teal-400;
  }
}
</style>
## Slidev 内联样式
> Hello `world`

---
layout: cover
background: '/public/background-1.jpg'
class: 'text-white'
---

## Slidev 高亮代码块

可直接使用高亮代码块：
```ts {2-3|5|all}
function add(
  a: Ref<number> | number,
  b: Ref<number> | number
) {
  return computed(() => unref(a) + unref(b))
}
```

布局居中，可以使用背景图片

---

## Slidev 本地图片
我是本地图片
![background-1](/public/background-1.jpg)

---


## Slidev 远程图片
![Remote Image](https://sli.dev/favicon.png)

---

## Slidev 使用 img标签
<img src="/public/background-1.jpg" />

---

## Slidev 图标
<uim-rocket />
<uim-rocket class="text-3xl text-red-400 mx-2" />
<uim-rocket class="text-3xl text-orange-400 animate-ping" />

---
layout: default
---

## Slidev $slidev

Slidev 注入了一个 全局的 Vue 上下文 $slidev，用于高级的条件判断或导航控制。

Current page title: {{ $slidev.configs.title }}

Current page is: {{ $slidev.nav.currentPage }}

Current page themeConfigs: {{ $slidev.themeConfigs.primary }}

<div>
  <Foo />
</div>

---

## Slidev 动画
<img
  v-click
  class="absolute -bottom-9 -left-7 w-80"
  src="https://sli.dev/assets/arrow-bottom-left.svg"
/>
<p v-after class="absolute bottom-23 left-45 transform -rotate-10">Here!</p>

<v-clicks>

- Item 1
- Item 2
- Item 3
- Item 4

</v-clicks>

---

## Slidev 运动

<div
  v-if="$slidev.nav.currentPage === 11"
  v-motion
  :initial="{ x: -100 }"
  :enter="{ x: 200 }">
  Slidev
</div>