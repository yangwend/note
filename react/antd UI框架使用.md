## react + antd UI 框架

### 内置的时间库 day.js 与 moment.js 相互转换

1.  antd5，antd5 内置的时间库由 moment.js 替换为 day.js，如果想换为 API 一致的 moment.js，可以参考：https://ant.design/docs/react/use-custom-date-library-cn

```tsx
import { Moment } from 'moment';
import momentGenerateConfig from 'rc-picker/es/generate/moment';
import generatePicker from 'antd/es/date-picker/generatePicker';

const DatePicker = generatePicker<Moment>(momentGenerateConfig);

export default DatePicker;
```

or

使用 `@ant-design/moment-webpack-plugin` 插件，需要自行验证，未使用过

```ts
// config.ts
export default defineConfig({
  ...
  plugins: ['@umijs/plugins/dist/locale', '@umijs/plugins/dist/antd', '@umijs/plugins/dist/moment2dayjs', '@umijs/plugins/dist/layout', '@umijs/plugins/dist/request'],
  ignoreMomentLocale: true,
  locale: {
    default: 'zh-CN',
    antd: true,
    title: true,
    baseNavigator: false,
    baseSeparator: '-',
  },
  chainWebpack(config: any) {
    config.plugin('moment2dayjs').use('antd-dayjs-webpack-plugin');
  },
  moment2dayjs: {
    preset: 'antd',
    plugins: ['duration'],
  },
});
```

2.  antd4，内置的时间库就是 moment.js，如果想换为体积更小的 day.js，可以参考：https://4x.ant.design/docs/react/replace-moment-cn

```tsx
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import dayjsGenerateConfig from 'rc-picker/es/generate/dayjs';
import generatePicker from 'antd/es/date-picker/generatePicker';
import 'antd/es/date-picker/style/index';

dayjs.locale('zh-cn');

const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);

export default DatePicker;
```

or

使用 `antd-dayjs-webpack-plugin` 插件，

```ts
// config.ts
export default defineConfig({
  ...
  ignoreMomentLocale: true,
  locale: {
    default: 'zh-CN',
    antd: true,
    title: false,
    baseNavigator: false,
  },
  chainWebpack(config: any) {
    config.plugin('moment2dayjs').use('antd-dayjs-webpack-plugin');
  },
});
```
