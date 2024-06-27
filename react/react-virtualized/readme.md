# react-virtualized

代码仓库：https://github.com/bvaughn/react-virtualized
官方文档：https://bvaughn.github.io/react-virtualized/#/components/Grid

**优点**

- 全面：提供了虚拟列表、网格、表头固定等多种复杂 UI 组件，功能丰富。
- 优化：内置了各种性能优化措施，如动态行高计算、滚动平滑等。

**缺点**

- 体积较大：相比 `react-window`，`react-virtualized` 包含的功能更多，因此体积更大。
- 更新频率：近年来更新不如 `react-window` 频繁。
- **安装后，需要同步安装 `esbuild-plugin-react-virtualized` 解决 vite 编译/打包报错的问题**。

## esbuild-plugin-react-virtualized

仓库地址：https://github.com/abemedia/esbuild-plugin-react-virtualized

### 解决什么问题

This ESBuild plugin fixes the following issue in `react-virtualized`:

> ERROR: No matching export in "node_modules/react-virtualized/dist/es/WindowScroller/WindowScroller.js" for import "bpfrpt_proptype_WindowScroller"

### 使用方法

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import fixReactVirtualized from 'esbuild-plugin-react-virtualized';

export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      plugins: [fixReactVirtualized],
    },
  },
});
```

## 参考链接

1. [代码仓库](https://github.com/bvaughn/react-virtualized)
2. [官方文档](https://bvaughn.github.io/react-virtualized/#/components/Grid)
3. [esbuild-plugin-react-virtualized](https://github.com/abemedia/esbuild-plugin-react-virtualized)
