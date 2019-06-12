/* 命名空间 */
const demoNamespace = {
    name: 'xiao chen',
    age: 19,
    getDesc: function(address) {
        console.log(this.name + '今年' + this.age + '岁，' + '他家住在' + address + '。');
    }
}
demoNamespace.getDesc('松花江');


/* 惰性单例 */
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


/* 简化之后通用写法 */
var singleton = function(fn) {
    var instance;
    return function() {
        return instance || (instance = fn.apply(this, arguments));
    }
};
// 创建遮罩层
var createMask = function(){
    console.log('createMask');
};

// 创建登陆窗口
var createLogin = function() {
    console.log('createLogin');
};

var oMask = singleton(createMask)();
var oLogin = singleton(createLogin)();