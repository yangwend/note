<template>
    <div>
        <p>------------fatherDom-------------</p>
        <p>attrs:{{ $attrs }}</p>
        <p>foo:{{ foo }}</p>
        <p>------------fatherDom-------------</p>
        <child-dom v-bind="$attrs" v-on="$listeners"></child-dom>
   </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
    import ChildDom from './ChildDom.vue';
    @Component({
        name: 'father-dom',
        components: {
            ChildDom
        },
        inheritAttrs: false
    })
    // inheritAttrs默认值为true，true的意思是将父组件中除了props外的属性添加到子组件的根节点上
    // (说明，即使设置为true，子组件仍然可以通过$attr获取到props意外的属性)
    // 设置为false，此时子组件的根节点就不会继承这些额外的属性
    export default class FatherDom extends Vue {
        @Prop({ type: String}) private foo!: string;
    }
</script>

<style lang="scss">
</style>