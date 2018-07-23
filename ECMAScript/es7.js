// es7 具有2个新特性：

// 1. Array.prototype.includes

['a', 'b', 'c'].includes('a');
// true
['a', 'b', 'c'].includes('d');
// false

// Array.prototype.includes(value : any) : boolean
// 判断数组中是否包含 value 这个元素，包含则返回 true，不包含则返回 false。
// 以下两个方法几乎等效
arr.includes(x)
arr.indexOf(x) >= 0
// 区别：includes() 可以查找 NaN，而 indexOf() 不能
[NaN].includes(NaN)
// true
[NaN].indexOf(NaN)
// -1

// includes 不区分+0 和 -0
[-0].includes(+0)
// true


// 2. 求幂运算符(**)：是一个用于求幂的中缀运算符
// 与 Math.pow(x, y) 用法一致
6 ** 2
// 36