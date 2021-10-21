## vue3

2020-09-19，vue3更新了正式版本

### vue生命周期
![vue 生命周期](./images/lifecycle.svg)


### **动态参数**
可以在指令参数中使用js表达式，格式：用方括号括起来。
```html
<!--
注意，参数表达式的写法存在一些约束，如之后的“对动态参数表达式的约束”章节所述。
-->
<a v-bind:[attributeName]="url"> ... </a>
<a v-on:[eventName]="doSomething"> ... </a>
```
`attributeName`/`eventName`会被作为一个js表达式进行动态求值，求得的值会作为最终的参数来使用。
eg:
attributeName = 'href' ==> v-bind:href="url"
eventName = 'focus' ==> v-on:focus="doSomething"

__缩写形式__：
`<a :[key]="url"> ... </a>`
`<a @[event]="doSomething"> ... </a>`

**注意：对动态参数值约定**
动态参数预期会求出一个字符串，异常情况下值为`null`。这个特殊的`null`值可以被显性地用于移除绑定。任何其它非字符串类型的值都将会触发一个警告。

**注意：对动态参数表达式约定**
动态参数表达式有一些语法约束，因为某些字符，如空格和引号，放在HTML attribute名里是无效的。例如：

```html
<!-- 这会触发一个编译警告 -->
<a v-bind:['foo' + bar]="value"> ... </a>
```
可以使用`没有空格或引号的表达式`or`computed`属性来代替。

在使用模板语法时，需要避免使用大写字符来命名键名，因为浏览器会把属性名全部强制转为小写。
```html
<!--
在 DOM 中使用模板时这段代码会被转换为 `v-bind:[someattr]`。
除非在实例中有一个名为“someattr”的 property，否则代码不会工作。
-->
<a v-bind:[someAttr]="value"> ... </a>
```


