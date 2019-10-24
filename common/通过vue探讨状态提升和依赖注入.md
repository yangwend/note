## 通过vue探讨状态提升和依赖注入

本文针对 “vue 如何控制组件子树之外的东西？” 提供了五种解决方案，并从中得出“状态提升”和“依赖注入的”概念。

### 引导

有以下一个例子：
```javascript
// App.vue
<template>
    <div>
        <TitleBar title="some title">
            <slot>...</slot>
        </TitleBar>
        <Content />
    </div>
</template>
```

提问：<br/>
Content 组件如何控制 TitleBar 组件以及组件里面的插槽？或者说，子组件有没有办法控制父组件中其他组件的状态或者插槽？

以下是几种解决方案。

### Props down，events up

Props down，events up。即数据通过props传向子组件，子组件通过events传递数据给父组件。

```javascript
// App.vue
<template>
    <div>
        <TitleBar title="some title">
            <component :is="slotContent" />
        </TitleBar>
        <Content @slot-content="component => slotContent = component" />
    </div>
</template>
// 父组件监听子组件触发的 slot-content 事件，并将 slotContent 设置为子组件传递的内容。
```
```javascript
// Content.vue
<template>
    <div id="content">
        ...
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import SlotContent from './SlotContent';

@Component({
    name: 'content'
})
export default class Content extends Vue {
    public created() {
        // 子组件往外触发 slot-content 事件，并传递 SlotContent 给到父组件。
        this.$emit('slot-content', SlotContent);
    }
}
</script>
```
优点：<br/>
子组件加载时，就可以触发 slot-content 事件，达到控制其他组件的目的。<br/>
既可以控制其他组件状态，也可以控制其他组件插槽。<br/>

缺点：<br/>
在这个例子中，子组件通过事件传递的是一个组件，看起来比较奇怪。一般事件传递的是一个值（对象、数组等），不建议事件传递的是一个组件。<br/>

### vuex 状态管理

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

```javascript
// store
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        titleInfo: {},
    },
    getters: {
        titleInfo: (state: any) => state.titleInfo,
    },
    mutations: {
        // 更新 titleInfo
        updateTitleInfo(state, titleInfo) {
            state.titleInfo = titleInfo;
        },
    },
    actions: {
        ...
    }
});
```

```javascript
// App.vue
<template>
    <div>
        <TitleBar :title={titleInfo.title} :icon={titleInfo.icon}></TitleBar>
        <Content />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { namespace, Getter } from 'vuex-class';

@Component({
    name: 'app'
})
export default class App extends Vue {
    @Getter private titleInfo: any;

    public created() {
        ...
    }
}
</script>
```

```javascript
// Content.vue
<template>
    <div id="content">
        ...
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { namespace, Getter, Mutation } from 'vuex-class';

@Component({
    name: 'content'
})
export default class Content extends Vue {
    @Mutation private updateTitleInfo: any;

    public created() {
        ...
    }

    private updateInfo() {
        this.updateTitleInfo({
            title: 'some title',
            icon: 'icon-home'
        });
    }
}
</script>
```
优点：<br/>
就像官方文档给出的描述：Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。使用 vuex 可以将多个组件中共同的状态提升到store中，并统一管理。<br/>
既可以直接控制其他组件状态，但不可直接控制其他组件插槽，可以通过状态来动态渲染不同的插槽内容。<br/>

缺点：<br/>
如果是小型的项目，没必要引入 vuex 来进行状态管理，有点大材小用。

### vue mixin

vue 混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。

```javascript
// mixin.js
export default {
    data: () => {
        return {
            title: 'default title',
            icon: 'default-icon'
        };
    },
    methods: {
        updateInfo(title: string, icon: string) {
            const vm: any = this;
            vm.title = title;
            vm.icon = icon;
        }
    }
};
```
```javascript
// App.vue
<template>
    <div>
        <TitleBar :title={title} :icon={icon}></TitleBar>
        <Content />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import mixin from '/path/to/mixin.js';

@Component({
    name: 'app',
    mixins: [mixin]
})
export default class App extends Vue {
    public created() {
        ...
    }
}
</script>
```
```javascript
// Content.vue
<template>
    <div id="content">
        ...
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import mixin from '/path/to/mixin.js';

@Component({
    name: 'content',
    mixins: [mixin]
})
export default class Content extends Vue {
    public created() {
        ...
    }

    private updateInfo() {
        (this as any).updateInfo('content mixin', 'icon-diff');
    }
}
</script>
```

优点：<br/>
就像官方文档给出的描述：vue 混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。vue mixin 脚本中声明不同组件共同的state和方法，在组件中调用公用方法来改变公用state，从而达到子组件改变父组件中其他组件的状态的目的。<br/>
既可以直接控制其他组件状态，但不可直接控制其他组件插槽，可以通过状态来动态渲染不同的插槽内容。<br/>

缺点：<br/>
需要区分不同组件和不同状态，分别放入不同的mixin中，防止不同组件改用公用方法影响其他组件使用。


### portal-vue

[portal-vue](https://linusborg.github.io/portal-vue/#/guide?id=what-is-portalvue) 是一个可以让你在任何地方（甚至是App.vue外部）渲染组件的集合。你可以把任何内容从某处传送到另一处。

1. npm install --save portal-vue / yarn add portal-vue

2. 全局注册
    import PortalVue from 'portal-vue';<br/>
    Vue.use(PortalVue);

```javascript
// demo
<portal to="destination">
    <p>This slot content will be rendered wherever the <portal-target> with name 'destination'
        is located.
    </p>
</portal>

<portal-target name="destination">
    <!--
    This component can be located anwhere in your App.
    The slot content of the above portal component will be rendered here.
    -->
</portal-target>
```

### 参考链接
1. [Vue 技能进阶：使用设计模式写出优雅的前端代码](https://www.infoq.cn/article/MozzEoZDhLC*KVAyZFpl)

2. [portal-vue 使用指南](https://linusborg.github.io/portal-vue/#/guide?id=what-is-portalvue)