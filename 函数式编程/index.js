// 函子 举例
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

// 合成 举例
var compose = function(f, g) {
    return function(x) {
        return f(g(x));
    };
};
var toUpperCase = function(x) { return x.toUpperCase(); };
var exclaim = function(x) { return x + '!'; };
var shout = compose(exclaim, toUpperCase);
console.log(shout("send in the clowns"));

var associative = compose(f, compose(g, h)) == compose(compose(f, g), h);


// 柯里化 举例
function addXYZ(x, y, z) {
    return x + y + z;
}
console.log('addXYZ: ' + addXYZ(1, 2, 3));

function addXY(x, y) {
    return function(z) {
        return x + y + z;
    }
}
console.log('addXY: ' + addXY(1, 2)(3));

function addX(x) {
    return function(y, z) {
        return x + y + z;
    }
}
console.log('addX: ' + addX(1)(2, 3));


// 函数式编程举例
export const withDefaultProps = defaultProps => TargetComponent => props => <TargetComponent {...defaultProps} {...props}/>;

const withDefaultProps = (defaultProps, TargetComponent, props) => {
    return <TargetComponent {...defaultProps} {...props} />
}

const withDefaultProps = defaultProps => {
    return (TargetComponent, props) => {
        return <TargetComponent {...defaultProps} {...props} />
    }
}


// 柯里化(定参)
const createCurry = (fn, ...args) => {
    let length = fn.length;
    return (...rest) => {
        let allArgs = args.slice(0);
        allArgs.push(...rest);
        if (allArgs.length < length) {
            return createCurry.call(this, fn, ...allArgs);
        } else {
            return fn.apply(this, allArgs);
        }
    }
}
