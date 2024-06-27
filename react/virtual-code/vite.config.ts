
import { defineConfig, splitVendorChunkPlugin, loadEnv } from 'vite';
// import react from '@vitejs/plugin-react'; // 使用@vitejs/plugin-react-swc 替代
import react from '@vitejs/plugin-react-swc';
import legacy from '@vitejs/plugin-legacy';
import removeConsole from 'vite-plugin-remove-console';
import { resolve } from 'path';
import fixReactVirtualized from 'esbuild-plugin-react-virtualized';

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  console.log('env', env);
  console.log('mode: ', mode);
  console.log('command: ', command);

  return {
    base: './',
    mode: mode,
    // 环境变量目录
    envDir: './.config/env',
    // cacheDir: './.vite',
    plugins: [
      splitVendorChunkPlugin(),
      react(),
      legacy({
        targets: [
          '>0.2%',
          'not dead',
          'not op_mini all',
          'Safari >= 6',
          'iOS >= 8',
          'Android >= 4.4',
        ],
      }),
      mode === 'production' ? removeConsole() : undefined,
    ].filter(Boolean),
    optimizeDeps: {
      esbuildOptions: {
        plugins: [fixReactVirtualized],
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      // target: 'es2015',
      cssCodeSplit: true,
      // 压缩
      minify: command === 'build' ? 'esbuild' : false,
      // 服务端渲染
      ssr: false,
      outDir: 'dist',
      chunkSizeWarningLimit: 2000,
      emptyOutDir: true,
      // rollupOptions: {
      //   output: {
      //     manualChunks(id) {
      //       if (id.includes('node_modules')) {
      //         return id
      //           .toString()
      //           .split('node_modules/')[1]
      //           .split('/')[0]
      //           .toString();
      //       }
      //     },
      //   },
      // },
    },
    terserOptions: {
      parse: {
        // parse options
      },
      compress: {
        // compress options
      },
      mangle: {
        // mangle options

        properties: {
          // mangle property options
        },
      },
      format: {
        // format options (can also use `output` for backwards compatibility)
      },
      sourceMap: {
        // source map options
      },
      ecma: 5, // specify one of: 5, 2015, 2016, etc.
      keep_classnames: false,
      keep_fnames: false,
      ie8: false,
      module: false,
      nameCache: null, // or specify a name cache object
      safari10: true,
      toplevel: false,
    },
    server: {
      host: '0.0.0.0',
      port: 5173,
      proxy: {},
    },
  };
});
