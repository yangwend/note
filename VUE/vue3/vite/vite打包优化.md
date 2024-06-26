## vite 打包优化

### vite 打包优化

vite.config.ts 中增加配置：

```ts
const vendorLibs: { match: string[]; output: string }[] = [
  {
    match: ['ant-design-vue'],
    output: 'antdv',
  },
  {
    match: ['echarts'],
    output: 'echarts',
  },
  {
    match: ['xlsx'],
    output: 'slsx',
  },
];

export default defineConfig({
  build: {
    sourcemap: false,
    minify: false,
    chunkSizeWarningLimit: 1500,
    terserOptions: {
      // 生产环境移除 console；生产环境禁止 debugger
      compress: {
        drop_console: false,
        drop_debugger: false,
      },
    },
    rollupOptions: {
      output: {
        // 最小化拆分包
        // manualChunks: (id) => {
        //   if (id.includes('node_modules')) {
        //     return id.toString().split('node_modules/')[1].split('/')[0].toString();
        //   }
      },
      // 最小化拆分包
      manualChunks: (id) => {
        const matchItem = vendorLibs.find((item) => {
          const reg = new RegExp(`[\\/]node_modules[\\/]_?(${item.match.join('|')})(.*)`, 'ig');
          return reg.test(id);
        });
        return matchItem ? matchItem.output : null;
      },
      // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
      entryFileNames: 'js/[name].[hash].js',
      // 用于命名代码拆分时创建的共享块的输出命名
      chunkFileNames: 'js/[name].[hash].js',
      // 用于输出静态资源的命名，[ext]表示文件扩展名
      assetFileNames: '[ext]/[name].[hash].[ext]',
      // 拆分js到模块文件夹
      // chunkFileNames: (chunkInfo) => {
      //   const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : [];
      //   const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]';
      //   return `js/${fileName}/[name].[hash].js`;
      // },
    },
  },
  //Turning off brotliSize display can slightly reduce packaging time
  brotliSize: false,
});
```

### vite UI 库自动引入

```ts
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
export const AutoImportDeps = () =>
  AutoImport({
    imports: ['vue', 'vue-router'],
    dts: 'src/auto-imports.d.ts',
  });

export const autoRegistryComponents = () => {
  return Components({
    resolvers: [AntDesignVueResolver({ importStyle: 'less' })],
    dts: true,
    include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
  });
};

plugins.push(AutoImportDeps());
plugins.push(autoRegistryComponents());
plugins.push(
  legacy({
    targets: ['chrome 49'],
    additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
  })
);
```

```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
export default defineConfig({
  plugins: [
    vue(),
    legacy({
      targets: ['firefox > 52'],
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, './src'),
      lodash: 'lodash-es',
    },
  },
  css: {
    modules: {
      generateScopedName: '[local]___[hash:base64:5]',
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
```

在根目录下，会自动生成 auto-imports.d.ts 文件、手动加上 components.d.ts

```ts
// components.d.ts
// generated by unplugin-vue-components
// We suggest you to commit this file into source control
// Read more: https://github.com/vuejs/vue-next/pull/3399
import '@vue/runtime-core';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    AAvatar: typeof import('ant-design-vue/es')['Avatar'];
    AButton: typeof import('ant-design-vue/es')['Button'];
    AConfigProvider: typeof import('ant-design-vue/es')['ConfigProvider'];
    AForm: typeof import('ant-design-vue/es')['Form'];
    AFormItem: typeof import('ant-design-vue/es')['FormItem'];
    AInput: typeof import('ant-design-vue/es')['Input'];
    AModal: typeof import('ant-design-vue/es')['Modal'];
    ARangePicker: typeof import('ant-design-vue/es')['RangePicker'];
    ASelect: typeof import('ant-design-vue/es')['Select'];
    ASelectOption: typeof import('ant-design-vue/es')['SelectOption'];
    ATable: typeof import('ant-design-vue/es')['Table'];
    ATableColumn: typeof import('ant-design-vue/es')['TableColumn'];
    ATabPane: typeof import('ant-design-vue/es')['TabPane'];
    ATabs: typeof import('ant-design-vue/es')['Tabs'];
    ExcelImport: typeof import('./components/ExcelImport/index.vue')['default'];
    MediumCard: typeof import('./components/Container/MediumCard.vue')['default'];
    PageContainer: typeof import('./components/Container/PageContainer.vue')['default'];
    Pagination: typeof import('./components/Pagination/index.vue')['default'];
    RouterLink: typeof import('vue-router')['RouterLink'];
    RouterView: typeof import('vue-router')['RouterView'];
    Search: typeof import('./components/Search/Search.vue')['default'];
    Step: typeof import('./components/Steps/step.vue')['default'];
    Steps: typeof import('./components/Steps/steps.vue')['default'];
    StoreSelect: typeof import('./components/TransferModal/storeSelect.vue')['default'];
    SubTitle: typeof import('./components/Title/SubTitle/index.vue')['default'];
    Transfer: typeof import('./components/TransferModal/transfer.vue')['default'];
    TransferBread: typeof import('./components/TransferBread/index.vue')['default'];
    TransferModal: typeof import('./components/TransferModal/index.vue')['default'];
    DateRangePicker: typeof import('./components/DateRangePicker/index.vue')['default'];
  }
}

export {};
```

### 参考链接

1. [vite 配置，打包优化](https://blog.csdn.net/m0_62152730/article/details/125264683)

2. [vite 打包拆分 js 和 css](https://www.cnblogs.com/peter-web/p/16049628.html)
