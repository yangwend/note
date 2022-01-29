import * as fs from 'fs-extra';

const adapters = {
  weapp: {
    if: 'wx:if',
    else: 'wx:else',
    xml: 'wxml',
  },
  alipay: {
    if: 'a:if',
    else: 'a:else',
    xml: 'axml',
  },
};

// const appendPrenderToXml = (outputPath, filePath) => {
//   const files = fs.readdirSync(`${outputPath}/${filePath}`);
//   files.forEach((file) => {
//     const xmlPath = `${outputPath}/${filePath}/${file}/index.wxml`;
//     try {
//       const stat = fs.statSync(xmlPath);
//       if (stat && stat.isFile()) {
//         // const content = fs.readFileSync(xmlPath);
//         console.log('filePath', `${filePath}/${file}/index`);
//       }
//     } catch (error) {
//       appendPrenderToXml(outputPath, `${filePath}/${file}`);
//     }
//   });
// };

interface IMarsOption {
  usingComponents?: {
    enable?: boolean; // 是否启用
    include?: string[]; // 包含页面
  };
  prerender?: {
    enable?: boolean; // 是否启用
    exclude?: string[]; // 排除页面
    xml?: string; // 预渲染xml
  };
}
export default (
  ctx,
  {
    usingComponents: { enable: initUsingComponentsEnable = false, include: usingComponentsInclude = [] } = {},
    prerender: {
      enable: prerenderEnable = false,
      exclude: prerenderExclude = [],
      xml: prerenderXml = '<view>loading...</view>',
    } = {},
  }: IMarsOption = {}
) => {
  ctx.onBuildFinish(() => {
    const usingComponentsEnable = process.env.TARO_ENV !== 'alipay' ? false : initUsingComponentsEnable;
    if (!usingComponentsEnable && !prerenderEnable) {
      return;
    }
    console.info('Mars optimization start...');
    // 读取编译后的app.json
    const appConf = require(`${ctx.paths.outputPath}/app.json`);
    const { pages = [], subPackages = [] } = appConf;
    // 获取所有的页面路径 - 包含 pages 和 subPackages
    const allPages = [...pages];
    subPackages.forEach((subPkg) => {
      const { root: rootSubPkg, pages: subPkgPages = [] } = subPkg;
      if (rootSubPkg) {
        subPkgPages.forEach((subPkgPage) => {
          allPages.push(`${rootSubPkg}/${subPkgPage}`);
        });
      }
    });

    const Adapter = adapters[process.env.TARO_ENV as string];

    if (!Adapter) {
      throw new Error(`mars插件暂不支持 ${process.env.TARO_ENV} 平台`);
    }

    allPages.forEach((pagePath) => {
      // 获取页面模板(wxml)路径
      const templatePath = `${ctx.paths.outputPath}/${pagePath}.${Adapter.xml}`;
      // 读取页面模板并按行分割
      const [importTemplate, template] = fs.readFileSync(templatePath, 'utf-8').split('\n');
      // 组合后的模板字符串
      let rewriteStr = `${importTemplate}\n`;
      let isUsingComponentPage = false;
      let isPrerenderPage = false;

      // 启用自定义组件支持 - only for alipay
      if (usingComponentsEnable && usingComponentsInclude.includes(pagePath)) {
        isUsingComponentPage = true;
        const [importUtilBaseTemplate, ...otherBaseTemplate] = fs
          .readFileSync(`${ctx.paths.outputPath}/base.${Adapter.xml}`, 'utf-8')
          .split('\n');
        const newImportUtilBaseTemplate = importUtilBaseTemplate.replace(
          /\.\/utils\.sjs/,
          `${new Array(pagePath.split('/').length).join('../')}utils.sjs`
        );
        rewriteStr = `${newImportUtilBaseTemplate}\n${otherBaseTemplate.join('\n')}`;
      }

      // 写入预渲染xml
      if (prerenderEnable && !prerenderExclude.includes(pagePath)) {
        isPrerenderPage = true;
        rewriteStr += `<block ${Adapter.if}="{{root.uid}}">\n${template}\n</block>\n<block ${Adapter.else}>\n${prerenderXml}\n</block>`;
      } else {
        rewriteStr += template;
      }

      if (isUsingComponentPage || isPrerenderPage) {
        // 最终的模板字符串写入文件
        fs.writeFileSync(templatePath, rewriteStr, 'utf-8');
      }
      if (isUsingComponentPage) {
        console.log(`👽 ${pagePath} 启用自定义组件支持成功`);
      }
      if (isPrerenderPage) {
        console.log(`👽 ${pagePath} 启用预渲染成功`);
      }
    });
    console.info('Mars optimization finished');
  });
};
