## javascript 单例模式

单例模式，即单体模式，是只允许实例化一次的对象类，或者说产生一个类的唯一实例。

单例模式主要实现以下几个功能：<br/>
（1）定义一个命名空间：一般我们会用一个对象来规划一个命名空间，去管理对象上的属性和方法。而单例模式也会定义一个命名空间。

（2）管理代码库的各个模块：在写发方法库时，可以使用单例模式去规范我们方法库中的各个模块。

（3）管理静态变量：javascript 中没有 static 关键字，因此定义的变量理论上都是可以修改的。使用单例模式可以创建一个只允许访问不能赋值的静态变量。

（4）惰性单例，即延迟创建单例对象。


### 命名空间

命名空间，又称为 namespace 或者名称空间。

命名空间解决一类问题：在同一段代码中，不同的人定义变量或者方法时可能重复，通过命名空间可以约束每个人定义的变量和方法，不会重复和冲突。

例如：小陈定义一个命名空间为 chenObj，那他就可以通过 chenObj.xxx 访问里面的变量了。同理，小杨定义一个命名空间为 yangObj，那他就可以通过 yangObj.xxx 访问里面的变量了。

代码举例：<br/>
```javascript
var demoNamespace = {
    name: 'xiao chen',
    age: 19,
    getDesc: function(address) {
        console.log(this.name + '今年' + this.age + '岁，' + '他家住在' + address + '。');
    }
}
// 代码调用方式：
demoNamespace.getDesc('松花江');
```

### 管理模块

一个小型的代码库，如果只是自己使用，可以随意定义。如果后续会被其他人引用，就需要使用命名空间来规范，防止污染变量，造成重复定义等。
单例模式可以用来管理各个模块，调用方式也简单明了。

代码举例：<br/>
```javascript
var helper = {
    tool: {
        isPhone: function() {},
        isEmail: function() {},
        validateUrl: function() {}
    },
    util: {
        showDialog: function() {},
        showMask: function() {}
    },
    others: {
        // ...
    }
}
// 代码调用方式
helper.tool.isPhone();
helper.util.showDialog();
```


### 静态变量

javascript 中定义变量的方式：全局变量、局部变量。全局变量和局部变量理论上都是可以访问的。

创建一个静态变量：
（1）创建一个局部变量（放在函数内部）
（2）只提供变量访问的方法，不提供变量赋值的方法
（3）创建函数在代码编译阶段执行，即使用闭包

代码举例：<br/>
```javascript
var StaticConf = (function() {
    // 私有局部变量
    var conf = {
        MAX_NUM: 100,
        MIN_NUM: 0,
        STEP: 2
    };
    // return 一个对象
    return {
        // 提供访问变量的方法
        get: function(name) {
            return conf[name] || null;
        }
    }
})();
// 调用方式如下：
var step = StaticConf.get('STEP');
console.log(step); // 2
```

### 惰性单例

惰性单例，即在需要的时候才去创建对象类。

普通惰性单例举例代码：<br/>
```javascript
var lazySingleTon = (function() {
    // 单例实例引用
    var instance = null;
    // 单例
    function single() {
        // 私有属性和方法
        return {
            name: 'xiao chen',
            getAge: function() {}
        };
    }

    // return 单例对象的函数
    return function() {
        // 未创建单例则创建
        if (!instance) {
            instance = single();
        }
        // 否则直接 return 单例
        return instance;
    }
})();
// 调用方式如下：
var name = lazySingleTon().name;
console.log(name); // xiao chen
```

通用的惰性单例写法：
```javascript
var singleton = function(fn) {
    var result;
    return function() {
        return result || (result = fn.apply(this, arguments));
    }
}

function a() {}

function b() {}

var createA = singleton(a);
var createB = singleton(b);
```

### 总结

单例模式，实际上就是实现一个只允许实例化一次的对象类，实例化一次后，后续就直接取之前的引用。

命名空间是单例模式的一个很好地表现形式。

惰性单例模式在实际的开发中有很多用途，例如提高页面性能，避免不必要的DOM操作等。

### 参考链接

1. [javascript 设计模式 张容铭-单例模式](https://github.com/mynane/PDF)

2. [JavaScript设计模式1 单例模式](http://www.alloyteam.com/2012/10/common-javascript-design-patterns/)

3. [JavaScript 单例模式](https://segmentfault.com/a/1190000012842251)

