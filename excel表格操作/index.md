## node.js 操作 excel

### js-xls 处理 excel 文件

* workbook 对象：指的是整份 Excel 文档。我们在使用 js-xlsx 读取 Excel 文档之后就会获得 workbook 对象。
* worksheet 对象：指的是 Excel 文档中的表。我们知道一份 Excel 文档中可以包含很多张表，而每张表对应的就是 worksheet 对象。
* cell 对象：指的就是 worksheet 中的单元格，一个单元格就是一个 cell 对象。

```
// workbook
{
    SheetNames: ['sheet1', 'sheet2'],
    Sheets: {
        // worksheet
        'sheet1': {
            // cell
            'A1': { ... },
            // cell
            'A2': { ... },
            ...
        },
        // worksheet
        'sheet2': {
            // cell
            'A1': { ... },
            // cell
            'A2': { ... },
            ...
        }
    }
}
```

1. 用 XLSX.read 读取获取到的 Excel 数据，返回 workbook

2. 用 XLSX.readFile 打开 Excel 文件，返回 workbook

3. 用 workbook.SheetNames 获取表名

4. 用 workbook.Sheets[xxx] 通过表名获取表格

5. 用 worksheet[address]操作单元格

6. 用XLSX.utils.sheet_to_json针对单个表获取表格数据转换为json格式

7. 用XLSX.writeFile(wb, 'output.xlsx')生成新的 Excel 文件




### 参考链接
1. [Nodejs实现Excel表格操作](https://juejin.im/entry/5c0ba46af265da615f7717b4)

2. [Node读写Excel文件探究实践](https://aotu.io/notes/2016/04/07/node-excel/index.html)

