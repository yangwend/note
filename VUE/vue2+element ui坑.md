## vue2+element ui坑
该文档记录在开发 vue2 + element-ui 项目时遇到的需要注意的知识点。

### el-input绑定键盘事件失效
在开发过程中，我们有时候需要在element-ui组件上绑定键盘事件。
比如说在绑定enter事件时：
```html
<el-input maxlength="30" v-model="answerInput" @keyup.enter="addAnswer" placeholder="请输入问题备选答案" />
```
发现绑定是失效的，此时需要注意，要使用`@keyup.enter.native`。这是因为element-ui内部对组件做了处理，需要添加`.native`才能访问到原生事件。
```html
<el-input maxlength="30" v-model="answerInput" @keyup.enter.native="addAnswer" placeholder="请输入问题备选答案" />
```
同理，需要添加阻止事件冒泡或者阻止浏览器的默认事件，需要添加`@keyup.enter.native.stop.prevent`。


### el-input 同时绑定blur和键盘enter事件冲突
在开发过程中，我们有时候需要监听element-ui组件的blur和键盘enter事件。此时会触发两次事件。
```html
<el-input-number
  v-model="rate"
  :controls="false"
  :precision="2"
  :step="0.01"
  size="mini"
  placeholder="请输入"
  :min="0"
  @blur="tableColumnBlur"
  @keyup.enter.native="tableColumnBlur"
/>
```
调整如下：
```html
<el-input-number
  v-model="rate"
  :controls="false"
  :precision="2"
  :step="0.01"
  size="mini"
  placeholder="请输入"
  :min="0"
  @blur="tableColumnBlur"
  @keyup.enter.native="$event.target.blur"
/>
```


### vue中绑定keyup.tab.prevent无法阻止tab键浏览器默认事件
在开发过程中，我们有时候需要监听element-ui组件的键盘tab事件。
有趣的是，在有焦点的控件，按下tab键，会触发控件的失焦事件。这是属于浏览器的默认行为。
但是，我们又无法通过绑定keyup.tab.prevent来阻止浏览器的默认事件。

通过`keydown.tab.prevent`可以监听到tab的keydown事件。但是此时由于是keydown，还没到keyup，即使控件的值改了也获取不到改之后的值。



### element-ui中级联选择器(Cascader)出现空白选项的bug
在使用element-ui中Cascader组件时，传值options中如果children为[]，页面渲染会出现空白选项。
![empty](./images/empty.png)

解决方式：前端处理options，如果存在children为空数组，则置为`undefined`。



### 参考链接
1. [Element UI 的el-input同时绑定@keyup.enter.native和@blur冲突](https://blog.csdn.net/Uncle_long/article/details/103187819)

2. [vue中keyup.tab如何阻止浏览器默认事件](https://segmentfault.com/q/1010000016164319)

2. [解决element-ui中级联选择器(Cascader)出现空白选项的bug---空级联bug](https://blog.csdn.net/suprezheng/article/details/86586902)

2. []()

2. []()