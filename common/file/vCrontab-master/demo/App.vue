<template>
  <div id="app">
    <div class="box">
      <el-input v-model="input" placeholder class="inp"></el-input>
      <el-button type="primary" @click="showDialog">生成 cron</el-button>
    </div>
    <el-dialog title="生成 cron" :visible.sync="showCron">
      <vcrontab
        @hide="showCron=false"
        @fill="crontabFill"
        :expression="expression"
        :hideComponent="hideComponent"
      ></vcrontab>
    </el-dialog>
  </div>
</template>

<script>
import vcrontab from "../src/components/Crontab.vue";
export default {
  components: { vcrontab },
  data() {
    return {
      input: "",

      showCron: false,

      expression: "", // cron 表达式
      hideComponent: [], // 隐藏 x 组件
    };
  },
  methods: {
    crontabFill(value) {
      this.input = value;
    },
    showDialog() {
      this.expression = this.input;
      this.showCron = true;
    },
  },
};
</script>

<style>
.box {
  width: 500px;
  height: 100px;
  margin: 150px auto 0;
}
.inp {
  width: 300px !important;
  margin-right: 20px;
}
</style>
