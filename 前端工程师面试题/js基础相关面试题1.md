## js基础相关面试题

该文档包含了各种js基础相关的面试题，每个题目后面有参考链接。

### 什么是闭包？
>一个函数和对其周围状态（lexical environment，词法环境）的引用捆绑在一起（或者说函数被引用包围），这样的组合就是闭包（closure）。也就是说，闭包让你可以在一个内层函数中访问到其外层函数的作用域。

**闭包**：就是**有权访问另一个函数作用域中的变量的函数**。它包含两个部分：**函数**，**声明该函数的词法环境**。词法环境包含了这个闭包创建时其作用域内的任何局部变量。
换言之，闭包，是一个可以自己拥有独立环境和变量的表达式（通常是函数）。

举例：
```js
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12

// 释放对闭包的引用
add5 = null;
add10  = null;
```
上述例子中，makeAdder为一个函数工厂——他创建了将指定值和它的参数相加求和的函数。add5和add10都属于闭包，它们共享相同的函数定义，但是保存了不同的此法环境，一个是x为5，一个是x为10。

闭包常用**创建形式**：在一个函数内部创建另外一个函数。
闭包**注意事项**：被引用的变量会和这个函数一同存在，即使外部函数被销毁。
闭包中的**this对象**：
```js
var name = 'window';
var obj = {
  name: 'object',
  getName: function() {
    console.log('第一次打印this', this.name);
    return function() {
      console.log('第二次打印this', this.name);
      return this.name;
    }
  }
}
obj.getName()();
// 第一次打印this object
// 第二次打印this window
// 此时，匿名函数的this指向window
```

```js
var name = 'window';
var obj = {
  name: 'object',
  getName: function() {
    // 将this指向用that保存起来
    var that = this;
    console.log('第一次打印this', that.name);
    return function() {
      console.log('第二次打印this', that.name);
      return that.name;
    }
  }
}
obj.getName()();
// 第一次打印this object
// 第二次打印this object
// 此时，匿名函数的this指向object
```

```js
var name = 'window';
var obj = {
  name: 'object',
  getName: function() {
    return this.name;
  }
}
obj.getName(); // object
(obj.getName = obj.getName)(); // window
// (obj.getName = obj.getName)赋值语句返回的是等号右边的值，在全局作用域中返回，此时this指向全局
```


__作用__：
1. 可以在函数外部访问到函数内部的变量。
2. 允许将函数与其操作的数据关联起来。
3. 被引用的变量会和这个函数一同存在，即使外部函数被销毁。
4. 使用闭包模拟私有方法，限制对代码的访问，避免非核心方法弄乱代码公共接口部分。

    如下面例子，三个闭包共享一个词法环境。Counter为立即执行函数，内部的privateCounter变量和changeBy函数为私有项，函数外部无法访问，只能通过三个闭包来访问。
    ```js
    var Counter = (function() {
      var privateCounter = 0;
      function changeBy(val) {
        privateCounter += val;
      }
      return {
        increment: function() {
          changeBy(1);
        },
        decrement: function() {
          changeBy(-1);
        },
        value: function() {
          return privateCounter;
        }
      }
    })();

    console.log(Counter.value()); /* logs 0 */
    Counter.increment();
    Counter.increment();
    console.log(Counter.value()); /* logs 2 */
    Counter.decrement();
    console.log(Counter.value()); /* logs 1 */
    ```
5. 在一个闭包内对变量进行修改，不会影响另一个闭包中的变量。
    还是上述例子，改一下，即可以实现不同的闭包只会修改自己词法环境内的变量，不影响其他。
    ```js
    var makeCounter = function() {
      var privateCounter = 0;
      function changeBy(val) {
        privateCounter += val;
      }
      return {
        increment: function() {
          changeBy(1);
        },
        decrement: function() {
          changeBy(-1);
        },
        value: function() {
          return privateCounter;
        }
      }
    };

    var Counter1 = makeCounter(); // 创建一个计数器
    var Counter2 = makeCounter(); // 创建另一个计数器
    console.log(Counter1.value()); /* logs 0 */
    Counter1.increment();
    Counter1.increment();
    console.log(Counter1.value()); /* logs 2 */
    Counter1.decrement();
    console.log(Counter1.value()); /* logs 1 */
    console.log(Counter2.value()); /* logs 0 */
    ```

