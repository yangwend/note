### 函数式编程（Functional programming）

#### 参考链接
1. [函数式编程入门教程](http://www.ruanyifeng.com/blog/2017/02/fp-tutorial.html)
2. [JS 函数式编程指南](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/)
3. [JavaScript函数式编程（一）\（二）\（三）](https://blog.csdn.net/5hongbing/article/details/80149519)

#### 解析
1. 本质上，函数式编程只是范畴论的运算方法，跟数理逻辑、微积分、行列式是同一类东西，都是数学方法，只是碰巧它能用来写程序。
2. 在函数式编程中，函数就是一个管道（pipe）。这头进去一个值，那头就会出来一个新的值，没有其他作用。要求函数必须是纯的，不能有副作用。
3. 函数式编程有两个最基本的运算：合成和柯里化。
4. 函子是函数式编程里面最重要的数据类型，也是基本的运算单位和功能单位。
5. 任何具有map方法的数据结构，都可以当作函子的实现。函子的标志就是容器具有map方法。该方法将容器里面的每一个值，映射到另一个容器。