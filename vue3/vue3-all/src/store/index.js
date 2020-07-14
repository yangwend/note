import { createStore } from "vuex";

const store = createStore({
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

export default store;
