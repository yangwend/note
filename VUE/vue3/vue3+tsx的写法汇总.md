## vue3+tsx 的写法汇总

有时候，我们会需要在 `vue3` 中使用 `tsx` 写法来实现组件编写逻辑。

### `vite` 项目支持 `tsx` 写法环境准备

1. 安装 `vite` 插件：`@vitejs/plugin-vue-jsx`

```bash
yarn add @vitejs/plugin-vue-jsx -D
```

2. 在 `vite.config.ts` 加入 `tsx` 配置

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vue from '@vitejs/plugin-vue';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
});
```

3. 配置 tsconfig.json
   ```json
   {
     "compilerOptions": {
       "jsx": "preserve"
     }
   }
   ```

### 改造步骤

将 xx.vue 改为 xx.tsx

组件命名需使用大驼峰命名（name 需要使用 大驼峰 命名）？？？好像横线分隔也是 OK 的

在模板语法中，setup 函数选项需要 return 一个对象。在 tsx 语法中，setup 需 **return 一个箭头函数**，所有在 template 里面写的内容需要转为 **该函数体内，且只有一个根标签**。

```tsx
// App.tsx
import { defineComponent } from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import Logo from './assets/logo.png';

export default defineComponent({
  name: 'App',
  components: { HelloWorld },
  setup() {
    return () => (
      <>
        <img alt='Vue logo' src='/{Logo}' />
        <HelloWorld msg='Hello Vue 3 + Vite' />
      </>
    );
  },
});
```

### 语法

#### 样式

如果直接导入 css 文件，则直接使用类名，相当于全局类名（属性名 class 需要写成 className）

```tsx
// App.css
.nameInfo {
  color: red;
}

// App.tsx
import { defineComponent } from "vue"
import "./App.css"
export default defineComponent({
  setup() {
   return () => {
     <div className="nameInfo" style={{ color: "red" }}>欢迎~</div>
   }
  }
})
```

vite 天然支持 css modules。任何以 .module.css 为后缀名的 css 文件，都可以作为 css modules 文件。

```tsx
/* example.module.css */
.red {
   color: red;
}

import { defineComponent } from "vue";
import styles from "./example.module.css";

export default defineComponent({
  setup() {
    return () => {
      <div className={styles.red} style={{ color: "red" }}>欢迎~</div>
    }
  }
})
```

#### 指令语法

1. v-text
   ```tsx
   import { defineComponent, ref } from 'vue';
   export default defineComponent({
     name: 'HelloWorld',
     setup() {
       const text = ref('欢迎');
       return () => (
         <>
           <h1 v-text={text.value}></h1>
         </>
       );
     },
   });
   ```
2. v-html
   ```tsx
   import { defineComponent, ref } from 'vue';
   export default defineComponent({
     name: 'HelloWorld',
     setup() {
       const text = ref('欢迎');
       return () => (
         <>
           <h1 v-html={text.value}></h1>
         </>
       );
     },
   });
   ```
3. v-show
   ```tsx
   import { defineComponent, ref } from 'vue';
   export default defineComponent({
     name: 'HelloWorld',
     setup() {
       const visible = ref(true);
       setTimeout(() => {
         visible.value = false;
       }, 2000);
       return () => (
         <>
           <div v-show={visible.value} style={{ color: 'red' }}>
             欢迎
           </div>
         </>
       );
     },
   });
   ```
4. v-if、v-else-if、v-else 无法直接使用，需使用逻辑与、逻辑或、三元表达式实现条件渲染。

```tsx
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'HelloWorld',
  setup() {
    const h1Show = ref(true);
    const h2Hide = ref(false);
    const h3Show = ref(true);
    return () => (
      <>
        {h1Show.value && <h1>这个显示</h1>}
        {h2Hide.value && <h2>这个不显示</h2>}
        {h3Show.value ? <h3>h3Show.value为true显示</h3> : <h3>h3Show.value为false显示</h3>}
      </>
    );
  },
});
```

5. v-for 无法直接使用，需使用 map 去实现循环遍历渲染。
   ```tsx
   import { defineComponent, reactive } from 'vue';
   export default defineComponent({
     name: 'HelloWorld',
     setup() {
       const list = reactive([1, 2, 3]);
       return () => (
         <>
           {list.map((item) => (
             <h1>值为：{item}</h1>
           ))}
         </>
       );
     },
   });
   ```
6. v-on 无法直接使用，需使用原生绑定事件方式去实现，因此**无法使用事件修饰符**。
   ```tsx
   // 不需要传值
   import { defineComponent, ref } from 'vue';
   export default defineComponent({
     name: 'HelloWorld',
     setup() {
       const myName = ref('~WEB前端~');
       const changName = () => {
         myName.value = '欢迎';
       };
       return () => (
         <>
           <button onClick={changName}>{myName.value}</button>
         </>
       );
     },
   });
   ```
   ```tsx
   // 传值的写法（高阶函数）
   import { defineComponent, ref } from 'vue';
   export default defineComponent({
     name: 'HelloWorld',
     props: ['msg'],
     setup() {
       const myName = ref('~WEB前端~');
       const changName = (value) => {
         console.log('value', value);
         myName.value = '欢迎';
       };
       return () => (
         <>
           <button onClick={() => changName('欢迎')}>{myName.value}</button>
         </>
       );
     },
   });
   ```
   ```tsx
   // 获取事件对象
   import { defineComponent, ref } from 'vue';
   export default defineComponent({
     name: 'HelloWorld',
     props: ['msg'],
     setup() {
       const myName = ref('~WEB前端~');
       const changName = (event, value) => {
         console.log('event', event);
         console.log('value', value);
         myName.value = '欢迎';
       };
       return () => (
         <>
           <button onClick={(event) => changName(event, '欢迎~')}>{myName.value}</button>
         </>
       );
     },
   });
   ```
7. v-bind
   （1）标签属性值如果需要一个变量，需要按照 属性名={变量名} 的形式书写，并且属性名前不能带 “:” ；
   （2）如果是 ref 包装之后的响应式变量，需要按照 属性名={变量名.value} 的形式书写；
   （3）图片资源需先导入后使用，如下示例中的 logo 图片资源：

```tsx
import { defineComponent, ref } from 'vue';
import Logo from './assets/logo.png';
export default defineComponent({
  setup() {
    const altText = ref('Vue logo');
    return () => {
      <img alt={altText.value} src={Logo} />;
    };
  },
});
```

8. v-model
   ```tsx
   import { defineComponent, ref } from 'vue';
   export default defineComponent({
     name: 'HelloWorld',
     setup() {
       const text = ref('WEB前端~');
       return () => (
         <>
           <h1>{text.value}</h1>
           <input v-model={text.value} placeholder='~WEB前端~' />
         </>
       );
     },
   });
   ```
9. v-model 修饰符

```
vue文件
<input v-model.trim="keyword" />