### 防抖和节流
>Vue没有内置支持防抖和节流，但可以使用[Lodash](https://lodash.com/)等库来实现。


### 解析 DOM 模板时的注意事项

1. 有些 HTML 元素，诸如`<ul>`、`<ol>`、`<table>`和`<select>`，对于哪些元素可以出现在其内部是有严格限制的。而有些元素，诸如`<li>`、`<tr>`和`<option>`，只能出现在其它某些特定的元素内部。
这会导致我们使用这些有约束条件的元素时遇到一些问题。
```html
<table>
  <!--自定义组件 <blog-post-row> 会被作为无效的内容提升到外部，并导致最终渲染结果出错。-->
  <blog-post-row></blog-post-row>
</table>
```
可以按照如下方式解决：
```html
<table>
  <!--当用于原生 HTML 元素时，is 的值必须以 vue: 开头，才可以被解释为 Vue 组件。这是避免和原生自定义元素混淆。-->
  <tr is="vue:blog-post-row"></tr>
</table>
```


2. HTML attribute 名不区分大小写，因此浏览器将所有大写字符解释为小写。这意味着当你在 DOM 模板中使用时，`驼峰 prop 名称`和 `event 处理器参数`需要使用它们的 kebab-cased (横线字符分隔) 等效值：
```js
// 在JavaScript中使用驼峰
app.component('blog-post', {
  props: ['postTitle'],
  emits: ['myEvent']
  template: `
    <h3 @click="$emit('myEvent')">{{ postTitle }}</h3>
  `
})
```
```html
<!--在HTML则是使用横线字符分割-->
<blog-post post-title="hello!" @my-event="doSomething"></blog-post>
```



### props
props是用来父组件与子组件之间进行通信的。props属于**单向下行绑定**：父级prop的更新会向下流动到子组件中，但是反过来则不行。对于子组件来说，props是只读不可更改的。

#### prop 传值
1. prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 prop 数据来使用。
```js
export default {
  props: ['initialCounter'],
  data() {
    return {
      // 定义一个本地的 data property 并将这个 prop 作为其初始值
      counter: this.initialCounter
    }
  }
}
```
2. 这个 prop 以一种原始的值传入且需要进行转换。
```js
export default {
  props: ['size'],
  computed: {
    normalizedSize() {
      // 用这个 prop 的值来定义一个计算属性
      return this.size.trim().toLowerCase()
    }
  }
}
```
>在 JavaScript 中对象和数组是通过引用传入的，所以对于一个数组或对象类型的 prop 来说，在**子组件中改变变更这个对象或数组本身将会影响到父组件的状态**。

#### prop验证
可以为组件的prop指定**验证要求**，当要求没有被满足，Vue会在浏览器控制台作出警告。

可以为props中的值提供一个**带有验证需求的对象**，而不是一个字符串数组：
```js
app.component('my-component', {
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default() {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator(value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].includes(value)
      }
    },
    // 具有默认值的函数
    propG: {
      type: Function,
      // 与对象或数组默认值不同，这不是一个工厂函数 —— 这是一个用作默认值的函数
      default() {
        return 'Default function'
      }
    }
  }
})
```
其中的`type`可以是下列原生构造函数中的一个：
* String
* Number
* Boolean
* Array
* Object
* Date
* Function
* Symbol
`type`还可以是自定义的构造函数，并且通过 `instanceof`来进行检查确认：
```js
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

app.component('my-comp', {
  props: {
    // 验证 author prop 的值是否是通过 new Person 创建的。
    author: Person
  }
});
```

#### prop验证抛出的事件
与prop值验证类似，可以为`$emit`触发的事件分配一个函数，该函数接收传递给`$emit`调用的参数，并返回一个布尔值来指示事件是否有效。

```js
app.component('custom-form', {
  emits: {
    // 没有验证
    click: null,

    // 验证 submit 事件
    submit: ({ email, password }) => {
      if (email && password) {
        return true
      } else {
        console.warn('Invalid submit event payload!')
        return false
      }
    }
  },
  methods: {
    submitForm(email, password) {
      this.$emit('submit', { email, password })
    }
  }
})
```

### `v-model` 参数
默认情况下，组件上的 `v-model` 使用 `modelValue` 作为 `prop` 和 `update:modelValue` 作为事件。我们可以通过向 `v-model` **传递参数**来修改这些名称：

```html
<!--此例子，传递参数 title-->
<my-component v-model:title="bookTitle"></my-component>
```

```js
app.component('my-component', {
  props: {
    title: String
  },
  emits: ['update:title'],
  template: `
    <input
      type="text"
      :value="title"
      @input="$emit('update:title', $event.target.value)">
  `
})
```

#### 多个 `v-model` 绑定
可以在单个组件实例上创建多个 `v-model` 绑定。每个 `v-model` 将同步到不同的 `prop`，而不需要在组件中添加额外的选项：

```html
<!--此处，v-model绑定了两个参数 firstName lastName-->
<user-name
  v-model:first-name="firstName"
  v-model:last-name="lastName"
></user-name>
```

```js
// firstName --> update:firstName
// lastName --> update:lastName
app.component('user-name', {
  props: {
    firstName: String,
    lastName: String
  },
  emits: ['update:firstName', 'update:lastName'],
  template: `
    <input 
      type="text"
      :value="firstName"
      @input="$emit('update:firstName', $event.target.value)">

    <input
      type="text"
      :value="lastName"
      @input="$emit('update:lastName', $event.target.value)">
  `
})
```


#### 处理`v-model`修饰符
组件可以**支持自定义修饰符**。添加到组件 `v-model` 的修饰符将通过 `modelModifiers` prop 提供给组件。

创建一个示例：自定义修饰符 `capitalize`，它将 `v-model` 绑定提供的字符串的第一个字母大写。
添加到组件 `v-model` 的修饰符将通过 `modelModifiers` prop 提供给组件。在下面的示例中，我们创建了一个组件，其中包含默认为空对象的 `modelModifiers` prop。
当组件的 `created` 生命周期钩子触发时，`modelModifiers` prop 会包含 `capitalize`，且其值为 `true`——因为 `capitalize` 被设置在了写为 `v-model.capitalize="myText"` 的 v-model 绑定上。

```html
<div id="app">
  <my-component v-model.capitalize="myText"></my-component>
  {{ myText }}
</div>
```

```js
const app = Vue.createApp({
  data() {
    return {
      myText: ''
    }
  }
})

app.component('my-component', {
  props: {
    modelValue: String,
    modelModifiers: {
      default: () => ({})
    }
  },
  emits: ['update:modelValue'],
  created() {
    // { capitalize: true }
    console.log(this.modelModifiers);
  },
  methods: {
    emitValue(e) {
      let value = e.target.value
      // 从modelModifiers对象里面取值，在created实例化时已经可以拿到值了。此处做判断进行修饰符的修饰处理
      if (this.modelModifiers.capitalize) {
        value = value.charAt(0).toUpperCase() + value.slice(1)
      }
      this.$emit('update:modelValue', value)
    }
  },
  template: `<input
    type="text"
    :value="modelValue"
    @input="emitValue">`
})

app.mount('#app')
```

对于带参数的 `v-model` 绑定，生成的 prop 名称将为 `arg` + `"Modifiers"`：

```html
<!--此处参数为description，修饰符为capitalize，因此生成的prop对象为descriptionModifiers-->
<my-component v-model:description.capitalize="myText"></my-component>
```

```js
app.component('my-component', {
  props: ['description', 'descriptionModifiers'],
  emits: ['update:description'],
  template: `
    <input type="text"
      :value="description"
      @input="$emit('update:description', $event.target.value)">
  `,
  created() {
    console.log(this.descriptionModifiers) // { capitalize: true }
  }
})
```








### 异步组件
在大型应用中，我们可能需要将应用分割成小一些的代码块，并且只在需要的时候才从服务器加载一个模块。即**懒加载**。

Vue 有一个 `defineAsyncComponent` 方法：

```js
const { createApp, defineAsyncComponent } = Vue;
import Test from './components/Test.vue'

const app = createApp({})

const AsyncComp = (comp) => defineAsyncComponent(
  () =>
    new Promise((resolve, reject) => {
      resolve(comp);
    })
);

app.component('Test', AsyncComp(Test));
```

此方法接受返回 `Promise` 的工厂函数。从服务器检索组件定义后，应调用 Promise 的 `resolve` 回调。你也可以调用 `reject(reason)`，来表示加载失败。

也可以按照如下方式来处理：

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./components/AsyncComponent.vue')
)

app.component('async-component', AsyncComp)
```

当在局部注册组件时，你也可以使用 `defineAsyncComponent`：

```js
import { createApp, defineAsyncComponent } from 'vue'

createApp({
  // ...
  components: {
    AsyncComponent: defineAsyncComponent(() =>
      import('./components/AsyncComponent.vue')
    )
  }
})
```



### 参考链接
1. [Vue3.x知识图谱](https://gitee.com/jishupang/vue3-knowledge-map)

2. [vue3官方中文文档](https://v3.cn.vuejs.org/guide/introduction.html)

3. [vue-cli](https://cli.vuejs.org/zh/)

4. [Vue 3 Babel JSX 插件](https://github.com/vuejs/jsx-next/blob/dev/packages/babel-plugin-jsx/README-zh_CN.md)

5. [vite](https://cn.vitejs.dev/)

6. [Web Components](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components)