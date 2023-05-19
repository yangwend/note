## js 库 localforage

默认情况下，`localForage` 按照以下顺序选择数据仓库的后端驱动：

`IndexedDB`
`WebSQL`
`localStorage`

如果你想强制使用特定的驱动，可以使用 `setDriver()`，参数为以下的某一个或多个：

- localforage.INDEXEDDB
- localforage.WEBSQL
- localforage.LOCALSTORAGE

### 参考链接

1. [localforage](http://localforage.docschina.org/#localforage)
2. [localforage 使用](https://www.zhangxinxu.com/wordpress/2018/06/js-localforage-localstorage-indexdb/)
3. [WebSQL 和 IndexedDB](https://www.cnblogs.com/zjw2004112/p/12744363.html)
