<template>
    <div>
        <father-dom
            :foo="foo"
            :coo="foo"
            v-on:upRocket="reciveRocket"
        >
        </father-dom>
   </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
    import FatherDom from './FatherDom.vue';
    @Component({
        name: 'grandpa-dom',
        components: {
            FatherDom
        }
    })
    export default class GrandpaDom extends Vue {
        @Prop({ type: String}) private foo!: string;

        public reciveRocket() {
            window.console.log('火箭发射成功！');
        }
    }
</script>

<style lang="scss">
</style>