__缺点__：
1. 闭包只能取得包含函数中任何变量的最后一个值。
    ```js
    function arrFunc() {
      var arr = [];
      for (var i = 0; i < 10; i++) {
        arr[i] = function() {
          return [i];
        }
      }
      return arr;
    }
    arrFunc()[0](); // [10]
    arrFunc()[9](); // [10]
    // 当arrFunc执行完毕，其作用域被销毁，但是i仍然保存在内存中，最终i的值为10，因此取到的值都是10
    ```
    ```js
    function arrFunc() {
      var arr = [];
      for (var i = 0; i < 10; i++) {
        arr[i] = function(num) {
          return function() {
            return num;
          }
        }(i);
      }
      return arr;
    }
    arrFunc()[0](); // [0]
    arrFunc()[9](); // [9]
    // 在匿名函数外部再套一个匿名函数，定义一个新的变量来保存i的值，此时最终的i值每次也都不一样
    ```

2. 循环中使用闭包，可能会导致不同的闭包都共享同一个环境，可以使用`let`而不是`var`去声明变量。
    ```js
    function arrFunc() {
      const arr = [];
      for (let i = 0; i < 10; i++) {
        arr[i] = function() {
          return [i];
        }
      }
      return arr;
    }
    arrFunc()[0](); // [0]
    arrFunc()[9](); // [9]
    // 使用let去声明变量后，最终i的值每次都不一样
    ```

3. 闭包在处理速度和内存消耗方面对脚本性能有负影响。
    例如，在创建新的对象或者类时，方法通常应该关联于对象的原型，而不是定义到对象的构造器中。原因是这将导致每次构造器被调用时，方法都会被重新赋值一次（也就是说，对于每个对象的创建，方法都会被重新赋值）。
    ```js
    function MyObject(name, message) {
      this.name = name.toString();
      this.message = message.toString();
      this.getName = function() {
        return this.name;
      };

      this.getMessage = function() {
        return this.message;
      };
    }
    // 每次new MyObject()，内部的getName和getMessage都会被重新赋值
    ```
    ```js
    function MyObject(name, message) {
      this.name = name.toString();
      this.message = message.toString();
    }
    MyObject.prototype.getName = function() {
      return this.name;
    };
    MyObject.prototype.getMessage = function() {
      return this.message;
    };
    // 每次new MyObject()，getName和getMessage属于原型上的方法，不需要每次都重新定义以及赋值一次。
    ```

4. 可能会导致内存泄漏。
    当闭包的作用域链中保存着一个HTML元素，那只要闭包不销毁，该元素就无法被销毁，因此需要在对这个元素操作完成后主动销毁。
    ```js
    function test() {
      var element = document.getElementById('test');
      var id = element.id;
      element.onclick = function() {
        console.log('test节点id：', id);
      };
      element = null;
    }

    (
      function() {
        var a = 0;
        setInterval(function() {
          console.log(a++);
        }, 1000)
      }
    )();
    // 定时器内部的a也不会被销毁，因此要避免这种代码的写法产生
    ```


#### 参考链接
1. [闭包 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)

