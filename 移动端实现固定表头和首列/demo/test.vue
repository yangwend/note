<template>
  <div class="pages">
    <div class="tables">
      <div class="tits">
        <div class="titsLeft">
          <p>左上角</p>
        </div>
        <div class="titsRight" ref="titsRight">
          <div>
            <p v-for="(item, i) in 150" :key="i">表头{{ i + 1 }}</p>
          </div>
        </div>
      </div>

      <div class="tbody" @scroll="scrollEvent($event)" ref="tbodyRight" @touchstart="touchstart" @touchmove="touchmove">
        <div class="tbodyLeft" ref="tbodyLeft">
          <div ref="tbodyLeftItem">
            <p v-for="(item, i) in 150" :key="i">首列{{ i + 1 }}</p>
          </div>
        </div>
        <div class="tbodyRight">
          <div v-for="(item, i) in 150" :key="i" class="row">
            <p v-for="(item1, i1) in 150" :key="i1">{{ i + 1 }}-{{ i1 + 1 }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'tables',
  data() {
    return {
      /* 移动所需参数 */
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      isMove: false,
    };
  },
  methods: {
    scrollEvent(e) {
      this.$refs.titsRight.style.left = -e.target.scrollLeft + 60 + 'px';
      this.$refs.tbodyLeftItem.style.top = -e.target.scrollTop + 'px';
    },

    /* 监听滑动开始 */
    touchstart(e) {
      /* 阻止一些默认事件 */
      // e.preventDefault();
      /* 记录初始位置 */
      this.startX = e.touches[0].pageX;
      this.startY = e.touches[0].pageY;
      console.log(this.startX, this.startY);
    },
    /* 监听滑动移动 */
    touchmove(e) {
      /* 判断是否滚动 */
      this.isMove = true;
      /* 监听滑动最终结束的位置 */
      this.endX = e.touches[0].pageX;
      this.endY = e.touches[0].pageY;

      /* 判断移动方向 */
      let X = this.endX - this.startX,
        Y = this.endY - this.startY;
      /* 判断是否移动还是点击 */
      if (this.isMove) {
        if (X > 0 && Math.abs(X) > Math.abs(Y)) {
          //向右
          console.log('向右');
          this.$refs.tbodyRight.style['overflowY'] = 'hidden';
          this.$refs.tbodyRight.style['overflowX'] = 'auto';
        } else if (X < 0 && Math.abs(X) > Math.abs(Y)) {
          //向左
          console.log('向左');
          this.$refs.tbodyRight.style['overflowY'] = 'hidden';
          this.$refs.tbodyRight.style['overflowX'] = 'auto';
        } else if (Y > 0 && Math.abs(Y) > Math.abs(X)) {
          //向下
          console.log('向下');
          this.$refs.tbodyRight.style['overflowX'] = 'hidden';
          this.$refs.tbodyRight.style['overflowY'] = 'auto';
        } else if (Y < 0 && Math.abs(Y) > Math.abs(X)) {
          //向上
          console.log('向上');
          this.$refs.tbodyRight.style['overflowX'] = 'hidden';
          this.$refs.tbodyRight.style['overflowY'] = 'auto';
        } else {
          //没有
          // console.log("没有");
        }
      } else {
        // console.log("没有");
      }
    },
  },
};
</script>
<style scoped lang="less">
::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
}
* {
  margin: 0;
  padding: 0;
}
p {
  width: 60px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  flex-shrink: 0;
}
.tables {
  width: 100%; //自定义表格整体宽度
  font-size: 12px;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  // border-right: 1px solid red;
  // border-bottom: 1px solid red;
  // border-bottom: 1px solid #ccc;
  .tbody {
    height: 400px; //自定义表格内容高度
    height: calc(100vh - 40px);
    overflow: auto;
  }
  > div {
    display: flex;
  }
  div {
    flex-shrink: 0;
  }
  .tits {
    height: 40px;
    padding-left: 60px;
    background-color: #fff;
  }
  .titsLeft,
  .tbodyLeft {
    width: 60px;
  }
  .titsRight,
  .tbodyRight {
    width: 250px; //自定义表头表体内容宽度
  }
  .titsLeft {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    p {
      width: 60px;
      background-color: #fff;
      border-bottom: 1px solid #ccc;
    }
  }
  .titsRight {
    height: 40px;
    position: absolute;
    top: 0;
    div {
      display: flex;
      right: 17px;
      p {
        background-color: #fff;
        border-bottom: 1px solid #ccc;
      }
    }
  }
  .tbodyLeft {
    // overflow: hidden;
    white-space: nowrap;
    height: 100%;
    background-color: #fff;
    div {
      margin-top: 40px;

      width: 60px;
      background-color: #fff;
      left: 0;
      top: 0px;
      position: absolute;
      overflow: hidden;
      p {
        border-bottom: 1px solid #ccc;
      }
    }
  }
  .tbodyRight {
    white-space: nowrap;
    background-color: none;
    display: flex;
    flex-direction: column;
    .row {
      display: flex;
      p {
        border-bottom: 1px solid #ccc;
      }
    }
  }
}
</style>
