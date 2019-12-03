链接地址：https://blog.csdn.net/m0_37068028/article/details/80183781

[屏蔽ios弹性滑动](https://blog.csdn.net/jiameng15/article/details/73826220)

场景：点击页面某处时，需要弹窗，弹窗内部展示

处理方式：使用 alloytouch + fixed 定位 + 阻止body的touchmove事件 来禁止ios橡皮筋滚动效果

```javascript
<template>
    <div>...</div>
</template>
```

```javascript
<script lang="tsx">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
const AlloyTouch: any = require('alloytouch');
const Transform: any = require('css3transform').default;

@Component({
    name: 'demo-ios'
})

export default class Demo extends Vue {

    ...

    // 销毁 事件监听
    private beforeDestroy() {
        document.removeEventListener('touchmove', this.preventDefault, { passive: false } as any);
    }

    // 监听弹窗展示和隐藏
    @Watch('showDialog')
    private showDialogChange(val: any) {
        if (val) {
            // 给根目录添加 类，禁止根页面滚动
            addClass(document.getElementById('app'), 'choose-modal-show');
            this.$nextTick(() => {
                if (document.querySelector('#choose-scroll-redpack')) {
                    this.handleScroll();
                }
            });
        } else {
            document.removeEventListener('touchmove', this.preventDefault, { passive: false } as any);
            // 移除 类，允许根页面滚动
            removeClass(document.getElementById('app'), 'choose-modal-show');
        }
    }

    private preventDefault(event: any) {
        if (!event) {
            return;
        }
        event.preventDefault();
    }

    private handleScroll() {
        document.addEventListener('touchmove', this.preventDefault, { passive: false } as any);

        const scroller = (document as any).querySelector('#choose-scroll-redpack');
        Transform(scroller, true);
        const scrollHeight = (document as any).getElementById('choose-scroll-redpack').offsetHeight;
        const containerHeight = (document as any).getElementsByClassName('choose-con-container')[0].offsetHeight;

        return new AlloyTouch({
            touch: '.choose-con-container',
            target: scroller,
            property: 'translateY',
            min: -Math.abs(scrollHeight - containerHeight),
            max: 0,
            touchStart: (evt: any) => {
                evt.stopPropagation();
            },
            touchMove: (evt: any) => {
                evt.stopPropagation();
            },
            bindSelf: false
        });
    }
}
</script>
```

```css
.choose-modal-show {
    overflow: hidden;

    position: fixed;
    right: 0;
    left: 0;

    margin: 0 auto;
    width: 100%;
    height: 100%;
}
```