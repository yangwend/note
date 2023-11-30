## recoil

React 状态管理库。

### 用法

#### 安装 recoil

```bash
npm install recoil
# or
yarn add recoil
```

#### RecoilRoot

如需在组件中使用 Recoil，则可以将 RecoilRoot 放置在父组件的某个位置。将他设为根组件为最佳。

```tsx
import React from 'react';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <CharacterCounter />
    </RecoilRoot>
  );
}
```

#### atom

一个 atom 代表一个状态。读取 atom 值的组件隐式订阅了该 atom，因此任何 atom 的更新都将致使使用对应 atom 的组件重新渲染。

```ts
const textState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});
```

使用

```tsx
function CharacterCounter() {
  return (
    <div>
      <TextInput />
      <CharacterCount />
    </div>
  );
}

function TextInput() {
  // 使用 useRecoilState 来控制 state
  const [text, setText] = useRecoilState(textState);

  const onChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type='text' value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );
}
```

#### selector

selector 代表一个派生状态，派生状态是状态的转换。你可以将派生状态视为将状态传递给以某种方式修改给定状态的纯函数的输出。

```ts
const charCountState = selector({
  key: 'charCountState', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const text = get(textState);

    return text.length;
  },
});
```

```tsx
function CharacterCount() {
  // 使用 useRecoilValue() 的 hook，来读取 charCountState 的值
  const count = useRecoilValue(charCountState);

  return <>Character Count: {count}</>;
}
```

#### useSetRecoilState

```tsx
import { RecoilRoot, useSetRecoilState } from 'recoil';
const setUser = useSetRecoilState(userState);
```

### 参考链接

1. [recoil 官网](https://recoiljs.org/zh-hans/)