tsx文件
<input v-model={[keyword, ['trim']]} />
传递一个数组，第一项为传递的值，第二项为修饰器名称
```

```
vue文件：
<ChildComponent v-model.custom:pageTitle="pageTitle" />

tsx文件：
<ChildComponent v-model={[pageTitle, ['custom'], 'pageTitle']} />
传递一个数组，数组第一项为传递的数据，第二项也是一个数组，传入修饰符名称，第三项是子组件接收的名称
```

10. v-slot，在 tsx 中 v-slot，需要写成 `v-slots`

```tsx
// HelloWorld.tsx
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'HelloWorld',
  props: ['msg'],
  setup(props, { slots }) {
    return () => (
      <>
        <h1>{slots.default ? slots.default() : 'WEB前端'}</h1>
        <h2>{slots.bar?.()}</h2>
      </>
    );
  },
});
```

第一种：

```tsx
// App.tsx
import { defineComponent } from 'vue';
import HelloWorld from './components/HelloWorld.tsx';
export default defineComponent({
  name: 'App',
  components: { HelloWorld },
  setup() {
    const slots = {
      bar: () => <span>这个会渲染到h2中</span>,
    };
    return () => (
      <>
        <HelloWorld v-slots={slots}>
          <div>这个会渲染到H1中</div>
        </HelloWorld>
      </>
    );
  },
});
```

第二种：

```tsx
// App.tsx
import { defineComponent } from 'vue';
import HelloWorld from './components/HelloWorld.tsx';
export default defineComponent({
  name: 'App',
  components: { HelloWorld },
  setup() {
    const slots = {
      default: () => <div>这个会渲染到 H1 中</div>,
      bar: () => <span>这个会渲染到 h2 中</span>,
    };
    return () => (
      <>
        <HelloWorld v-slots={slots} />
      </>
    );
  },
});
```

第三种：

```tsx
// App.tsx
// h1 当中渲染子组件默认的
// h2 当中则渲染父组件传入的 bar 组件内容
import { defineComponent } from 'vue';
import HelloWorld from './components/HelloWorld.jsx';
export default defineComponent({
  name: 'App',
  components: { HelloWorld },
  setup() {
    const slots = {
      bar: () => <span>这个会渲染到 h2 中</span>,
    };
    return () => (
      <>
        <HelloWorld v-slots={slots} />
      </>
    );
  },
});
```

11. v-pre、v-cloak、v-once、v-memo 四个指令暂时未研究出来如何在 jsx 中去实现，欢迎补充。

12. 处理事件冒泡

```
vue 文件：
<div @click.stop="handleClick"></div>

tsx 中没有事件修饰符，只能通过原生写法来处理

<div onClick={handleClick}></div>

const handleClick = (e: MouseEvent) => {
  e.stopPropagation()
}
```

13. 处理回车事件

```
    vue文件：
<input @keyup.enter="search" />

tsx文件，通过监听键盘事件来实现：
<input onKeypress={search} />

const search = (e: any) => {
  if (e.keyCode === 13) {
    //
  }
}
```

### 参考链接

1. [vue3 + tsx 的几种写法(完整版)](https://www.jianshu.com/p/d484ad785299)

2. [使用 TSX 编写 Vue3 组件](https://zhuanlan.zhihu.com/p/599459481)
