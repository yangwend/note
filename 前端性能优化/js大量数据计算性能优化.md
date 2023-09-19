## js 大量数据计算性能优化

在 js 中，存在一个普遍的现象：部分方法在小数据量时适用，可惜，在大数据量时并不适用。我们可以看下有哪些是符合上述描述的。

### 测试相关内容

浏览器版本：Chrome 89.0+
ECMAScript： ES5+
测试结果：多次测试随机取值
数据量：10 万 或 100 万 或 1000 万

### forEach 和 for 循环

在 100 万条数据遍历的情况下，forEach 和 for 的纯遍历效率大概相差 8 ~ 10 倍；如果数据量再翻十倍，他们的效率差距可以拉开到 16 ~ 20 倍。

测试代码：

```ts
/**
 * forEach 和 for 循环的效率
 */
const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const list = Array.from(Array(100000), (v, k) => ({ num: random(0, 100) }));

console.time('forEach');
list.forEach((el) => {});
console.timeEnd('forEach');

console.time('for');
for (let i = 0, len = list.length; i < len; i++) {}
console.timeEnd('for');
```

测试结果：

10 万条数据

```
forEach: 0.733642578125 ms
for: 0.876708984375 ms
```

100 万条数据

```
forEach: 5.823974609375 ms
for: 1.673828125 ms
```

1000 万条数据

```
forEach: 60.86083984375 ms
for: 9.072998046875 ms
```

**测试结论：**
**在大量数据遍历的情况下，for 循环性能更优。**

### indexOf 的效率问题

indexOf 很常用，特别是在数据位置判断时，但是它也特别耗性能。

测试代码

```ts
/**
 * 统计 10 万个 0 ~ 100 的随机值各出现了多少次
 */
const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const list = Array.from(Array(100000), (v, k) => ({ num: random(0, 100) }));

console.time('indexOf');
let arr1 = [];
let count1 = [];
for (let i = 0, len = list.length; i < len; i++) {
  const el = list[i];
  let index = arr1.indexOf(el.num);
  if (index === -1) {
    arr1.push(el.num);
    count1.push(1);
    index = arr1.indexOf(el.num);
  }
  count1[index] = count1[index] + 1;
}
console.timeEnd('indexOf');

console.time('Map');
let arr2 = new Map();
for (let i = 0, len = list.length; i < len; i++) {
  const el = list[i];
  const num = arr2.get(el.num) ? arr2.get(el.num) : 0;
  arr2.set(el.num, num + 1);
}
console.timeEnd('Map');

console.time('object');
let arr3 = {};
for (let i = 0, len = list.length; i < len; i++) {
  const el = list[i];
  const num = arr3[el.num] ? arr3[el.num] : 0;
  arr3[el.num] = num + 1;
}
console.timeEnd('object');
```

测试结果：

10 万条数据

```
indexOf: 4.690673828125 ms
Map: 5.928955078125 ms
object: 2.35791015625 ms
```

100 万条数据

```
indexOf: 27.247802734375 ms
Map: 28.47802734375 ms
object: 10.251953125 ms
```

1000 万条数据

```
indexOf: 255.54296875 ms
Map: 269.757080078125 ms
object: 34.843017578125 ms
```

**测试结论：**
**大数据量时，indexOf/Map 的效率比较差。反之，object 的效率比 indexOf/Map 高出不少。**

### 遍历时的浅拷贝

遍历时如何进行浅拷贝呢？？

测试代码

```ts
/**
 * 遍历时浅拷贝以及属性修改
 */
const list = Array.from(Array(100000), (v, k) => ({ a: 1, b: 1, c: 1 }));

console.time('Spread');
let arr1 = [];
for (let i = 0, len = list.length; i < len; i++) {
  let obj = { ...list[i] };
  obj.a = 2;
  arr1.push(obj);
}
console.timeEnd('Spread');

console.time('assign');
let arr2 = [];
for (let i = 0, len = list.length; i < len; i++) {
  let obj = Object.assign({ a: 2 }, list[i]);
  arr2.push(obj);
}
console.timeEnd('assign');

console.time('obj');
let arr3 = [];
for (let i = 0, len = list.length; i < len; i++) {
  let obj = { a: 2, b: list[i].b, c: list[i].c };
  arr3.push(obj);
}
console.timeEnd('obj');
```

测试结果：

10 万条数据

```
Spread: 13.4169921875 ms
assign: 22.489990234375 ms
obj: 19.053955078125 ms
```

100 万条数据

```
Spread: 353.66796875 ms
assign: 262.910888671875 ms
obj: 43.31005859375 ms
```

1000 万条数据

```
Spread: 1054.855224609375 ms
assign: 985.892822265625 ms
obj: 266.62890625 ms
```

**测试结论：**
**需要进行浅拷贝修改属性时，如果代码量不大，请选择另外创建一个新对象进行属性赋值。**

### 使用 filter 和 for 进行过滤

filter 非常好用，一行代码就解决了过滤。但是在大量数据需要过滤的情况下，它的效率又如何呢？

测试代码

```ts
/**
 * 研究 filter 和 for 的效率问题
 * 统计 a，b，c三个值大于 50 出现的次数
 */
const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const list = Array.from(Array(100000), (v, k) => ({
  a: random(0, 1000),
  b: random(0, 1000),
  c: random(0, 1000),
  d: random(0, 1000),
  e: random(0, 1000),
}));

console.time('filter');
let a = 0;
a = list.filter((el) => el.a > 50).length;
console.timeEnd('filter');

console.time('for');
let a1 = 0;
for (let i = 0, len = list.length; i < len; i++) {
  list[i].a > 50 && (a1 = a1 + 1);
}
console.timeEnd('for');
```

