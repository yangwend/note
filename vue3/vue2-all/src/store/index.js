import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0
  },
  getters: {
    double(state) {
      return state.count * 2;
    },
    half(state) {
      return state.count / 2;
    }
  },
  mutations: {
    addCount(state, n) {
      state.count += n;
    },
    minusCount(state, n) {
      state.count -= n;
    }
  },
  actions: {},
  modules: {}
});
