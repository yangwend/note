<template>
  <div class="mouse">
    <h2>鼠标 x 位置: {{ x }}</h2>
    <h2>鼠标 y 位置: {{ y }}</h2>
  </div>
</template>
<script>
import { useMousePosition } from '../hooks/mouse';

export default {
  name: "mouse",
  setup() {
    // 追踪鼠标位置
    const { x, y } = useMousePosition();
    return { x, y };
  }
};
</script>
<style lang="scss">

</style>
