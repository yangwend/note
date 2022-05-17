## React 鼠标选择框

```tsx
import type { FC } from 'react';
import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import styles from './style.less';

const Demo = () => {
  // state：当前自定义的券列表
  const [boxList, setBoxList] = useState([]);
  const BoxContainer = useRef(null); // Box容器
  const [showSelectBox, setShowSelectBox] = useState(false); // 是否开启框选功能
  const [startX, setStartX] = useState(0); // 鼠标按下起始位置横坐标
  const [startY, setStartY] = useState(0); // 鼠标按下起始位置纵坐标
  const [selectBoxWidth, setSelectBoxWidth] = useState(0); // 选择框宽度
  const [selectBoxHeight, setSelectBoxHeight] = useState(0); // 选择框高度
  const [selectBoxLeft, setSelectBoxLeft] = useState(0); // 选择框原点横坐标
  const [selectBoxTop, setSelectBoxTop] = useState(0); // 选择框原点纵坐标

  // 鼠标左键按下监听器
  const mouseDownListener = (e: MouseEvent) => {
    e.preventDefault();

    console.log(e.clientX, e.clientY);
    setShowSelectBox(true);

    // 记录鼠标按下时的位置
    // 容器上边(左边)到视窗上边(左边)的距离
    const { left, top } = (ReactDOM.findDOMNode(BoxContainer.current) as Element).getBoundingClientRect();
    setStartX(e.clientX - left);
    setStartY(e.clientY - top);
  };

  // 鼠标移动监听器
  const mouseMoveListener = (e: MouseEvent) => {
    e.preventDefault();

    if (!BoxContainer.current || !showSelectBox) {
      return;
    }

    // 容器上边(左边)到视窗上边(左边)的距离
    const { left, top } = (ReactDOM.findDOMNode(BoxContainer.current) as Element).getBoundingClientRect();
    // 鼠标当前的位置
    const [nowX, nowY] = [e.clientX - left, e.clientY - top];
    const retcLeft = startX - nowX > 0 ? nowX : startX;
    const retcTop = startY - nowY > 0 ? nowY : startY;
    const retcWidth = Math.abs(startX - nowX);
    const retcHeight = Math.abs(startY - nowY);

    setSelectBoxLeft(retcLeft);
    setSelectBoxTop(retcTop);
    setSelectBoxWidth(retcWidth);
    setSelectBoxHeight(retcHeight);
  };

  const commonSetSelectBox = () => {
    setSelectBoxLeft(0);
    setSelectBoxTop(0);
    setSelectBoxWidth(0);
    setSelectBoxHeight(0);
    setShowSelectBox(false);
  };

  // 鼠标左键抬起监听器
  const mouseUpListener = (e: MouseEvent) => {
    e.preventDefault();

    if (selectBoxWidth > 10 && selectBoxHeight > 10) {
      const newList = _.cloneDeep(boxList);
      newList.push({
        width: selectBoxWidth,
        height: selectBoxHeight,
        top: selectBoxTop,
        left: selectBoxLeft,
      });
      setBoxList(newList);
    }
    commonSetSelectBox();
  };

  console.log('boxList', boxList);

  return (
    <div
      className={styles.box}
      ref={BoxContainer}
      onMouseDown={(e: any) => mouseDownListener(e)}
      onMouseMove={(e: any) => mouseMoveListener(e)}
      onMouseUp={(e: any) => mouseUpListener(e)}></div>
  );
};

export default Demo;
```

可以参见链接上的源码

### 参考链接

1. [React 鼠标选择框](https://blog.csdn.net/qq_40060116/article/details/114485553)
