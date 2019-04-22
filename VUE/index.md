## VUE

官方文档: https://cn.vuejs.org/v2/guide/

### 注意
1. v-bind 在绑定属性时，需要注意：若绑定值为 null、undefined、false 则该属性不存在当前节点上。因此，在自定义组件时，使用该指令可避免传默认值问题。例如 input 的 id 属性绑定时不传则没有 id 属性。<br/>
![v-bind 绑定属性特殊](./images/v-bind绑定属性注意点.png)

2. 计算属性、方法、和侦听器的区别：<br/>
computed 计算属性 getter / setter：计算属性基于它们的响应式依赖进行缓存，再次求值时会直接返回，而不是重新计算。<br/>
methods 方法：每次重新渲染时会触发方法去计算。<br/>
watch 侦听器：当数据需要随着其它数据变动而变动时，可以使用 watch。当数据变化时触发异步操作或者开销较大时可采用 watch 来处理。

3. 当在一个自定义组件上使用 class 属性时，这些类将被添加到该组件的根元素上面。这个元素上已经存在的类不会被覆盖。<br/>
![自定义组件上使用class](./images/自定义组件上使用class.png)

4. 用 key 管理可复用的元素：<br/>
详见 [vue 用 key 管理可复用的元素](https://cn.vuejs.org/v2/guide/conditional.html#%E7%94%A8-key-%E7%AE%A1%E7%90%86%E5%8F%AF%E5%A4%8D%E7%94%A8%E7%9A%84%E5%85%83%E7%B4%A0)

5. 数组更新检测：<br/>
操作数组并更新的方式：<br/>
变异方法：<br/>
push()、pop()、shift()、unshift()、splice()、sort()、reverse()<br/>
非变异方法：<br/>
filter(), concat() 和 slice() ：这些不会改变原始数组，但总是返回一个新数组。可以用新数组替换旧数组。

6. 使用 v-for 指令渲染页面是，需要添加一个 :key，其中 key 绑定时最好使用 id，不要使用 index，防止出现 因数组在操作过程中发生顺序变化时页面无法得到重新渲染。

7. 事件修饰符：<br/>
详见 [vue 事件修饰符](https://cn.vuejs.org/v2/guide/events.html#%E4%BA%8B%E4%BB%B6%E4%BF%AE%E9%A5%B0%E7%AC%A6)

8. 
