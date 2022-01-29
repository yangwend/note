## firefox 问题汇总

### firefox 报错：error is TypeError: NetworkError when attempting to fetch resource.

在火狐浏览器上，如果页面跳转过快，接口请求又比较多，就会出现这个异常。当然，需要排除接口请求是否支持跨域问题以及代码本身问题。

处理方案：过滤掉 `NetworkError when attempting to fetch resource.` 这种错误，不展示在页面上或者弹窗提示，改善用户体验。
