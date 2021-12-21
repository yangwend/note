## vue数据更新但页面不更新

### v-model绑定的是数组，数组里面某一项改变时，页面不更新，可以添加
```js
this.$forceUpdate();
```

### v-model 值改变了，页面没有更新。
vue2.x（Object.defineProperty()）监听不到对象中值的变化，Vue3.X已经从底层（proxy）重新设计了数据监听原理，可以监听到任意值的变化。

1. Vue 无法检测实例被创建时不存在于 data 中的 property。
```js
var vm = new Vue({
  data: {
    // 声明 a、b 为一个空值字符串
    message: '',
  },
  template: '<div>{{ message }}</div>'
})
vm.message = 'Hello!'
```
2. Vue 无法检测对象 property 的添加或移除。
```js
// 动态添加 - Vue.set
Vue.set(vm.obj, propertyName, newValue)

// 动态添加 - vm.$set
vm.$set(vm.obj, propertyName, newValue)

// 动态添加多个
// 代替 Object.assign(this.obj, { a: 1, b: 2 })
this.obj = Object.assign({}, this.obj, { a: 1, b: 2 })

// 动态移除 - Vue.delete
Vue.delete(vm.obj, propertyName)

// 动态移除 - vm.$delete
vm.$delete(vm.obj, propertyName)
```
3. Vue 不能检测通过数组索引直接修改一个数组项。
```js
// Vue.set
Vue.set(vm.items, indexOfItem, newValue)

// vm.$set
vm.$set(vm.items, indexOfItem, newValue)

// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
```

4. Object.defineProperty() 可以监测数组的变化。但对数组新增一个属性（index）不会监测到数据变化，因为无法监测到新增数组的下标（index），删除一个属性（index）也是。

5. Vue 不能监测直接修改数组长度的变化

6. 在异步更新执行之前操作 DOM 数据不会变化


解决：
（1）v-model="xxx",而不要v-model="xxx.xxx"
（2）项目升级vue3，需要考虑多方面问题
（3）v-model="xxx.xxx"，但是赋值的使用请使用`this.$set(xxx, 'attr', value);`

若上述方案执行后无法解决，请检查：
（1）**data中有无定义，如 `v-model="obj.timeStart"`，需要把属性定义出来，不然就监听不到值的变化**。
（2）生命周期从beforeCreate到mounted之间有没有执行把v-model的值置空的操作。



### 参考链接
1. [Vue 数据更新了但页面没有更新的 7 种情况汇总及延伸总结](https://segmentfault.com/a/1190000022772025)

2. [element-ui中v-model值改变了，界面显示未变，什么问题？](https://segmentfault.com/q/1010000015401984)