1. Vuex 通过 store 选项，提供了一种机制将状态从根组件“注入”到每一个子组件中（需调用 Vue.use(Vuex)），且子组件能通过 this.$store 访问到。
const app = new Vue({
    el: '#app',
    // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
    store,
    components: { Counter },
    template: `
        <div class="app">
        <counter></counter>
        </div>
    `
})

const Counter = {
    template: `<div>{{ count }}</div>`,
    computed: {
        count () {
            return this.$store.state.count
        }
    }
}

2. mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：
import { mapGetters } from 'vuex'

export default {
    // ...
    computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
        ...mapGetters([
            'doneTodosCount',
            'anotherGetter',
            // ...
        ])
    }
}

3. 当触发一个类型为 increment 的 mutation 时，调用此函数。”要唤醒一个 mutation handler，你需要以相应的 type 调用 store.commit 方法：
const store = new Vuex.Store({
    state: {
        count: 1
    },
    mutations: {
        increment (state) {
            // 变更状态
            state.count++
        }
    }
})

store.commit('increment')

3.1 向 store.commit 传入额外的参数，即 mutation 的 载荷（payload）：
大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读：
const store = new Vuex.Store({
    state: {
        count: 1
    },
    mutations: {
        increment (state, payload) {
            // 变更状态
            state.count += payload.amount;
        }
    }
})

store.commit('increment', {
  amount: 10
})

4. 在 Vuex 中，mutation 都是同步事务：
5. Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作。
6. Actions 支持同样的载荷方式和对象方式进行分发：
// 以载荷形式分发
store.dispatch('incrementAsync', {
    amount: 10
})

// 以对象形式分发
store.dispatch({
    type: 'incrementAsync',
    amount: 10
})