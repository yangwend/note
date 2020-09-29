<template>
  <div class="about">
    <h2>about count: {{ count }}</h2>
    <h2>about doubleCount: {{ doubleCount }}</h2>
    <h2>about halfCount: {{ halfCount }}</h2>
    <button class="btn" @click="add">add</button>
    <button class="btn" @click="minus">minus</button>
  </div>
</template>
<script>
import { computed, getCurrentInstance } from "vue";
import store from "../store";

export default {
  name: "about",
  setup() {
    const { ctx } = getCurrentInstance();
    console.log('ctx', ctx);
    console.log('ctx.$store', ctx.$store);
    console.log('ctx.$store.state', ctx.$store.state);
    console.log('ctx.$router', ctx.$router);

    const count = computed(() => store.state.count);
    // const count = computed(() => ctx.$store.state.count);
    const doubleCount = computed(() => store.getters.doubleCount);
    // const doubleCount = computed(() => ctx.$store.getters.doubleCount);
    const halfCount = computed(() => store.getters.halfCount);
    // const halfCount = computed(() => ctx.$store.getters.halfCount);

    const add = () => {
      store.commit("addCount", 1);
      // ctx.$store.commit("addCount", 1);
    };

    const minus = () => {
      store.commit("minusCount", 1);
      // ctx.$store.commit("minusCount", 1);
    };

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
.about {
  color: #000;

  .btn {
    width: 60px;
    height: 30px;
    line-height: 30px;
    color: #fff;
    font-size: 14px;
    background: #198;
    cursor: pointer;
    border: none;
    margin-right: 20px;
    outline: none;
  }
}
</style>