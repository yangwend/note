console.log('------------------------------------');
function print() {
    var marty = {
        name: 'marty',
        printName: function() {
            console.log(this.name);
        }
    };

    var test1 = { name: 'test1' };
    var test2 = { name: 'test2' };
    var test3 = { name: 'test3' };

    test3.printName = marty.printName;

    var printName2 = marty.printName.bind({ name: 123 });

    marty.printName.call(test1);
    marty.printName.apply(test2);
    marty.printName();
    printName2();
    test3.printName();
}

print();
// test1 test2 marty 123 test3

console.log('------------------------------------');






// 两个数组合并，再倒叙排列，再输出字符串
function handleArray(arr1, arr2) {
    var arr3 = arr1.concat(arr2);
    arr3.sort(function(a, b) {
        return b - a;
    });

    return arr3.join(',');
}

console.log(handleArray(['001', '002', '003'], ['005', '006', '007']));

console.log('------------------------------------');





function SuperType(){
    this.property = true;
}
SuperType.prototype.getSuperValue = function(){
    return this.property;
};

function SubType(){
    this.subproperty = false;
}
// 继承自SuperType
SubType.prototype = new SuperType();

SubType.prototype.getSubValue = function (){
    return this.subproperty;
};

var example = new SubType();
console.log(example.property);
console.log(example.subproperty);
console.log(example.getSuperValue());//true
console.log(example.getSubValue());//false

console.log('------------------------------------');




function SuperType1(){
    this.colors = ["red", "blue", "green"];
}
function SubType1(){}//即使没有写，也不会影响结果

SubType1.prototype = new SuperType1();

var example1 = new SubType1();
example1.colors.push("black");
console.log(example1.colors); //"red,blue,green,black"

var example2 = new SuperType1();
console.log(example2.colors);

var example3 = new SubType1();
console.log(example3.colors);

console.log('------------------------------------');






function Parent() {
    this.name = 'xxx';
}
Parent.prototype.sayName = function() {
    console.log(this.name);
}


function Child() {  }
Child.prototype = new Parent();

var child= new Child();
child.sayName();

console.log('------------------------------------');





function deepClone(origin, target) {
    var target = target || {};
    var toStr = Object.prototype.toString;
    var arrStr = '[object Array]';

    for (var prop in origin) {
        if (origin.hasOwnProperty(prop)) {
            if (origin[prop] != null && typeof(origin[prop]) == 'object') {
                target[prop] = toStr.call(origin[prop]) === arrStr ? [] : {};
                deepClone(origin[prop], target[prop]);
            } else {
                target[prop] = origin[prop];
            }
        }
    }
}

var funObj1 = {
    name: 'xxxx',
    age: 10,
    arr: [1, 2, 3, 4]
};
var funObj2 = {};
deepClone(funObj1, funObj2);
console.log(funObj2);

console.log('------------------------------------');









console.log('------------------------------------');




