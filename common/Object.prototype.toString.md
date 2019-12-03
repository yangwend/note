## Object.prototype.toString

```javascript
// "Arguments", "Array", "Boolean", "Date", "Error", "Function", "JSON", "Math", "Number", "Object", "RegExp", "String" 
Object.prototype.toString.call(null)
// '[object Null]'

Object.prototype.toString.call(undefined)
// '[object Undefined]'

Object.prototype.toString.call(Math)
// '[object Math]'

Object.prototype.toString.call({})
// '[object Object]'

Object.prototype.toString.call([])
// '[object Array]'

...
```

参考链接：https://juejin.im/post/591647550ce4630069df1c4a
