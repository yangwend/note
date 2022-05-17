## react-rnd

react 实现的拖拽组件，可以实现拖拽和放大缩小功能。

### Install

- use npm
  npm i -S react-rnd
- use yarn
  yarn add react-rnd

### usage

```tsx
<Rnd
  size={{ width: this.state.width, height: this.state.height }}
  position={{ x: this.state.x, y: this.state.y }}
  onDragStop={(e, d) => {
    this.setState({ x: d.x, y: d.y });
  }}
  onResizeStop={(e, direction, ref, delta, position) => {
    this.setState({
      width: ref.style.width,
      height: ref.style.height,
      ...position,
    });
  }}>
  001
</Rnd>
```

### props

- size
- position
- maxWidth
- bounds

### api

- onDragStop
- onResizeStop
- onResizeStart
- onDragStart

### 参考链接

1. [react-rnd](https://www.npmjs.com/package/react-rnd#usage)
