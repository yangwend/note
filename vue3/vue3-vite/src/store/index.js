import { createStore } from "vuex";

const store = createStore({
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

export default store;