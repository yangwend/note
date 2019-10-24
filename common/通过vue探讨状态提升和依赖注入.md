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

### 1. Props down，events up

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

### 2. vuex 状态管理

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。即通过 vuex 可以存储所有组件的状态，并统一管理状态变化。

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

    // 触发 titleInfo 的更新
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

可以直接控制其他组件状态以及管理状态的变化，但不可直接控制其他组件插槽。如果想要控制插槽，可以通过状态来动态渲染不同的插槽内容，如第一种方案所示。<br/>

缺点：<br/>
如果是小型的项目，没必要引入 vuex 来进行状态管理，有点大材小用。

### 3. vue mixin

vue 混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。即 vue mixin 可以存储多个组件的共用状态，并提供统一的方法。因此每个组件无须内部管理。直接通过 mixin 复用即可。

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
        // 更新 组件的共用状态
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

    // 调用 mixin 中共用的方法来更新 title 和 icon 字段
    private updateInfo() {
        (this as any).updateInfo('content mixin', 'icon-diff');
    }
}
</script>
```

优点：<br/>
就像官方文档给出的描述：vue 混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。vue mixin 脚本中声明不同组件共同的state和方法，在组件中调用公用方法来改变公用state，从而达到子组件改变父组件中其他组件的状态的目的。同时也达到复用效果。<br/>

可以直接控制其他组件状态，但不可直接控制其他组件插槽。如果想要控制插槽，可以通过状态来动态渲染不同的插槽内容，如第一种方案所示。<br/>

缺点：<br/>
需要区分不同组件和不同状态，分别放入不同的mixin中，防止不同组件改用公用方法影响其他组件使用。


### 4. portal-vue

PortalVue is a set of two components that allow you to render a component's template (or a part of it) anywhere in the document - even outside the part controlled by your Vue App!

[portal-vue](https://linusborg.github.io/portal-vue/#/guide?id=what-is-portalvue) 是一个vue 插件，一个可以让你在任何地方（甚至是App.vue外部）渲染组件的集合。你可以把任何内容从某处传送到另一处，在你想让它展示的地方展示。

使用方法：<br/>
1. 安装依赖：npm install --save portal-vue / yarn add portal-vue

2. 全局注册<br/>
    import PortalVue from 'portal-vue';<br/>
    Vue.use(PortalVue);<br/>

```javascript
// basic demo
<portal to="destination">
    <p>This slot content will be rendered wherever the <portal-target> with name 'destination' is located.</p>
</portal>

// portal-target 组件在哪，portal 组件就在哪渲染。
<portal-target name="destination">
    <!-- This component can be located anwhere in your App. The slot content of the above portal component will be rendered here. -->
</portal-target>
```

具体使用方法可以参照[官方文档](https://linusborg.github.io/portal-vue/#/guide?id=what-is-portalvue)

因此，上述问题可以通过 portal-vue 组件得到完美得解决。
```javascript
// App.vue
<template>
    <div>
        <TitleBar title="some title">
            <portal-target name="titleSlot"></portal-target>
        </TitleBar>
        <Content />
    </div>
</template>
```
```javascript
// Content.vue
<template>
    <div id="content">
        // 无论什么内容，都可以在 App.vue 中渲染出来
        <portal to="titleSlot">
            ...
        </portal>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component({
    name: 'content'
})
export default class Content extends Vue {
    public created() {
        ...
    }
}
</script>
```

优点：<br/>
通过搭配使用 portal 和 portal-target 组件，可以达到在任何地方渲染你所需要渲染的内容。<br/>

可以控制组件插槽内容展示，每个组件都可以展示唯一内容。<br/>

缺点：<br/>
无法控制其他组件的状态。并且需要安装额外的依赖包才能实现。在小型项目中可无须选择该方式。<br/>

不利于代码调试，打破了 vue 渲染 dom 的机制。


### 5. 状态（组件）提升
由上述问题来看，插槽在 App.vue 中的 TitleBar 组件中展示，而受控于 Content 组件。

因此，我们可以想象，如果我们提升整个 Content 组件，此时组件内的插槽内容就可以跟着组件一起提升。如下代码所示：

```javascript
// Content.vue
<template>
    <App>
        <div class="spec-con" name="spec-titlebar">
            ...
        </div>
        <div class="other-con">
            ...
        </div>
    </App>
</template>
```
```javascript
// App.vue
<template>
    <div>
        <TitleBar>
            <slot name="spec-titlebar"></slot>
        </TitleBar>
        // 此处插槽有奇妙的效果
        <slot />
    </div>
</template>
```
上述代码渲染后，页面最终得到的效果是：
```javascript
<div>
    <TitleBar>
        <div class="spec-con">
            ...
        </div>
    </TitleBar>
    <div class="other-con">
        ...
    </div>
</div>
```

如上所示，此时 Content 组件同样达到了控制 其他组件内部插槽的作用。


优点：<br/>
通过状态（组件）提升，可以达到控制其他组件插槽的目的。<br/>

缺点：<br/>
按照以上所述， App 组件和 Content 组件需要打破原有的布局方式，这有可能导致更多的问题。<br/>


### 总结
1. 状态提升：<br/>
    即将状态从子组件移动到父组件或者祖父组件，由上层组件来控制，如方案二和方案三，通过将状态提升到全局或者共用的脚本里面，并通过统一的管理状态方式来更新状态，可以达到很好的效果。<br/>

    其中的状态不一定是变量，还可以是组件，如方案五，通过组件的提升，也能达到类似的效果。<br/>

    当然，具体情况具体分析，每种方案都有自己的适用场景。

2. 依赖注入：<br/>
    如上方案一至方案四， App 组件都是 Content 组件的父组件。而方案五反其道行之，互换了它们之间的关系，并通过配置插槽来实现控制效果，这就是依赖注入。通过适用以来注入，可以使得代码更加模块化和可配置。


### 参考链接
1. [Vue 技能进阶：使用设计模式写出优雅的前端代码](https://www.infoq.cn/article/MozzEoZDhLC*KVAyZFpl)

2. [portal-vue 使用指南](https://linusborg.github.io/portal-vue/#/guide?id=what-is-portalvue)

3. [javascript依赖注入详解](https://www.jianshu.com/p/d4e981ca074e)