1. [什么是闭包？](https://blog.csdn.net/Matildan/article/details/108349502?ivk_sa=1024320u)



### js中有哪些数据类型？各数据类型是如何存储的？
js中数据类型一共八大类，分为基本数据类型和引用数据类型。

基本数据类型：
* Number
* String
* Boolean
* Undefined
* Null
* Symbol(es6新增)
* bigInt(es2020新增，大整数)

引用数据类型（统称为Object类型，细分如下）：
* Object
* Array
* Date
* Function
* RegExp

基本数据类型的数据直接存储在**栈**中，引用数据类型的数据存储在**堆**中。引用类型在栈中会保存其引用地址。
栈内存是自动分配内存的，而堆内存是动态分配内存的，不会自动释放。因此每次使用完对象后可以把它设置为null。

### 判断数据类型的几种方法
* typeof
缺点：typeof null === 'object'，无法区分是null还是object

* instanceof
缺点：只能判断对象是否存在于目标对象的原型链上

* constructor

* Object.prototype.toString.call()：最好的基本类型检测方式
可以区分null 、string 、boolean 、number 、undefined 、array 、function 、object 、date数据类型。
缺点：不能细分为谁谁的实例

```js
// -------------------typeof----------------------
typeof undefined // 'undefined' 
typeof '10' // 'String' 
typeof 10 // 'Number' 
typeof false // 'Boolean' 
typeof Symbol() // 'Symbol' 
typeof Function // ‘function' 
typeof null // ‘Object’ 
typeof [] // 'Object' 
typeof {} // 'Object'


// -----------------instanceof------------------------
function Foo() { }
var f1 = new Foo();
var d = new Number(1)
console.log(f1 instanceof Foo);// true
console.log(d instanceof Number); //true
console.log(123 instanceof Number); //false  --> 不能判断字面量的基本数据类型


// -------------------constructor----------------------
var d = new Number(1)
var e = 1
function fn() {
  console.log("ming");
}
var date = new Date();
var arr = [1, 2, 3];
var reg = /[hbc]at/gi;

console.log(e.constructor);//ƒ Number() { [native code] }
console.log(e.constructor.name);//Number
console.log(fn.constructor.name) // Function 
console.log(date.constructor.name)// Date 
console.log(arr.constructor.name) // Array 
console.log(reg.constructor.name) // RegExp

//----------Object.prototype.toString.call()-------------
console.log(Object.prototype.toString.call(undefined)); // "[object Undefined]" 
console.log(Object.prototype.toString.call(null)); // "[object Null]" 
console.log(Object.prototype.toString.call(123)); // "[object Number]" 
console.log(Object.prototype.toString.call("abc")); // "[object String]" 
console.log(Object.prototype.toString.call(true)); // "[object Boolean]" 

function fn() {
  console.log("ming");
}
var date = new Date();
var arr = [1, 2, 3];
var reg = /[hbc]at/gi;
console.log(Object.prototype.toString.call(fn));// "[object Function]" 
console.log(Object.prototype.toString.call(date));// "[object Date]" 
console.log(Object.prototype.toString.call(arr)); // "[object Array]"
console.log(Object.prototype.toString.call(reg));// "[object RegExp]"
```


### instanceof原理
原理：查找目标对象的原型链
```js
function myInstance(left, right) {
  // left，instanceof 左边
  // right，instanceof 右边
  var rp = right.prototype
  var lp = left.__proto__
  while (true) {
    if (lp == null) {
      return false
    }
    if (lp == rp) {
      return true
    }
    lp = lp.__proto__
  }
}
console.log(myInstance({}, Object));
```


### typeof null === 'Object'，why？
在js中，不同的对象都是使用二进制存储的，如果二进制前三位都是0的话，系统会判断为是`Object`类型，而`null`的二进制全是0，自然也就判断为Object。
这个bug是初版本的js中留下的，扩展一下其他五种标识位：
- 000 对象
- 1 整型
- 010 双精度类型
- 100 字符串
- 110 布尔类型


### 在js中为什么0.2+0.1>0.3？
在js中，浮点数使用64位固定长度来表示，1位表示符号位，11位表示指数位，剩余52位表示尾数位。
由于只能存储52位尾数位，所以会出现精度缺失。
0.1存到内存中再取出来转换成十进制就不是原来的0.1了。
```js
// 0.1 和 0.2 都转化成二进制后再进行运算
0.00011001100110011001100110011001100110011001100110011010 +
0.0011001100110011001100110011001100110011001100110011010 =
0.0100110011001100110011001100110011001100110011001100111

// 转成十进制正好是 0.30000000000000004
```

### 在js中为什么0.2+0.3=0.5？
在js中，浮点数使用64位固定长度来表示，1位表示符号位，11位表示指数位，剩余52位表示尾数位。
0.2和0.3转换为二进制，其尾数位正好是52位，相加后恰好前52位尾数位是0，截取后正好是0.5。


### 那既然0.1不是0.1了，为什么在console.log(0.1)的时候还是0.1呢?
console.log：先二进制转为十进制，十进制再转为字符串。转换过程中取了近似值，因此打印的还是0.1。


### ==与===的区别
===，严格意义上的相等，会比较两边的数据类型和值大小
+ 数据类型不同返回false
+ 数据类型相同，但值大小不同，返回false

==，非严格意义上的相等
+ 两边类型相同，比较大小
+ 两边类型不同，根据下方表格，再进一步进行比较：
    Null == Undefined --> true
    String == Number --> 先将String转为Number，再比较大小
    Boolean == Number --> 先将Boolean转为Number，再进行比较
    Object == String，Number，Symbol -> Object 转化为原始类型


### js中call、apply、bind的区别
（1）call、apply、bind，都是用来重定义this指向对象的。
```js
var name = '小王';
var age = 17;
var obj = {
  name: '小张',
  myFunc: function() {
    console.log(this.name + '年龄' + this.age);
  }
}
var db = { name: 'xx', age: 20 };
obj.myFunc.call(db); // xx年龄20
obj.myFunc.apply(db); // xx年龄20
obj.myFunc.bind(db)(); // xx年龄20
```
（2）传参不一致。
call、apply、bind，第一个参数都是this的指向对象；
call、bind传参一致，使用,分隔符；
apply传参，使用数组；
bind返回的是一个新的函数，需要再调用后执行。

```js
func.call(obj, '成都', '上海');
func.apply(obj, ['成都', '上海']);
func.bind(obj, '成都', '上海')();
```
（3）手写call、apply、bind
* call和apply实现思路主要是：
  * 判断是否是函数调用，若非函数调用抛异常；
  * 通过新对象（`context`）来调用函数：
    * 给`context`创建一个`fn`设置为需要调用的函数
    * 结束调用完之后删除`fn`

* bind实现思路：
  * 判断是否是函数调用，若非函数调用抛异常
  * 返回函数
    * 判断函数的调用方式，是否是被new出来的
      * new出来的话返回空对象，但是实例的__proto__指向_this的prototype
  * 完成函数柯里化
    * `Array.prototype.slice.call()`：截取参数
```js
Function.prototype.myCall = function(context) {
  // 先判断调用myCall是不是一个函数
  // 这里的this就是调用myCall的
  if (typeof this !== 'function') {
    throw new TypeError('Not a Function');
  }

  // 不传参数，默认是window对象
  context = context || window;
  // 保存this——调用myCall的函数
  context.fn = this;
  // 保存参数
  let args = Array.from(arguments).slice(1);
  // 调用函数
  let result = context.fn(...args);
  // 删除this
  delete context.fn;
  return result;
}
Function.prototype.myApply = function(context) {
  // 先判断调用myApply是不是一个函数
  // 这里的this就是调用myApply的
  if (typeof this !== 'function') {
    throw new TypeError('Not a Function');
  }

  // 不传参数，默认是window对象
  context = context || window;
  // 保存this——调用myCall的函数
  context.fn = this;

  // 定义result
  let result;

  // 判断是否传参--数组类型
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  // 删除this
  delete context.fn;
  return result;
}
Function.prototype.myBind = function(context) {
  // 先判断调用myBind是不是一个函数
  // 这里的this就是调用myBind的
  if (typeof this !== 'function') {
    throw new TypeError('Not a Function');
  }
  // 保存this
  const _this = this;
  // 保存参数
  const args = Array.prototype.slice.call(arguments, 1);
  // 返回一个函数
  return function F() {
    // 判断是不是new出来的
    if (this instanceof F) {
      console.log(1);
      // todo ???
      // 如果是new出来的
      // 返回一个空对象，且使创建出来的实例的__proto__指向_this的prototype，且完成函数柯里化
      return new _this(...args, ...arguments);
    } else {
      // 如果不是new出来的改变this指向，且完成函数柯里化
      console.log(2);
      return _this.apply(context, [...args, ...arguments]);
    }
  }
}
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayHi = function() {
    alert(`${this.name}你好啊`);
  }
}

var db = { name: 's', age: 11 }
var person = new Person('nn', 10);
person.sayHi.myBind(db, 'nih')(); // 打印2

var test = function() {
  console.log(this.name);
}
test.myBind(db, 'wdw')(); // 打印2
Object.toString.myBind(test, 'ede')() // 打印2
var test1 = new Function();
Object.toString.myBind(test1, 'ede')() // 打印2
```


### 字面量创建对象和new创建对象有什么区别，new内部都实现了什么，手写一个new
字面量创建对象：
+ 简单、方便阅读
+ 不需要作用域解析、速度更快

new创建对象：
+ 创建一个新对象
+ 使新对象的`__proto__`指向原函数的`prototype`
+ 改变this指向（指向新的obj）并执行该函数，执行结果保存起来作为result
+ 判断执行函数的结果是不是null或Undefined，如果是则返回之前的新对象，如果不是则返回result

手写new
```js
function myNew(fn, ...args) {
  // 创建一个空对象
  let obj = {};
  // 使空对象的隐式原型指向原函数的显式原型
  obj.__proto__ = fn.prototype;
  // this指向obj
  let result = fn.apply(obj, args);
  // 返回
  return result instanceof Object ? result : obj;
}
```


### 字面量和new出来的对象和Object.create(null)创建出来的对象有什么区别
字面量创建和new创建对象：创建出来的对象会继承Object的方法和属性，其__proto__会指向Object.prototype。

Object.create(null)创建对象：创建出来的对象的原型为null，属于原型链的顶端，没有继承Object的方法和属性。


### js变量分类
js中变量分为**全局变量**和**局部变量**。

__js变量生存期__：
生命周期从他们被声明时间开始，局部变量会在函数执行以后被删除，全局变量会在页面关闭后删除。

__显示声明__：使用var声明变量；
__隐式声明__：不用var声明变量；

在函数中，
+ 使用var声明的变量为局部变量，
+ 不用var声明的变量为全局变量

在函数外，
+ 使用var声明的变量为全局变量，
+ 不用var声明的变量为全局变量

```js
var a = 123; // 全局变量
b = 456; // 不使用var声明，全局变量
console.log(a); // 123
console.log(b); // 456
console.log(window.a); // 123
console.log(window.b); // 456

function my() {
 var aa = 123; // 使用var声明，局部变量
 bb = 456; // 不使用var声明，全局变量
 console.log(aa); // 123
 console.log(bb); // 456
 console.log(window.aa); // undefined
 console.log(window.bb); // 456
}
my();
console.log(bb); // 456
```


### 什么是作用域，什么是作用域链？
#### 作用域
规定变量和函数的可使用范围叫做作用域。
作用：隔离变量，不同作用域下同名变量不会冲突。
分类：
（1）全局作用域(window、global)
变量在函数或代码块{}以外定义的即为全局作用域。

另，函数内部未用var声明的变量，也具有全局作用域(这种情况下变量是作为window或global的属性而存在的)。

```js
var name = 'bob';
// 此处可调用name变量
function myName() {
  // 此处可调用name变量
  // 未用var声明的变量
  Rname = 'lucy';
}
myName();
console.log(Rname); // lucy
```

（2）函数（局部）作用域(function)
在函数内部定义的变量即为函数（局部）作用域。函数作用域内，对外是封闭的，即函数外部无法直接访问函数内部的变量。
```js
function myNum() {
  var a = 3;
}
myNum();
console.log(a);
```

可以通过return或闭包的方式间接访问函数内部的变量。
```js
//通过return方式访问内部变量	
function myNum() {
  var a = 3;
  return a;
}
console.log(myNum());

//通过闭包方式访问内部变量
function myNumTwo() {
  var a = 3;
  return function() {
    return a;
  };
}
console.log(myNumTwo()())
```

（3）块级作用域({})
es6中提出，在{}内部定义的变量就是块级作用域。
```js
//直接用{}
{
  let a = 5;
}
// 循环、判断等语句中
if (true) {
  let b = 10;
}
```

（4）静态作用域
函数外部定义的变量为全局作用域，函数内部用var定义的变量为局部作用域都称为静态作用域，也叫词法作用域。
__变量的作用域是在定义时决定而不是执行时决定的__。

（5）动态作用域
在执行阶段才确定变量的作用域。动态作用域需要手动借助bind、with、eval等开启，即默认情况下是动态作用域。
```js
window.a = 3;
function test() {
  console.log(this.a);
}
test.bind({a: 2})(); // 2：通过bind动态指向2
test(); // 3
```

```js
function foo(){
  console.log(a);
}
function bar(){
  var a = 3;
  foo();
}
var a = 2;
bar(); // 2：window.foo()-->打印window.a
```

#### 作用域链



### 



### 



### 



### 



### 



### 



### 



### 



### 



### 



### 



### 



### 



### 




### 




### 




### 




### 




### 




### 




### 




### 




### 




### 




### 




### 




### 




### 




### 




### 




### 




### 




