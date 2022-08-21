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
## Slidev
> Hello `world`

---
layout: cover
background: './images/background-1.jpg'
class: 'text-white'
---

## Page 2
我是第二张幻灯片

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

## Page 3
我是第三张幻灯片
![background-1](/images/background-1.jpg)