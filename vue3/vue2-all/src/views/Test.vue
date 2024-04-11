<template>
  <div class="about">
    <h2>about count: {{ count }}</h2>
    <div v-html="html" class="myimg"></div>
  </div>
</template>
<script>
export default {
  name: "test",
  data() {
    return {
      count: 0,
      html: `<p><span>w4rwrwrew</span><img src="https://xxx.com/group1/M00/00/4F/wKgKGl7Q8bSAC1LtAAan1kt_mpw272.png" width="600" height="300"></p>`
    };
  }
};
</script>
<style lang="scss" scoped>
.about {
  color: #000;

  .myimg {
    img {
      width: 100% !important;
    }
  }
}
</style>
