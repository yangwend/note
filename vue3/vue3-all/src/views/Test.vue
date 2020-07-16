<template>
  <div class="test">
    <h2>test count: {{ count }}</h2>
    <h2>test doubleCount: {{ doubleCount }}</h2>
    <h2>test halfCount: {{ halfCount }}</h2>
    <button class="btn" @click="add">add</button>
    <button class="btn" @click="minus">minus</button>
  </div>
</template>
<script>
import { ref, computed, watch, getCurrentInstance } from "vue";

export default {
  name: "test",
  // 初始化状态
  setup() {
    // 定义一个可变更的普通的状态：类似 react hooks
    const count = ref(0);

    // 定义计算属性
    const doubleCount = computed(() => count.value * 2);
    const halfCount = computed(() => count.value / 2);

    // 定义事件
    const add = () => {
      // 注意使用 count.value 而不是 count
      count.value++;
    };

    // 定义事件
    const minus = () => {
      // 注意使用 count.value 而不是 count
      count.value--;
    };

    // 监听器 watch
    watch(
      () => count.value, // 需要监听的值
      val => console.log(`count is ${val}`) // 监听器的回调函数
    );

    // getCurrentInstance：获取当前组件的实例
    // ctx：获取当前上下文
    const { ctx } = getCurrentInstance();
    console.log("test 路由实例：ctx.$router -->", ctx.$router);

    return {
      count,
      doubleCount,
      halfCount,
      add,
      minus
    };
  }
};
</script>
<style lang="scss">
.test {
  color: #f00;

  .btn {
    width: 60px;
    height: 30px;
    line-height: 30px;
    color: #fff;
    font-size: 14px;
    background: #009639;
    cursor: pointer;
    border: none;
    margin-right: 20px;
  }
}
</style>
