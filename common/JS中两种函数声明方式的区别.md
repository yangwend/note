## JS中两种函数声明方式的区别

JS中常见的两种函数声明(statement)方式有这两种:
```javascript
// 函数表达式(function expression) 
var h = function() {
      // h
}

// 函数声明(function declaration) 
function h() {
      // h
}
```

### 区别

第一种声明方式也就是 `var声明方式`， 函数只有在var语句声明之后才能被调用。

第二种声明方式也就是 `function声明`， 函数可以在function声明之前被调用。

这是因为,

对第一种情况, 函数表达式是在函数运行阶段才赋值给变量h

对第二种情况, 函数表达式是在代码运行阶段之前, 也就是代码解析阶段才赋值给标识符h

为了证明这种说法可以看下面两个例子:

对应第一种情况,
```javascript
var h = function () {
      // h
}

console.log(h)
    
h = function () {
      // h1
}
```
console的结果是
```javascript
ƒ h() {
  // h
}
```

因为赋值发生在代码运行阶段, 代码自上而下运行console.log(h)所在位置只能获取它之前的赋值

对应第二种情况,
```javascript
function h() {
      // h
}

console.log(h)
    
function h() {
      // h1
}
```
console的结果是
```javascript
ƒ h() {
  // h1
}
```

因为赋值发生在代码解析阶段, 代码运行到console.log(h)时解析早已完成, 而解析的结果是后面那个函数h, 故会打印此结果。


### 深入

JS声明函数的三种方式:

1. 函数表达式: 即上面第一种方式, 这种方法使用function操作符创建函数, 表达式可以存储在变量或者对象属性里. 函数表达式往往被称为匿名函数, 因为它没有名字. 证明这一点你可以 console.log(h.name); 可以看到打印为空 ""。

2. 函数声明: 即上面第二种方式, 会声明一个具名函数, 且函数能在其所在作用域的任意位置被调用, 其创建的函数为具名函数, 证明这一点你可以 console.log(h.name); 可以看到打印为 "h". 可在后面的代码中将此函数通过函数名赋值给变量或者对象属性。

3. Function()构造器: 不推荐这种用法, 容易出问题


### 参考链接
1. https://www.cnblogs.com/skura23/p/7520593.html
