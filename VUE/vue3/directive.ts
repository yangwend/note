import type { App } from 'vue';

interface IDirective {
  vDownload: true;
}

/**
 * vscode识别类型
 */
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties extends IDirective {}
}

export default {
  install(app: App) {
    app.directive('download', {
      mounted: (el, binding) => {
        el.addEventListener('click', () => {
          console.log('binding.value', binding.value);
          const link = document.createElement('a');
          const url = binding.value;
          // 这里是将url转成blob地址
          fetch(url)
            .then((res) => res.blob())
            .then((blob) => {
              // 将链接地址字符内容转变成blob地址
              link.href = URL.createObjectURL(blob);
              console.log('link.href', link.href);
              link.download = '';
              document.body.appendChild(link);
              link.click();
            });
        });
      },
    });
  },
};

// 在 main.ts 里面中引入并注册
// import { createApp } from 'vue';
// import App from './App.vue';
// import directive from '@/directive';
// import { createPinia } from 'pinia';
// import piniaPersist from 'pinia-plugin-persist';

// const pinia = createPinia();
// pinia.use(piniaPersist);

// const app = createApp(App);
// //全局指令
// app.use(directive);
// app.mount('#app');
