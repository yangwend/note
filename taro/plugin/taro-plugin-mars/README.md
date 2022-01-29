# taro-plugin-mars

一款名为 `Mars` 的 taro 插件

+ 自定义预渲染
+ 实现taro在支付宝环境下支持使用自定义组件

[CHANGELOG](./CHANGELOG.md)

## 安装

```bash
yarn add @pluve/taro-plugin-mars
```

## 使用
```js
const config = {
  plugins: [
   [
      '@pluve/taro-plugin-mars',
      {
        usingComponents: {
          enable: true,
          include: ['pages/index/index'],
        },
        prerender: {
          enable: true,
          exclude: ['pages/example/index'],
          xml: '<view>loading...</view>',
        },
      },
    ],
  ]
}
```

## 参数说明

### usingComponents

> object

启用自定义组件支持 `alipay`

#### usingComponents.enable

> boolean

是否启用，默认为 `false`

#### usingComponents.include

> Array<string>

包含的页面，默认不包含任何页面，即默认所有页面都不启用


### prerender

> object

自定义预渲染

#### prerender.enable

> boolean

是否启用

#### prerender.exclude

> Array<string>

排除的页面，默认不排除任何页面，即默认所有页面都启用

#### prerender.xml

> string

预渲染 `xml`, 默认为 `<view>loading...</view>`

