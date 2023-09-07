import XLSX from 'xlsx';

/**
 * 导出excel方法
 * @param headers 表格头部数组
 * @param data 表格dataSource
 * @param fileName 导出表格的名称
 */
const widthMap = [
  { wpx: 100 },
  { wpx: 100 },
  { wpx: 200 },
  { wpx: 80 },
  { wpx: 150 },
  { wpx: 100 },
  { wpx: 300 },
  { wpx: 300 },
];
export function exportExcel(headers: any[], data: any[], fileName = '下载数据.xlsx', width: any[] = widthMap) {
  const _headers = headers
    .map((item, i) =>
      Object.assign({}, { key: item.key, title: item.title, position: String.fromCharCode(65 + i) + 1 })
    )
    .reduce((prev, next) => Object.assign({}, prev, { [next.position]: { key: next.key, v: next.title } }), {});

  const _data = data
    .map((item, i) =>
      headers.map((key, j) =>
        Object.assign({}, { content: item[key.key], position: String.fromCharCode(65 + j) + (i + 2) })
      )
    )
    // 对刚才的结果进行降维处理（二维数组变成一维数组）
    .reduce((prev, next) => prev.concat(next), [])
    // 转换成 worksheet 需要的结构
    .reduce((prev, next) => Object.assign({}, prev, { [next.position]: { v: next.content } }), {});

  // 合并 headers 和 data
  const output = Object.assign({}, _headers, _data);
  // 获取所有单元格的位置
  const outputPos = Object.keys(output);
  // 计算出范围 ,["A1",..., "H2"]
  const ref = `${outputPos[0]}:${outputPos[outputPos.length - 1]}`;

  // 构建 workbook 对象
  const wb = {
    SheetNames: ['mySheet'],
    Sheets: {
      mySheet: Object.assign({}, output, {
        '!ref': ref,
        '!cols': width,
      }),
    },
  };

  // 导出 Excel
  XLSX.writeFile(wb, fileName);
}

/**
 * @description excel 导出
 * 参考：https://blog.51cto.com/u_15301829/4835563
 * @author yangwen
 * @param {{
 *   headers: {
 *     key: string;
 *     title: string;
 *     [key: string]: any;
 *   }[]; // 表头 columns 数组
 *   data: any[]; // 需要导出的数据
 *   fileName?: string; // 导出 excel 文件名
 *   colWidths?: { wpx: number }[]; // 导出 excel 每一列宽度的集合
 * }} {
 *   headers,
 *   data,
 *   fileName = '导出.xlsx',
 *   colWidths,
 * }
 */
export const exportExcel1 = ({
  headers,
  data,
  fileName = '导出.xlsx',
  colWidths,
}: {
  headers: {
    key: string;
    title: string;
    [key: string]: any;
  }[]; // Excel 表头描述
  data: any[]; // 需要导出的数据
  fileName?: string; // 导出 excel 的文件名
  colWidths?: { wpx: number }[]; // 导出 excel 每一列宽度的集合
}) => {
  const currColWidths = colWidths ?? [];
  const headerData: string[] = [];
  const headerParseData: string[] = [];
  headers.forEach((item) => {
    if (currColWidths.length === 0) {
      currColWidths.push({ wpx: 120 });
    }
    headerData.push(item.title);
    headerParseData.push(item.key);
  });
  // 处理导出数据
  const parseData = [headerData];
  for (let index = 0; index < data.length; index++) {
    parseData.push(headerParseData.map((_item) => data[index][_item]));
  }
  // 创建book
  const workbook = XLSX.utils.book_new();
  // json 转 sheet
  const sheet = XLSX.utils.json_to_sheet(parseData, {
    skipHeader: true,
  });
  sheet['!cols'] = [];
  // 修改列宽度
  currColWidths.forEach((width, index) => {
    if (!sheet['!cols']![index]) {
      sheet['!cols']![index] = { wpx: width.wpx };
    } else {
      sheet['!cols']![index].wpx = width.wpx;
    }
  });
  // sheet 写入 book
  XLSX.utils.book_append_sheet(workbook, sheet, 'sheet1');

  // 导出 Excel
  XLSX.writeFile(workbook, fileName);
};
