# Form 表单提交知识的总结
原文链接:
1. https://juejin.im/post/5bc6aa8be51d450e9943804d 或者
2. https://www.jianshu.com/p/b7cd1ae17360

### form基础知识文档
[form 基础 介绍](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/form)  
[form表单那点事儿(上) 基础篇](https://segmentfault.com/a/1190000005803696)
```
浏览器使用这种 HTTP 方式来提交 form. 可能的值有:
(1) post: 指的是 HTTP POST 方法 ; 表单数据会包含在表单体内然后发送给服务器.
(2) get: 指的是 HTTP GET 方法; 表单数据会附加在 action 属性的URI中，并以 '?' 作为分隔符, 然后这样得到的 URI 再发送给服务器. 当这样做（数据暴露在URI里面）没什么副作用，或者表单仅包含ASCII字符时，再使用这种方法吧。
这个值可以被 <button> 或者 <input> 元素中的 formmethod 属性重载（覆盖）。
```

### note
```
1. form 表单以 get 方式可以提交到静态页面，post 方式不可以提交到静态页面。
2. form 表单 post 方式可以提交到 .aspx/.ashx 等动态页面。
3. POST 提交时若想 action 多携带表单以外的参数的写法：
/xxx/aa.do?fn=submit&a=1&b=2 使用 koa2 搭建的服务器，在 node 端接口获取多携带的参数需要使用 ctx.request.query 来获取，而获取表单里面的参数则直接通过接口传入的参数来获取。
```

### extensions
[表单提交原理（涉及post和get）](https://zhuanlan.zhihu.com/p/34478684)  
[Form表单、四种常见的POST请求提交数据方式](https://blog.csdn.net/bigtree_3721/article/details/82809459)  
[文件夹上传：从前端到后端](https://laike9m.com/blog/wen-jian-jia-shang-chuan-cong-qian-duan-dao-hou-duan,59/)  
