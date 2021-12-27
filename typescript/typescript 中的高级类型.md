## typescript 中的高级类型

typescript 中常用的高级类型：Pick、Omit、Partial、Required、Readonly、ReturnType、Record、Exclude、Extract、Parameters 等。

```ts
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

/**
 * Construct a type with the properties of T except for those in type K.
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

type Partial<T> = {
  [P in keyof T]?: T[P];
};

/**
 * Make all properties in T required
 */
type Required<T> = {
  [P in keyof T]-?: T[P];
};

/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

/**
 * Obtain the return type of a function type
 */
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

/**
 * Construct a type with a set of properties K of type T
 */
type Record<K extends keyof any, T> = {
  [P in K]: T;
};

/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T;

/**
 * Extract from T those types that are assignable to U
 */
type Extract<T, U> = T extends U ? T : never;

/**
 * Obtain the parameters of a function type in a tuple
 */
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
```

### Pick(部分选择)

Pick 用于拣选出我们需要关心的属性。可能需要从一个已声明的类型中抽取出一个子类型，在子类型中包含父类型中的部分或全部属性，这时我们可以使用 Pick 来实现。

ts 中可以选择一个原来的接口中一部分的属性定义：

```ts
interface User {
  id: number;
  name: string;
  age: number;
  gender: number;
  email: string;
}

type PickUser = Pick<User, 'id' | 'name' | 'gender'>;

// 等价于
type PickUser = {
  id: number;
  name: string;
  gender: number;
};

let user: PickUser = {
  id: 1,
  name: 'tom',
  gender: 1,
};
```

### Omit(属性忽略)

Omit 用于忽略掉我们不需要关心的属性。

```ts
interface User {
  id: number;
  name: string;
  age: number;
  gender: number;
  email: string;
}

// 表示忽略掉User接口中的age和email属性
type OmitUser = Omit<User, 'age' | 'email'>;
// 等价于
type OmitUser = {
  id: number;
  name: string;
  gender: number;
};

let user: OmitUser = {
  id: 1,
  name: 'tom',
  gender: 1,
};
```

### Partial(可选属性，但仍然不允许添加接口中没有的属性)

让一个定义中的所有属性都变成可选参数，参数可以变多也可以少。

```ts
interface IUser {
  name: string;
  age: number;
  department: string;
}

// 经过 Partial 类型转化后得到
type optional = Partial<IUser>;

// optional的结果如下
type optional = {
  name?: string | undefined;
  age?: number | undefined;
  department?: string | undefined;
};
```

当我们不能明确地确定对象中包含哪些属性时，我们就可以通过 Partial 来声明。

### Required(必选属性)

和 Partial 刚好相反，将一个定义中的属性全部变成必选参数。让一个类型的属性全部必填。

### Readonly(只读属性)
如果要求对象中的一些字段只能在创建的时候被赋值，使用 readonly 定义只读属性(只读的约束存在于**第一次给对象赋值**的时候，而不是第一次**给只读属性赋值**的时候)
```ts
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}
let tom: Person = {
    id: 89757,
    name: 'Tom',
    gender: 'male'
};
tom.id = 9527;      //  Cannot assign to 'id' because it is a constant or a read-only property
```

### ReturnType
`ReturnType<T>` 的作用是用于 `获取函数 T 的返回类型`。
```ts
type getuserInfo = (user: string) => UserInfo
// ReturnType<T>的作用是用于获取函数 T 的返回类型。
type ReturnTypeUserInfo = ReturnType<getuserInfo>
```

### Record
以 typeof 格式快速创建一个类型，此类型包含一组指定的属性且都是必填。
```ts
type Coord = Record<'x' | 'y', number>;

// 等同于
type Coord = {
	x: number;
	y: number;
}
```
具体的复杂业务场景中，一般会结合 Pick 、Partial 等组合使用，从而过滤和重组出新的类型定义。

### Exclude
排除一个 联合类型 中指定的子类型
```ts
type T = Exclude<'x' | 'y', 'x'> // 'y'
```
主要是基于 extends 条件类型的解析推迟的特性，返回了匹配之外的所有 候选类型，配合 never 类型 的空值特性，实现了这一高级类型。

### Extract
与 Exclude 完全相反的功能，用于提取指定的 联合类型，如果不存在提取类型，则返回never。可以用在判断一个复杂的 联合类型 中是否包含指定子类型：
```ts
type T = Extract<'x' | 'y', 'x'> // 'x'
```

### Parameters
Parameters的作用是用于获取函数 T 的参数类型
```ts
type getuserInfo = (user: string) => UserInfo
// Parameters<T>的作用是用于获取函数 T 的参数类型。
type ParametersUserInfo = Parameters<getuserInfo>
```

### 参考链接

1. [Typescript 中的高级类型](https://blog.csdn.net/weixin_43720095/article/details/107357515)

2. [TypeScript 高级类型-Partial、Required、Pick、Omit、Readonly](https://blog.csdn.net/Realizee/article/details/120570606)
