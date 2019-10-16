<template>
    <div>
        <p>------------childDom-------------</p>
        <p>coo:{{ coo }}</p>
        <button @click="startUpRocket">我要发射火箭</button>
        <p>------------childDom-------------</p>
  </div>
</template>
<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    @Component({
        name: 'child-dom'
    })
    export default class ChildDom extends Vue {
        @Prop({ type: String}) private coo!: string;

        public startUpRocket() {
            window.console.log('我要发射火箭了。');
            this.$emit('upRocket');
        }
    }

</script>

<style lang="scss">

</style>