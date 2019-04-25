## 前端性能监控

### 参考链接
1. [前端性能监控方案window.performance 调研](http://www.cnblogs.com/sunshq/p/5312231.html)

2. [addEventListener() 方法，事件监听](https://www.cnblogs.com/baiyangyuanzi/p/6627401.html)


### 前端性能监控指标

前端性能统计的数据大致有以下几个：

* 白屏时间：从打开网站到有内容渲染出来的时间节点<br/>
(从 html 文档 head 的所有静态资源以及内嵌脚本和样式之前记录一个时间起点，head 最底部记录一个时间终点，差值就是白屏时间，即浏览器解析 html 文档 head 的时间，不准确)

* 首屏时间：首屏内容渲染完毕的时间节点<br/>
(首屏图片、iframe等资源 添加 onload 事件，获取最慢的一个。移动端首屏基本上都展示相同数量的内容，而 PC 端会根据屏幕带下展示不一样的内容，故移动端统计时不准确)

* 用户可操作时间节点：dom ready触发节点<br/>
(dom ready触发的时间节点)

* 总下载时间：window.onload的触发节点<br/>
(window.onload触发的时间节点)

### 知识点

* window.performance

* addEventListener && removeEventListener(兼容：attachEvent && detachEvent)

