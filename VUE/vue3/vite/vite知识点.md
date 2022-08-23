## vite 知识点

### defineConfig

如果配置文件需要基于（dev/serve 或 build）命令或者不同的 模式 来决定选项，则可以选择导出这样一个函数：

```ts
export default defineConfig(({ command, mode }) => {
  if (command === 'serve') {
    return {
      // dev 独有配置
    };
  } else {
    // command === 'build'
    return {
      // build 独有配置
    };
  }
});
```

1. command 取值：

- serve(开发环境下，在 CLI 中，vite dev 和 vite serve 是 vite 的别名)
- build(生产环境，vite build)

2. mode 取值（通过命令行 --mode 选项来重写）：
   - development
   - test
   - production

```json
{
  "scripts": {
    "start:develop": "vite --mode development",
    "start:testing": "vite --mode test",
    "start:product": "vite --mode production",
    "build:develop": "vite build --mode development",
    "build:testing": "vite build --mode test",
    "build:product": "vite build --mode production",
    "preview": "vite preview"
  }
}
```

### 参考链接

1. [Vite 配置 defineConfig](https://vitejs.cn/config/)
