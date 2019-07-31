/**
 * 将数据表已.xlsx格式导出并下载到本地
 */

var XLSX = require('xlsx');

// 二维数组
var wsData = [
    ['id', 'name', 'role', 'path', 'state'],
    [1, '首页', 'user', '/', 1],
    [2, '全部引擎', 'user', '/role', 2],
    [3, '全部文章', 'admin', '/acticle', 3],
    [4, '部分商品', 'xxx', '/goods', 4]
];

// 使用构建的二维数组创建 sheet
var ws = XLSX.utils.aoa_to_sheet(wsData);
// 创建空的表格簿
var wb = XLSX.utils.book_new();
// 将刚创建的 sheet 追加到表格簿中，并为这个新创建的 sheet 命名为 SheetJS
XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
// 执行写入方法将内存中的表格簿写入到文件 --》 在同级目录下生成 out.xlsx
XLSX.writeFile(wb, 'out.xlsx');



/**
 * 解析 xlsx
 */

var XLSX = require('xlsx');

// 读文件：只能在 node.js 环境下，浏览器下需要借助其他技术
var workbook = XLSX.readFile('out.xlsx');

// 读文件流
var fs = require('fs');
function process_RS(stream/* ReadStream */, cb/* (wb:Workbook)=>void */) {
    var buffers = [];
    stream.on('data', function(data) {
        buffers.push(data);
    });
    stream.on('end', function() {
        var buffer = Buffer.concat(buffers);
        var workbook = XLSX.read(buffer, { type: 'buffer' });

        cb(workbook);
    });
}