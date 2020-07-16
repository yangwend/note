<template>
  <div class="about">
    <h2>about count: {{ count }}</h2>
    <h2>about doubleCount: {{ doubleCount }}</h2>
    <h2>about halfCount: {{ halfCount }}</h2>
    <button class="btn" @click="add">add</button>
    <button class="btn" @click="minus">minus</button>
    <button class="btn" @click="addCount">add 2</button>
    <button class="btn" @click="minusCount">minus 2</button>
    <button class="btn" @click="addAsync">async add 1</button>
    <button class="btn" @click="minusAsync">async minus 1</button>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "about",
  computed: {
    // count() {
    //   return this.$store.state.count;
    // },
    ...mapState(["count"]),
    // doubleCount() {
    //   return this.$store.getters.doubleCount;
    // },
    // halfCount() {
    //   return this.$store.getters.halfCount;
    // },
    ...mapGetters(["doubleCount", "halfCount"])
  },
  methods: {
    ...mapMutations(["add", "minus"]),
    addCount() {
      this.$store.commit("addCount", 2);
    },
    minusCount() {
      this.$store.commit("minusCount", 2);
    },
    ...mapActions(["addAsync"]),
    minusAsync() {
      this.$store.dispatch("minusAsync");
    }
  }
};
</script>
<style lang="scss">
.about {
  color: #000;

  .btn {
    width: 120px;
    height: 30px;
    line-height: 30px;
    color: #fff;
    font-size: 14px;
    background: #198;
    cursor: pointer;
    border: none;
    margin: 20px;
    outline: none;
  }
}
</style>
