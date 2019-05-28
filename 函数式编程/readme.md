## 函数式编程（Functional programming）


### 合成

### 柯里化
var add = function(x) {
    return function (y) {
        return x + y;
    }
}
var increment = add(1);
var addTen = add(10);
increment(2); // 3
addTen(2); // 12

==>

### 函子
class Functor {
    private val = '';
    constructor(val) {
        this.val = val;
    }

    map(f) {
        return new Functor(f(this.val))
    }
}


#### 参考链接
1. [函数式编程入门教程](http://www.ruanyifeng.com/blog/2017/02/fp-tutorial.html)
2. [JS 函数式编程指南](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/)
3. [JavaScript函数式编程（一）\（二）\（三）](https://blog.csdn.net/5hongbing/article/details/80149519)
4. [前端进击的巨人（五）：学会函数柯里化（curry)](https://segmentfault.com/a/1190000017981474)

#### 解析
1. 本质上，函数式编程只是范畴论的运算方法，跟数理逻辑、微积分、行列式是同一类东西，都是数学方法，只是碰巧它能用来写程序。
2. 在函数式编程中，函数就是一个管道（pipe）。这头进去一个值，那头就会出来一个新的值，没有其他作用。要求函数必须是纯的，不能有副作用。
3. 函数式编程有两个最基本的运算：合成和柯里化。
4. 函数合成即是将管道连起来，让数据一口气从多个管道中穿过。
5. 柯里化，即 “把一个多参数的函数转化为单参数函数”。
6. 柯里化：将接受多个参数的函数变换成接受其中部分参数，并且返回接受余下参数的新函数。
7. 柯里化：通过传递几个参数调用函数，可以得到一个记住了这些参数的新函数，“预加载”函数的能力。
8. 函子是函数式编程里面最重要的数据类型，也是基本的运算单位和功能单位。
9. 任何具有map方法的数据结构，都可以当作函子的实现。函子的标志就是容器具有map方法。该方法将容器里面的每一个值，映射到另一个容器。
10. 函数式编程运算不直接针对值运算，而是针对函子运算，由函子引发值变化。


11. 柯里化的特点：
    参数复用（固定易变因素）
    延迟执行
    提前返回

12. 柯里化的缺点
柯里化是牺牲了部分性能来实现的，可能带来的性能损耗：
    存取 arguments 对象要比存取命名参数要慢一些
    老版本浏览器在 arguments.lengths 的实现相当慢(新版本浏览器忽略)
    fn.apply() 和 fn.call() 要比直接调用 fn() 慢
    大量嵌套的作用域和闭包会带来开销，影响内存占用和作用域链查找速度

13. 柯里化的应用
    利用柯里化制定约束条件，管控触发机制
    处理浏览器兼容（参数复用实现一次性判断）
    函数节流防抖（延迟执行）
    ES5前bind方法的实现