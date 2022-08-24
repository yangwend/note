## querystringify
npm 包，简单的处理 url 字符串解析的工具。

### 安装
```bash
npm install --save querystringify
```

### 使用
```ts
import qs from "querystringify";
qs.parse('?foo=bar'); // { foo: 'bar' }
qs.parse('#foo=bar'); // { foo: 'bar' }
qs.parse('foo=bar'); // { foo: 'bar' }
qs.parse('foo=bar&bar=foo'); // { foo: 'bar', bar: 'foo' }
qs.parse('foo&bar=foo'); // { foo: '', bar: 'foo' }

qs.stringify({ foo: bar });       // foo=bar
qs.stringify({ foo: bar }, true); // ?foo=bar
qs.stringify({ foo: bar }, '#');  // #foo=bar
qs.stringify({ foo: '' }, '&');   // &foo=
```

### 参考链接
1. [querystringify](https://github.com/unshiftio/querystringify)