测试结果：

10 万条数据

```
filter: 1.72607421875 ms
for: 2.039306640625 ms
```

100 万条数据

```
filter: 20.744140625 ms
for: 4.634033203125 ms
```

1000 万条数据

```
filter: 174.221923828125 ms
for: 36.68994140625 ms
```

**测试结论：**
**f 在数据量小的情况下，建议使用 filter，毕竟代码简洁可维护性更佳。在大量数据的情况下，建议使用 for。**

### 使用 filter 和 for 进行多条属性过滤

多条属性过滤时，哪种写法效率更高？

测试代码

```ts
/**
 * 研究 filter 和 for 的效率问题
 * 统计 a，b，c三个值大于 50 出现的次数
 */
const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const list = Array.from(Array(100000), (v, k) => ({
  a: random(0, 1000),
  b: random(0, 1000),
  c: random(0, 1000),
  d: random(0, 1000),
  e: random(0, 1000),
}));

let obj = { a: 0, b: 0, c: 0 };

console.time('filter');
for (let key in obj) {
  obj[key] = list.filter((el) => el[key] > 50).length;
}
console.timeEnd('filter');

console.time('for in');
for (let key in obj) {
  for (let i = 0, len = list.length; i < len; i++) {
    list[i][key] > 50 && (obj[key] = obj[key] + 1);
  }
}
console.timeEnd('for in');

console.time('for');
let a = 0;
let b = 0;
let c = 0;
for (let i = 0, len = list.length; i < len; i++) {
  list[i]['a'] > 50 && (a = a + 1);
  list[i]['b'] > 50 && (b = b + 1);
  list[i]['c'] > 50 && (c = c + 1);
}
console.timeEnd('for');
```

测试结果：

10 万条数据

```
filter: 7.93212890625 ms
for in: 11.39501953125 ms
for: 2.004150390625 ms
```

100 万条数据

```
filter: 74.809814453125 ms
for in: 57.848876953125 ms
for: 9.64697265625 ms
```

1000 万条数据

```
filter: 910.047119140625 ms
for in: 490.1669921875 ms
for: 55.869140625 ms
```

**测试结论：**
**与上一条类似，for 在大数据量时还是优胜。**

### 使用 new Set 以及 for 循环去重

使用 new Set 以及 for 循环去重时，相同代码，1 万数据和一百万数据去重的效率一致吗？

测试代码

```ts
/**
 * 研究数组去重的效率问题
 */
const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const list = Array.from(Array(100000), (v, k) => random(0, 100000));

console.time('Set');
let arr = Array.from(new Set(list));
console.timeEnd('Set');

console.time('for');
let obj = {};
let data = [];
for (let i = 0, len = list.length; i < len; i++) {
  const item = list[i];
  if (obj[item] === undefined) {
    obj[item] = item;
    data.push(item);
  }
}
console.timeEnd('for');
```

测试结果：

10 万条数据

```
Set: 5.241943359375 ms
for: 11.631103515625 ms
```

100 万条数据

```
Set: 29.671875 ms
for: 13.546875 ms
```

1000 万条数据

```
Set: 234.011962890625 ms
for: 63.556884765625 ms
```

**测试结论：**
**在数据量较小时，new Set 的效率占据绝对优势，然鹅随着数据量的增大，for 循环利用对象属性的唯一性去重方案貌似效率更稳定。其实不止是 new Set 存在这个问题，其他的 ES6+ 语法例如 Map、filter 等都存在这个问题。这不是说我们应该少用 ES6 语法，而是说我们在使用 js 进行大量数据计算操作时，应该考虑到它们的性能边界问题。在我们的常规项目中，其实很少会出现需要使用 js 进行大量的计算这种场景。**

### 使用 reduce 以及 for 循环去重

使用 reduce 以及 for 循环去重时，相同代码，1 万数据和一百万数据去重的效率一致吗？

测试代码

```ts
/**
 * 研究数组对象去重的效率问题
 * 对 数组对象属性a进行去重
 */
const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const list = Array.from(Array(100000), (v, k) => ({ a: random(0, 10000) }));

console.time('reduce');
let obj = {};
const data = list.reduce((accumulator, current) => {
  if (obj[current.a] === undefined) {
    obj[current.a] = current.a;
    accumulator.push(current);
  }
  return accumulator;
}, []);
console.timeEnd('reduce');

console.time('for');
let obj1 = {};
let data1 = [];
for (let i = 0, len = list.length; i < len; i++) {
  const item = list[i];
  if (obj1[item.a] === undefined) {
    obj1[item.a] = item.a;
    data1.push(item);
  }
}
console.timeEnd('for');
```

测试结果：

10 万条数据

```
reduce: 3.5322265625 ms
for: 5.065185546875 ms
```

100 万条数据

```
reduce: 11.43994140625 ms
for: 7.247802734375 ms
```

1000 万条数据

```
reduce: 103.6591796875 ms
for: 62.363037109375 ms
```

**测试结论：**
**结论大致和上面那一个相同，reduce 的效率也会随着数据量的增大与 for 循环的效率差距拉大。**

### 参考链接

1. [js 大量数据计算性能优化](https://blog.csdn.net/qq_36990322/article/details/118219813)
