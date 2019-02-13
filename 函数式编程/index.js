// 函数式编程（Functional programming）
// 函数柯里化：
function add(x, y) {
    return x + y;
}

console.log('add: ' + add(1, 2));

function addX(y) {
    return function(x) {
        return x + y;
    };
}

console.log('addX: ' + addX(2)(1));

class Functor {
    constructor(val) {
        this.val = val;
    }

    map(f) {
        return new Functor(f(this.val));
    }
}

(new Functor(2)).map(function(two) {
    console.log(two + 2);
    return two + 2;
})


var compose = function(f, g) {
    return function(x) {
        return f(g(x));
    };
};
var toUpperCase = function(x) { return x.toUpperCase(); };
var exclaim = function(x) { return x + '!'; };
var shout = compose(exclaim, toUpperCase);
console.log(shout("send in the clowns"));
