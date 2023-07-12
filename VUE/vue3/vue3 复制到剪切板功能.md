## vue3 复制到剪切板功能

1. 安装 `vue-lipboard3`

   ```bash
   npm install --save vue-clipboard3
   #
   yarn add -S vue-clipboard3
   ```

2. 在 `setup` 中使用

   ```vue
   <template>
     <button @click="touchCopy">复制链接</button>
   </template>

   <script setup lang="ts">
   // 导入插件
   import useClipboard from 'vue-clipboard3';
   import { message } from 'ant-design-vue';
   // 使用插件
   const { toClipboard } = useClipboard();

   const touchCopy = async () => {
     try {
       // 复制
       await toClipboard('https://www.baidu.com/');
       // 复制成功
       message.success('复制成功');
     } catch (e) {
       // 复制失败
       message.error('复制失败');
     }
   };
   </script>
   ```

### 参考链接

1. [Vue3 复制 copy 功能实现（vue-clipboard3）](https://blog.csdn.net/zz00008888/article/details/127732385)
