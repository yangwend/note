## react + umi3 + KeepAlive

使用 react 结合 umi3 框架开发项目时，有时候需要对页面进行状态缓存，我们可以按照下面两种方式来处理。

### umi-plugin-keep-alive

1. 安装

```shell
$ npm install umi-plugin-keep-alive --save
//或者
$ yarn add umi-plugin-keep-alive
```

2. 使用

```tsx
import { KeepAlive, history } from 'umi';

export default () => {
  return (
    <KeepAlive
      id={history?.location?.search || history?.location?.pathname} // 可按照name卸载缓存状态下的 <KeepAlive> 节点
      saveScrollPosition='screen' // 自动保存共享屏幕容器的滚动位置
      when={() => {
        //true卸载时缓存，false卸载时不缓存
        return history?.action != 'POP';
      }}>
      <AveragePrice /> //要保存状态的组件
    </KeepAlive>
  );
};
```

### 参考链接

1. [react-activation](https://github.com/CJY0208/react-activation/blob/master/README_CN.md)

2. [umi-plugin-keep-alive](https://blog.csdn.net/xiaoxia188/article/details/116519916)
