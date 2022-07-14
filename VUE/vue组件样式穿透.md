## vue组件样式穿透

在使用 `vue` 作为开发框架来开发项目时，避免不了会去引用一些第三方组件。有时候第三方组件的样式并不能满足我们UI的场景，此时就需要我们去修改组件的样式，但是又不想去除 `scoped` 属性造成组件之间样式的污染。此时我们就需要样式穿透 `scoped`。有三种方式可以实现：
1. `>>>`
2. `/deep/`
3. `::v-deep`
   
### `>>>`
如果是使用 `css` 来开发，那我们可以直接使用 `>>>` 穿透修改。如果是使用 `sass/less` 的话，可能无法识别，这时就需要使用 `/deep/` 和 `::v-deep` 选择器。

```css
<style scoped>
.a {
  // .b 是第三方组件类名
  >>> .b {
    background: #fff;
  }
}
</style>
```

### `/deep/`
```scss
<style scoped>
.a {
  // .b 是第三方组件类名
  /deep/ .b {
    background: #fff;
  }
}

// .d 是第三方组件类名
.c /deep/ .d {
  background: #fff;
}
</style>
```

### `::v-deep`
```scss
<style scoped>
.a {
  // .b 是第三方组件类名
  ::v-deep .b {
    background: #fff;
  }
}

// .d 是第三方组件类名
.c ::v-deep .d {
  background: #fff;
}
</style>
```

`vue3` 的环境下，安装项目时选择了 `dart-sass`，这个不支持 `>>>` 和 `/deep/` 写法，只能使用 `::v-deep`。如果选择的是 `node-sass` 就不会有这个问题。

**强烈建议使用 `::v-deep`，更保险且编译速度更快。**

### 参考链接
1. [了解 vue组件样式穿透 /deep/ ::v-deep ＞＞＞ 区别 ===](https://blog.csdn.net/weixin_58726419/article/details/120961244)