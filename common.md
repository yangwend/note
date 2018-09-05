### 常用处理方法
> 本文档属于一些公用方法的介绍，以及代码整合，可作参考。

---

#### 1. 生成三位随机数

##### `Math.random()` 定义：
[0，1) === [即从0（包含0）到...1但不包括1（排除1）。
##### 使用方法：
```
function getRandom() { // 得到一个大于等于0，小于1之间的随机数
    return Math.random();
}

function getRandomArbitrary(min, max) { // min <= xxx < max
    return Math.random() * (max - min) + min;
}
```
##### 生成方法
`(Math.random()*10).toString().replace('.','').substr(0, 3)`