## Array.reduce 与 Promise.all 之大数据量性能优化

> 主要介绍 Array.reduce 与 Promise.all 在大数据量时带来的高性能损耗以及应对方法

### 背景

之前自己做过一个专用于 excel 导入的公用组件。在数据量比较小的时候，**针对表格内每一个单元格的校验**，速度还是很快的。然而，在数据量比较大的时候，就相当卡顿了。

测试场景：导入的 excel 表头有 4 个字段，一共有 53476 行有效数据，算下来就是 213904 个单元格，实际花了 33 秒左右的时间。

规则校验代码实现方式：
（1）使用双层 <span style="color: red">Array.reduce</span>，获取到所有的单元格数据，共 213904 个单元格，耗时 <span style="color: red">29215ms</span>
（2）每个单元格使用 Array.map 循环，获取到所有的 rules，再通过 Promise.all 请求所有的 rules 获取到所有的校验错误信息，并返回
（3）最外层再通过 <span style="color: red">Promise.all</span> 一次性请求 213904 个单元格校验，获取最终的所有的单元格的所有错误信息，耗时 <span style="color: red">4682ms</span>
（4）总计 213904 \* 3 = 641712 个请求同时发送，总耗时 <span style="color: red">33908ms</span>

由此可见，这个卡顿的耗时惊人！

### 性能优化

由于在单元格校验时，确实可能存在需要进行异步校验的情况，故我们区分 2 种情况

1. 单元格存在**异步校验**，则使用 Array. forEach+ 异步(拆组 500) + Promise.all；
2. 单元格全为**同步校验**，则使用 Array.forEach + 同步 + Array.map；

首先让我们看下优化后的效果：
| - | 同步 + Array.map | 异步(拆组 500) + Promise.all | 异步 + Promise.all |
| --- | --- | --- | --- |
| forEach | 52ms（23 + 18） | 3115ms（29 + 3074） | 5190ms（24 + <span style="color: red">5155</span>） |
| reduce | 28789ms（<span style="color: red">28764</span> + 14） | 3177ms（151 + 3015） | 33908ms（<span style="color: red">29215</span> + <span style="color: red">4682</span>） |

由上面表格可以看出，优化效果相当明显：
（1）优化前：Array.reduce + 异步 + Promise.all 耗时 33908ms
（2）优化后：**Array.forEach + 同步 + Array.map** 耗时 52ms ==》<span style="color: red">652 倍</span>
（3）优化后：**Array.forEach + 异步(拆组 500) + Promise.all** 耗时 3115ms ==》<span style="color: red">10 倍</span>

相关代码：

```ts
/**
 * 数组根据某个值进行分割为多个数组
 * @param array 数组
 * @param groupNum 分割的依据
 * @returns
 */
const getGroupedList = (array: any[], groupNum: number): any[][] => {
  if (array.length === 0 || groupNum === 0) {
    return array;
  }

  let index = 0;
  const newArray: any[] = [];

  while (index < array.length) {
    newArray.push(array.slice(index, (index += groupNum)));
  }
  return newArray;
};
```

### Array.reduce

经过阅读 Array.prototype.reduce 源码可以发现，**Array.reduce 内部核心逻辑：for 循环，在 for 循环中反复调用 callbackfn，并将每一次返回的结果，做为下一次调用 callbackfn 的参数。**

#### 源码

