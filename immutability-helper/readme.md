## immutability-helper

在实际项目中，通常会有层次很深且复杂的数据要进行处理。一般我们会按照如下做法：

1. 直接修改数据，上一个副本会被覆盖，无法确定哪些数据被更改
   ```js
   myData.x.y.z = 7;
   myData.a.b.push(7);
   ```
2. 使用深拷贝，新建 myData 的副本，再修改需要变动的部分
   ```js
   const myNewData = cloneDeep(myData);
   myNewData.x.y.z = 7;
   myNewData.a.b.push(7);
   ```
   > 深拷贝针对于比较复杂的数据和大批量的数据，包括时间和正则和函数等都是有损害的。

因此，我们可以尝试使用 `immutability-helper`来处理数据。

### 介绍

不变，永恒。

> mutate a copy of data without changing the original source。即在不改变源数据的情况下修改数据副本。

```ts
import update from 'immutability-helper';

const newData = update(myData, {
  x: { y: { z: { $set: 7 } } },
  a: { b: { $push: [9] } },
});
```

### 用法

以 `$` 开头的称作 `commands` 。
具体使用情况，可以参考 `parcel\demo1\src\immutability.js`

1. {$push: array}：向数组末尾添加一个或多个元素

```ts
const initialArray = [1, 2, 3]; // => [1, 2, 3]
const newArray = update(initialArray, { $push: [4] }); // => [1, 2, 3, 4]
```

2. {$unshift: array}：在数组开头添加一或多个元素

```ts
const initialArray = [2, 3, 4]; // => [2, 3, 4]
const newArray = update(initialArray, { $unshift: [1] }); // => [1, 2, 3, 4]
```

3. {$splice: array of arrays}：从数组中添加/删除元素，位置摆放可以参照 splice 的用法。

```ts
const collection = [1, 2, 12, 17, 15]; // => [1, 2, 12, 17, 15]
const newCollection = update(collection, { $splice: [[1, 1, 13, 14]] });
// => [1, 13, 14, 12, 17, 15]

const collection1 = [1, 2, { a: [12, 17, 15] }];
// => [1, 2, {a: [12, 17, 15]}]
const newCollection1 = update(collection, { 2: { a: { $splice: [[1, 1, 13, 14]] } } });
// => [1, 2, {a: [12, 13, 14, 15]}]
```

4. {$set: any}：给对象某个元素赋值

```ts
const obj = { a: 5, b: 3 };
const newObj2 = update(obj, { b: { $set: obj.b * 2 } });
// => {a: 5, b: 6}

// 计算属性名称用 [] 包裹
const collection = { children: ['zero', 'one', 'two'] };
const index = 1;
const newCollection = update(collection, { children: { [index]: { $set: 1 } } });
// => {children: ['zero', 1, 'two']}
```

5. {$toggle: array of strings}：切换目标对象的布尔字段列表

```ts
const origin = { isCat: [true, false, false] };
// => { isCat: [true, false, false] }
const result = update(origin, { isCat: { $toggle: [1] } });
// => { isCat: [true, true, false] }
```

6. {$unset: array of strings}：从目标对象中删除数组中的键列表

```ts
const collection = [1, 2, 3, 4];
// => [1, 2, 3, 4]
const result = update(collection, { $unset: [1] });
// => [1, empty, 3, 4]
```

7. {$merge: object}：合并对象

```ts
const obj = { a: 5, b: 3 };
const newObj = update(obj, { $merge: { b: 6, c: 7 } }); // => {a: 5, b: 6, c: 7}
```

8. {$apply: function}：通过函数将一个值转为另外一个值

```ts
const obj = { a: 5, b: 3 };
const newObj = update(obj, {
  b: {
    $apply: function (x) {
      return x * 2;
    },
  },
});
// => {a: 5, b: 6}
```

9. {$add: array of objects}：为 Map 或者 Set 添加值

```ts
const map = new Map([
  [1, 2],
  [3, 4],
]);
// => Map(2) {1 => 2, 3 => 4}
const result = update(map, {
  $add: [
    ['foo', 'bar'],
    ['baz', 'boo'],
  ],
});
// => Map(4) {1 => 2, 3 => 4, "foo" => "bar", "baz" => "boo"}
```

10. {$remove: array of strings}：从 Map 或者 Set 移除值

```ts
const map = new Map([
  [1, 2],
  [3, 4],
]);
// => Map(2) {1 => 2, 3 => 4}
const result = update(map, { $remove: [1] });
// => Map(1) {3 => 4}
```

**如果需要设置深层嵌套的内容，可以参考如下写法：**

```ts
const initial = {};
const content = {
  foo: [
    {
      bar: ['x', 'y', 'z'],
    },
  ],
};

const result = update(initial, {
  foo: (foo) =>
    update(foo || [], {
      0: (fooZero) =>
        update(fooZero || {}, {
          bar: (bar) => update(bar || [], { $push: ['x', 'y', 'z'] }),
        }),
    }),
});

console.log(JSON.stringify(result) === JSON.stringify(content)); // true
```

**你也可以使用 extend 功能添加你自己的命令**

```ts
import update, { extend } from 'immutability-helper';

extend('$addtax', function (tax, original) {
  return original + tax * original;
});
const state = { price: 123 };
const withTax = update(state, {
  price: { $addtax: 0.8 },
});
assert(JSON.stringify(withTax) === JSON.stringify({ price: 221.4 }));
```

### 参考链接

1. [immutability-helper](https://www.jianshu.com/p/6ffb29e97bde)
2. [immutability-helper](https://github.com/kolodny/immutability-helper)
