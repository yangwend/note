## zustand

一个轻量、现代的状态管理库。使用 hooks 来管理状态。

优点：

1. 更少的样板代码
2. 只在 state 的值改变时渲染组件, 通常可以处理状态的改变而无需渲染代码
3. 状态管理通过简单定义的操作进行集中和更新, 在这方面和 Redux 类似, 但是又和 Redux 不太类似, Redux 开发必须创建 reducer、action、dispatch 来处理状态, Zustand 让它变得更加容易
4. 使用 hooks 来管理 states
5. 使用简单使用和简单实现的代码
6. 通过消除使用 Context Provides 从而使代码更短、更易读

### 用法

#### 安装 zustand

```bash
npm install zustand
# or
yarn add zustand
```

#### 定义一个 store

```ts
// app.ts
import create from 'zustand';
import { IUser } from '@/types';

interface IAppStore extends IUser {
  setUser: (params: IUser) => void;
}
export const useAppStore = create<IAppStore>((set, get) => ({
  staffCode: '',
  staffName: '',
  positionCode: '',
  positionName: '',
  orgCode: '',
  orgName: '',
  storeCode: '',
  storeName: '',
  setUser: (params) => {
    // get 用于 访问存储状态
    const staffCode = get().staffCode;
    // set 用于 修改状态
    set((state) => ({
      ...state,
      ...params,
    }));
  },
  // 处理异步数据
  fetch: async (voting) => {
    const response = await fetch(voting);
    set((state) => ({ ...state, Votes: await response.json() }));
  },
}));
```

#### 访问 store

```tsx
import { useAppStore } from '@/stores';
const setUser = useAppStore((state) => state.setUser);
const [userCode, storeCode] = useAppStore((s) => [s.staffCode, s.storeCode]);
```

#### 持久化状态

使用 Zustand 提供的名为 persist 的中间件, 该中间件通过 localStorage 来持久化来自应用程序的数据。

```tsx
import { persist } from 'zustand/middleware';
// and modify our existing state

let store = (set) => ({
  fruits: ['apple', 'banana', 'orange'],
  addFruits: (fruit) => {
    set((state) => ({
      fruits: [...state.fruits, fruit],
    }));
  },
});
// persist the created state
store = persist(store, { name: 'basket' });
// create the store
const useStore = create(store);
```

#### Zustand 提供了一个中间件来使用 Redux 开发工具扩展从浏览器查看状态值

```tsx
import { devtools } from 'zustand/middleware';
store = devtools(store);
```

### 参考链接

1. [zustand 介绍](https://github.com/pmndrs/zustand)
2. [Zustand: 一个轻量、现代的状态管理库](https://www.jianshu.com/p/516c85c50da8)
