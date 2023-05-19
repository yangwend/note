import update from 'immutability-helper';

const initialArray = [1, 2, 3]; // => [1, 2, 3]
const newArray = update(initialArray, { $push: [4] }); // => [1, 2, 3, 4]
console.log('newArray', newArray);

// ---------------------------------------------------

const initialArray1 = [2, 3, 4]; // => [2, 3, 4]
const newArray1 = update(initialArray1, { $unshift: [1] }); // => [1, 2, 3, 4]
console.log('newArray1', newArray1);

// ---------------------------------------------------

const collection = [1, 2, 12, 17, 15];
// => [1, 2, 12, 17, 15]
const newCollection = update(collection, { $splice: [[1, 1, 13, 14]] });
// => [1, 13, 14, 12, 17, 15]

const collection1 = [1, 2, { a: [12, 17, 15] }];
// => [1, 2, {a: [12, 17, 15]}]
const newCollection1 = update(collection1, { 2: { a: { $splice: [[1, 1, 13, 14]] } } });
// => [1, 2, {a: [12, 13, 14, 15]}]

console.log('newCollection', newCollection);
console.log('newCollection1', newCollection1);

// ---------------------------------------------------

const obj = { a: 5, b: 3 };
const newObj2 = update(obj, { b: { $set: obj.b * 2 } });
// => {a: 5, b: 6}

// 计算属性名称用 [] 包裹
const collection2 = { children: ['zero', 'one', 'two'] };
const index = 1;
const newCollection2 = update(collection2, { children: { [index]: { $set: 1 } } });
// => {children: ['zero', 1, 'two']}

console.log('newObj2', newObj2);
console.log('newCollection2', newCollection2);

// ---------------------------------------------------

const origin = { isCat: [true, false, false] };
// => { isCat: [true, false, false] }
const result = update(origin, { isCat: { $toggle: [1] } });
// => { isCat: [true, true, false] }
console.log('result', result);

// ---------------------------------------------------

const collection3 = [1, 2, 3, 4];
// => [1, 2, 3, 4]
const result1 = update(collection3, { $unset: [1] });
// => [1, empty, 3, 4]
console.log('result1', result1);

// ---------------------------------------------------

const obj1 = { a: 5, b: 3 };
const newObj1 = update(obj1, { $merge: { b: 6, c: 7 } }); // => {a: 5, b: 6, c: 7}
console.log('newObj1', newObj1);

// ---------------------------------------------------

const obj3 = { a: 5, b: 3 };
const newObj3 = update(obj3, {
  b: {
    $apply: function (x) {
      return x * 2;
    },
  },
});
// => {a: 5, b: 6}
console.log('newObj3', newObj3);

// ---------------------------------------------------

const map = new Map([
  [1, 2],
  [3, 4],
]);
// => Map(2) {1 => 2, 3 => 4}
const result2 = update(map, {
  $add: [
    ['foo', 'bar'],
    ['baz', 'boo'],
  ],
});
// => Map(4) {1 => 2, 3 => 4, "foo" => "bar", "baz" => "boo"}
console.log('result2', result2);

// ---------------------------------------------------

const map1 = new Map([
  [1, 2],
  [3, 4],
]);
// => Map(2) {1 => 2, 3 => 4}
const result3 = update(map1, { $remove: [1] });
// => Map(1) {3 => 4}
console.log('result3', result3);
