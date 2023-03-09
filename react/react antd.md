## react + antd

### antd 样式按需引入

1. 安装 `babel-plugin-import`

```bash
yarn add babel-plugin-import -S
```

2. 在配置中配置 babel
   ```ts
   extraBabelPlugins: [
    [
      'import', // 要做按需引入，所以是import
       {
         libraryName: 'antd', // 表示要做antd的按需引入
         libraryDirectory: 'es', // antd用es的模块化规范
         style: true, //设置为true即是less
       }
     ],
   ],
   ```
   或
   ```ts
   // antd 按需引入样式
    babel: {
        plugins: [
            [
                "import", // 要做按需引入，所以是import
                {
                    "libraryName": "antd", // 表示要做antd的按需引入
                    "libraryDirectory": "es",// antd用es的模块化规范
                    "style": true //设置为true即是less
                }
            ]
        ]
    },
   ```


### antd Upload 组件使用，出现闪动问题
参考链接：https://blog.csdn.net/qq_37766810/article/details/122090712

复现场景：
1. table 里面的某个字段 voucher 使用 Upload 组件展示，传参为 fileList: [{ uid: '1', url: 'xxx', name: 'xxx' }]。
2. 更改图片时，Upload 组件的 fileList 里面的 uid 与 步骤 1 的 fileList 里面的  uid 不一致，导致每次一更改图片后，会出现闪动情况

解决方案：
1. table 里面的某个字段 voucher 使用 Upload 组件展示，传参为 fileList: [{ uid: record.voucherUid || '1', url: 'xxx', name: 'xxx' }]。
2. 更改图片是，Upload 组件的 fileList 里面的 uid 赋值给 table 数据源里面的 voucherUid。就能保证更改图片后 uid 是一致的，就可以避免闪动情况。


### xxx