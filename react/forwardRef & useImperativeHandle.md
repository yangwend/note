## forwardRef & useImperativeHandle

`React.forwardRef` 会创建一个 `React` 组件，这个组件能够将其接受的 `ref` 属性转发到其组件树下的另一个组件中。这种技术并不常见，但在以下两种场景中特别有用：

- [转发 refs 到 DOM 组件](https://zh-hans.reactjs.org/docs/forwarding-refs.html#forwarding-refs-to-dom-components)
- [在高阶组件中转发 refs](https://zh-hans.reactjs.org/docs/forwarding-refs.html#forwarding-refs-in-higher-order-components)

`React.forwardRef` 接受渲染函数作为参数。`React` 将使用 `props` 和 `ref` 作为参数来调用此函数。此函数应返回 `React` 节点。

```tsx
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className='FancyButton'>
    {props.children}
  </button>
));

// You can now get a ref directly to the DOM button:
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```

在上述的示例中，`React` 会将 `<FancyButton ref={ref}>` 元素的 `ref` 作为第二个参数传给 `React.forwardRef` 函数中的渲染函数，该渲染函数会将 `ref` 传递给 `<button ref={ref}>` 元素。此时 `ref.current` 指向了 `button`。

然而，如果是函数式组件，因为它没有实例，就算使用了 forwardRef 包裹，父组件还是没办法通过 ref 获取到子组件的方法。

### useImperativeHandle --->父组件调子组件的属性和方法的钩子函数

#### 用法

```tsx
const SonComponent = forwardRef((props, refparams) => {
  useImperativeHandle(refparams, createHandle, [deps]);
    ...
  }
)
```

#### 参数

refparams：父组件传过来的 ref，一定要保持一致
createHandle：处理函数，它的返回值就是我们要传给父组件的方法和属性；**返回的是一个对象**
deps：依赖项

示例：

```tsx
import React, { useRef, forwardRef } from 'react';

const SonComponent = forwardRef((props, refparams) => {
  useImperativeHandle(
    refparams,
    () => {
      return {
        logSon: () => {
          console.log('测试');
        },
      };
    },
    []
  );

  return (
    <>
      <div>
        <input type='text' defaultValue={props.value} ref={refparams} />
        <button onClick={() => console.log(refparams.current)}>点击打印ref</button>
      </div>
    </>
  );
});

const FatherComponent = () => {
  const sonRef = useRef();

  useEffect(() => {
    sonRef.current.logSon(); // ----测试
  }, []);

  return (
    <>
      <SonComponent ref={sonRef} value='这是子组件的value值' />
    </>
  );
};
```

### 参考链接

1. [useImperativeHandle，结合 forwardRef 实现父组件调子组件的属性和方法](https://juejin.cn/post/7074761729753743373)

2. [React forwardRef](https://zh-hans.reactjs.org/docs/react-api.html#reactforwardref)
