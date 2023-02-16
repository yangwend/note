## URLSearchParams
`URLSearchParams` 接口定义了一些实用的方法来处理 `URL` 的查询字符串。

### 构造函数
URLSearchParams()：返回一个 `URLSearchParams` 对象。

### API
1. append

2. delete

3. entries

4. get

5. getAll

6. has

7. keys

8. set

9. sort

10. toString

11. values

```js
var paramsString = "q=URLUtils.searchParams&topic=api"
var searchParams = new URLSearchParams(paramsString);

for (let p of searchParams) {
  console.log(p);
}

searchParams.has("topic") === true; // true
searchParams.get("topic") === "api"; // true
searchParams.getAll("topic"); // ["api"]
searchParams.get("foo") === null; // true
searchParams.append("topic", "webdev");
searchParams.toString(); // "q=URLUtils.searchParams&topic=api&topic=webdev"
searchParams.set("topic", "More webdev");
searchParams.toString(); // "q=URLUtils.searchParams&topic=More+webdev"
searchParams.delete("topic");
searchParams.toString(); // "q=URLUtils.searchParams"

```

`URLSearchParams` 构造函数不会解析完整 `URL`，但是如果字符串起始位置有 `?` 的话会被去除。

```js
var paramsString1 = "http://example.com/search?query=%40";
var searchParams1 = new URLSearchParams(paramsString1);

searchParams1.has("query"); // false
searchParams1.has("http://example.com/search?query"); // true

searchParams1.get("query"); // null
searchParams1.get("http://example.com/search?query"); // "@" (equivalent to decodeURIComponent('%40'))

var paramsString2 = "?query=value";
var searchParams2 = new URLSearchParams(paramsString2);
searchParams2.has("query"); // true

var url = new URL("http://example.com/search?query=%40");
var searchParams3 = new URLSearchParams(url.search);
searchParams3.has("query") // true

```

### 参考链接
1. [URLSearchParams](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams)