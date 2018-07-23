// es8 的几个新特性：

// 1. padStart 和 padEnd：（对字符串的开发或结尾进行填充，从而使字符串获得给定的长度。）
// str.padStart(targetLength [, padString])
// str.padEnd(targetLength [, padString])
// 第一个是最终生成的字符串总长度，第二个是需要填充的文本或者字符串，默认为空。
'es8'.padStart(2); // 'es8'
'es8'.padStart(5); // '  es8'
'es8'.padStart(6, 'woof'); // 'wooes8'
'es8'.padStart(14, 'wow'); // 'wowwowwowwoes8'
'es8'.padStart(7, '0'); // '0000es8'
'es8'.padEnd(2); // 'es8'
'es8'.padEnd(5); // 'es8  '
'es8'.padEnd(6, 'woof'); // 'es8woo'
'es8'.padEnd(14, 'wow'); // 'es8wowwowwowwo'
'es8'.padEnd(7, '6'); // 'es86666'

// 2. Object.values and Object.entries

// (1) Object.values方法返回一个指定对象可枚举属性值的数组，和它类似的语法是 for in
const obj = {
    x: 'xxx',
    y: 1
};
Object.values(obj); // ['xxx', 1]

const obj = ['e', 's', '8']; // same as { 0: 'e', 1: 's', 2: '8' };
Object.values(obj); // ['e', 's', '8']

// when we use numeric keys, the values returned in a numerical order according to the keys
const obj = {
    10: 'xxx',
    1: 'yyy',
    3: 'zzz'
}; // 按照排列顺序来输出
Object.values(obj); // ['yyy', 'zzz', 'xxx']

Object.values('es8'); // ['e', 's', '8']

// (2) Object.entries 方法返回一个给定对象可枚举属性值的数组[key, value]，它和Object.values类似
const obj = {
    x: 'xxx',
    y: 1
};
Object.entries(obj); // [['x', 'xxx'], ['y', 1]]

const obj = ['e', 's', '8'];
Object.entries(obj); // [['0', 'e'], ['1', 's'], ['2', '8']]

const obj = {
    10: 'xxx',
    1: 'yyy',
    3: 'zzz'
};
Object.entries(obj); // [['1', 'yyy'], ['3', 'zzz'], ['10', 'xxx']] // 按照排列顺序来输出
Object.entries('es8'); // [['0', 'e'], ['1', 's'], ['2', '8']]

// 3. Object.getOwnPropertyDescriptors
// getOwnPropertyDescriptors 方法返回一指定对象自己所有的属性内容，并且属性内容只是自身直接定义的，而不是从object的原型继承而来的。


// 4. 函数参数列表和调用中尾部的逗号：在函数参数尾部使用逗号时不会再触发错误警告（SyntaxError）


// 5. Async functions
// 只有在使用 async 关键字的函数中， async function 返回的 promise 和 await 关键字才能被使用。
function fetchTextByPromise() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("es8");
        }, 2000);
    });
}
async function sayHello() {
    const externalFetchedText = await fetchTextByPromise();
    console.log(`Hello, ${externalFetchedText}`); // Hello, es8
}
console.log(1);
sayHello();
console.log(2);
//  =====>   1  2  Hello, es8 

// 6. Promise.finally()
// 即无论Promise运行成功还是失败，都能运行相同的代码。
function doSomething() {
    doSomething1()
        .then(doSomething2)
        .then(doSomething3)
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            // finish here!
        });
}

// 7. Rest/Spread 属性
// ...