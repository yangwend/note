## v-model

[Vue.js官方文档](https://cn.vuejs.org/)

### `v-model` 基础用法
`Vue.js` 中可以使用 `v-model` 指令在表单元素上创建双向数据绑定，例如：`<input>`、`<textarea>`、`<select>` 等。它会根据表单控件类型自动选取对应的方法来实现元素的值更新。

`v-model` 实际上是一个语法糖。它负责监听用户输入事件，并触发当前表单的值的更新。

`v-model` 用在 `input` 上时：
> 在给 `input` 元素上使用 `v-model` 绑定时，相当于  
（1）将其 `value` 特性绑定到名叫 `value` 的 `prop` 上；  
（2）通过 `input` 原生的 `input` 事件往外触发一个名为 `input` 的事件，并将当前表单控件的新值从 `input`事件中抛出，并赋予新值。
```vue
<input v-model="str" />

等价于

<input v-bind:value="str" v-on:input="str = $event.target.value" />

等价于

<input :value="str" @input="str = $event.target.value" />
```

`v-model` 用在 `input checkbox` 复选框上时（此处考虑单个复选框情况）：
> 在给 `input checkbox` 元素上使用 `v-model` 绑定时，相当于  
（1）将其 `checked` 特性绑定到名叫 `checked` 的 `prop` 上；  
（2）通过 `input checkbox` 原生的 `change` 事件往外触发一个名为 `change` 的事件，并将当前表单控件的新值从 `change`事件中抛出，并赋予新值。
```vue
<input type="checkbox" id="checkbox" v-model="checked" />
<label for="checkbox">{{ checked }}</label>

等价于

<input type="checkbox" v-bind:checked="checked" v-on:change="checked = $event.target.checked" />

等价于

<input type="checkbox" :value="checked" @change="checked = $event.target.checked" />

单个复选框绑定的值是 boolean 布尔值；
多个复选框绑定的值是 array 数组；
单选按钮绑定的值是字符串；
```

### 在自定义组件上使用 `v-model`
自定义组件同样支持使用 `v-model` 来达到父子组件的双向数据绑定。

使用默认的 `v-model` 进行绑定时，子组件需实现以下 2 点：
>（1）将其 `value` 特性绑定到名叫 `value` 的 `prop` 上；  
（2）在其 `input` 事件被触发时，需要将子组件当前的值通过自定义的 `input` 事件抛出
```
<my-input v-model="myInputVal" />

等价于

<my-input v-bind:value="myInputVal" v-on:input="(val) => myInputVal = val;" />

等价于

<my-input :value="myInputVal" @input="(val) => myInputVal = val;" />
```

使用自定义的 `v-model` 进行绑定时，子组件需实现以下 2 点：
>（1）将其 `show` 特性绑定到名叫 `show` 的 `prop` 上；  
（2）在其 `change` 事件被触发时，需要将子组件当前的值通过自定义的 `change` 事件抛出
```
<my-com v-model="showValue" />

等价于

<my-com v-bind:show="showValue" v-on:change="(val) => showValue = val;" />

等价于

<my-com :show="showValue" @change="(val) => showValue = val;" />
```

使用自定义的 `v-model` 进行绑定时，需要注意：  
（1）子组件中，需要显式地将父组件传过来的 `prop` 中的 `value` 赋值给当前子组件的值，作为默认值；

（2）子组件中，需要添加 `Watch` 事件，监听父组件传过来的 `value` 值的变化，并赋值给子组件，以达到父组件给子组件传值的效果。  

（3）子组件中，需要在其某个事件触发时，往外 `$emit` 触发父组件的 `input` 事件，并传参当前子组件的值，以达到父组件接收子组件的值的更新，从而达到双向数据绑定的过程。  

（4）若有页面 `A`，组件 `B`、`C`。其中 `A` 为引用了 `B` 组件的页面，`C` 为 `B` 组件中引用的子组件，`C` 为使用了 `Vue.js` 中提供的表单组件，例如 `input`，来绑定 `C` 组件中的值，即：
```
<A v-show="aVal">
    <B v-model="bVal">
        <C v-model="cVal" />
    </B>
</A>

对于整个 A 组件来说，就相当于套了三层 v-model，此时 A 页面就比较复杂，需要理清 A B C 之间的双向数据绑定的关系。
详见 移动官网 --> UI 组件 --> img-code-dialog --> captcha --> input
```

