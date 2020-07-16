import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0
  },
  getters: {
    doubleCount(state) {
      return state.count * 2;
    },
    halfCount(state) {
      return state.count / 2;
    }
  },
  mutations: {
    add(state) {
      state.count += 1;
    },
    addCount(state, n) {
      state.count += n;
    },
    minus(state) {
      state.count -= 1;
    },
    minusCount(state, n) {
      state.count -= n;
    }
  },
  actions: {
    addAsync(context) {
      // context：与 store 实例具有相同的方法和属性
      setTimeout(() => {
        context.commit("add");
      }, 1000);
    },
    minusAsync({ commit }) {
      setTimeout(() => {
        // 参数解构
        commit("minus");
      }, 1000);
    }
  },
  modules: {}
});
