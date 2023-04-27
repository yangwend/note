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
2. 更改图片时，Upload 组件的 fileList 里面的 uid 与 步骤 1 的 fileList 里面的 uid 不一致，导致每次一更改图片后，会出现闪动情况

解决方案：

1. table 里面的某个字段 voucher 使用 Upload 组件展示，传参为 fileList: [{ uid: record.voucherUid || '1', url: 'xxx', name: 'xxx' }]。
2. 更改图片是，Upload 组件的 fileList 里面的 uid 赋值给 table 数据源里面的 voucherUid。就能保证更改图片后 uid 是一致的，就可以避免闪动情况。

### setFieldValue don't call dependencies form field change

参考：https://github.com/ant-design/ant-design/issues/36985

复现例子：https://codesandbox.io/s/antd-form-forked-fd3xwu?file=/src/App.js

根据目前 antd 的 issues，官方还没有提供解决办法，可以暂时先用 `shouldUpdate` 修复，或者自己监听 onChange 后手动触发

### antd(antdV) table scroll 设置 x 为 max-content 和 y 设置某个值后，表头宽度自适应失效

scroll 设置为 `{{ x: 'max-conetnt', y: 300 }}` 后，x 设置失效。antd 和 antd-vue 都是如此。

研究其代码发现，设置 x 为 max-content 时有一个样式，设置 y 时有一个样式，结果组合的时候，把 x 设置的独特样式给干掉了。所以 x 失效了。看了官网的 issue，大家提出来了，但是还没有解决。

以下是临时的解决办法

```tsx
<Table
  rowKey='id'
  rowSelection={rowSelection}
  size='small'
  bordered
  columns={columns}
  {...tableProps}
  scroll={{ x: 'max-content' }}
  className={styles.table}></Table>
```

```less
.table {
  :global {
    .ant-table-content {
      overflow: auto !important;
      max-height: calc(100vh - 330px);
    }
    .ant-table-thead {
      position: -webkit-sticky;
      position: sticky;
      z-index: 3; // fixed 字段 z-index 为 2
      top: 1px;
      box-shadow: 0px -1px 0px 0px #f0f0f0;

      top: 0; // bordered 设置为 false 时就直接 top 为 0 即可
    }
  }
}
```

### 嘻嘻嘻
