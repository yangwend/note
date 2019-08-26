## 如何获取scrollTop值

### 各浏览器下scrollTop的差异
1. IE6/7/8

对于没有doctype声明的页面可以使用 document.body.scrollTop 来获取scrollTop高度；<br/>
对于有doctype声明的页面则可以使用 document.documentElement.scrollTop 来获取scrollTop高度；

2. Safari
safari 比较特别，有自己获取scrollTop的函数：window.pageYOffset ；

3. Firefox
火狐等等相对标准些的浏览器就省心多了，直接用 document.documentElement.scrollTop ；

### 获取scrollTop值
兼容各浏览器下的获取scrollTop值的写法：
```javascript
var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
```

window.pageYOffset (Safari)被放置在||的中间位置的解释：<br/>
当数字 0 与 undefined 进行 或运算时，系统默认返回最后一个值。即或运算中 0 == undefined ;
当页面滚动条刚好在最顶端，即scrollTop值为 0 时。IE 下window.pageYOffset (Safari) 返回为 undefined，此时将window.pageYOffset (Safari) 放在或运算最后面时，scrollTop 返回 undefined，undefined 用在接下去的运算就会报错咯。而其他浏览器 无论 scrollTop 赋值或运算顺序如何都不会返回 undefined，可以安全使用。


### 参考链接
1. [如何获取scrollTop值，兼容各浏览器](https://www.jianshu.com/p/4fa26c007852)