Javascript Array.prototype.reduce 实际调用的是 V8 的 [ArrayReduce](https://chromium.googlesource.com/v8/v8.git/+/refs/heads/9.0-lkgr/src/builtins/array-reduce.tq#161)，ArrayReduce 源码如下：

```ts
transitioning javascript builtin
ArrayReduce(
  js-implicit context: NativeContext, receiver: JSAny)(...arguments): JSAny {
  try {
    // o 相当于待遍历的数组
    const o: JSReceiver = ToObject_Inline(context, receiver);

    // 获取数组(也可能是类数组)长度，这个长度也就是循环次数
    // 从这里可以看到，循环次数在数组被遍历前确定
    // 如果在遍历过程中增加或删除数组元素，循环次数不变
    const len: Number = GetLengthProperty(o);

    // 如果调用 reduce 方法，却没有传参，报错
    if (arguments.length == 0) {
      goto NoCallableError;
    }
    // 获取 reduce 方法的第一个参数，回调函数
    const callbackfn = Cast<Callable>(arguments[0]) otherwise NoCallableError;

    // 试图获取 reduce 方法的第二个参数，可以为空
    const initialValue: JSAny|TheHole =
      arguments.length > 1 ? arguments[1] : TheHole;
    // 至此
    // o 是原数组(可能是类数组的对象)
    // len 数组长度，也是循环次数
    // callbackfn 是 reduce 方法接收的第一个参数，回调函数
    // initialValue 是 reduce 方法接收的第二个参数，初始值，可以为空
    try {
      // 主要逻辑在 FastArrayReduce
      return FastArrayReduce(o, len, callbackfn, initialValue)
      otherwise Bailout;
    } label Bailout(value: Number, accumulator: JSAny|TheHole) {
      return ArrayReduceLoopContinuation(
        o, callbackfn, accumulator, o, value, len);
    }
  } label NoCallableError deferred {
    ThrowTypeError(MessageTemplate::kCalledNonCallable, arguments[0]);
  }
}
```

ArrayReduce 的逻辑很简单，获取数组 o；循环次数 len；回调函数 callbackfn；初始值 initialValue；因为 reduce 方法的第二个参数非必传，initialValue 可以为空。然后将上面 4 个变量当做参数传给 [FastArrayReduce](https://chromium.googlesource.com/v8/v8.git/+/refs/heads/9.0-lkgr/src/builtins/array-reduce.tq#118)。FastArrayReduce 源码如下：

```ts
transitioning macro FastArrayReduce(implicit context: Context)(
    o: JSReceiver, len: Number, callbackfn: Callable,
    initialAccumulator: JSAny|TheHole): JSAny
    labels Bailout(Number, JSAny | TheHole) {
  const k = 0;
  let accumulator = initialAccumulator;
  const fastO =
      Cast<FastJSArrayForRead>(o) otherwise goto Bailout(k, accumulator);
  let fastOW = NewFastJSArrayForReadWitness(fastO);

  // 循环次数 len，在循环前就已确定！！！
  // reduce 本质还是 for 循环
  for (let k: Smi = 0; k < len; k++) {
    // 取出待遍历的数组元素
    const value: JSAny = fastOW.LoadElementNoHole(k) otherwise continue;
    typeswitch (accumulator) {
      case (TheHole): {
        accumulator = value;
      }
      case (accumulatorNotHole: JSAny): {
        // 这里的 callbackfn 是 reduce 方法接收的回调函数
        // 调用 callbackfn，最后面的 4 个参数传给 callbackfn
        accumulator = Call(
            context, callbackfn, Undefined, accumulatorNotHole, value, k,
            fastOW.Get());
      }
    }
  }
  typeswitch (accumulator) {
    case (TheHole): {
      ThrowTypeError(
          MessageTemplate::kReduceNoInitial, 'Array.prototype.reduce');
    }
    case (accumulator: JSAny): {
      // 返回结果
      return accumulator;
    }
  }
}
```

通过上述源码可以发现，Array.reduce 在实现过程中，不单使用了 for 作为核心逻辑，还定义了一系列临时变量，以及在 for 循环过程中，不断调用 callbackfn 回调函数，组装并返回最终的结果。

#### 总结

**Array.reduce 相比较于 Array.map/forEach 等函数，更多的是作为一个迭代器来使用。在大数据量面前，比 Array.map/forEach 等函数 多了很多临时变量和操作，所以性能会更差。**

### 大量使用 Promise

当在 JavaScript 中使用大量的 Promise 时，可能会遇到性能问题，主要原因包括：

1. **内存占用**：每个 Promise 实例都会占用一定的内存。如果创建大量的 Promise，可能会导致内存占用过多，CPU 占用率变高，从而影响应用程序的性能，有可能导致浏览器或 Node.js 进程的崩溃。
2. **并发限制**：浏览器和 Node.js 等 JavaScript 运行时都有并发限制。如果同时触发大量的异步操作，可能会超出并发限制，导致某些操作被排队等待执行。

为了处理这些问题，可以考虑以下几种方法：

1. **使用批处理**：将异步操作分批处理，而不是一次性触发所有 Promise。例如，你可以创建个队列，每次从队列中取出一批 Promise 进行处理，然后再处理下一批。
2. 限制并发数：使用限制并发数的方法，确保不会同时触发过多的异步操作。可以使用工具库，如 p-limit 或 p-queue，来控制并发数量。
3. 取消未完成的 Promise：如果某些 Promise 不再需要，可以考虑取消它们，以释放资源。在现代 JavaScript 中，有一些库 (如 p-cancelable) 可以帮助你实现 Promise 的取消功能。
4. 使用异步生成器：如果你需要处理大量的数据，可以使用异步生成器 (async generator) 来逐步生成 Promise。这样可以减少内存占用，因为只有当前需要的数据才会保留在内存中。
5. **使用回调函数**：在某些情况下，使用回调函数而不是 Promise 可能更合适。回调函数不会创建大量的 Promise 对象，因此可以减少内存占用。
6. **性能分析和优化**：使用性能分析工具来识别性能问题的根本原因。一些问题可能不是由于 Promise 数量引起的，而是由于 Promise 的处理方式或其他因素引起的。根据分析结果进行相应的优化。

最重要的是，要根据具体的应用场景和需求来选择合适的处理方法。不同的应用程序可能需要不同的策略来处理大量的 Promise。

### 参考链接

1. [Array.prototype.reduce 源码分析](https://zhuanlan.zhihu.com/p/374376900)
