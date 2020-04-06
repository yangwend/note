# HTTP中post和get请求的区别

GET和POST是Http请求中最常用的两种请求方法

首先介绍GET与POST的差异：

　　（1）GET请求资源数据，POST向服务器传递需要处理的数据；

　　（2）GET传递数据大小不超过2kb，POST没有限制；

　　（3）GET请求的参数会在Url上暴露显示，POST请求参数在Request body里，所以相对GET来说，POST安全性较高；

　　（4）GET请求的静态资源会被浏览器缓存，POST不会被缓存；

　　（5）GET传递的数据类型是文本，POST是文本或者二进制；

　　（6）GET请求被回退时是无害的，POST请求被回退是会被重新再执行一次；

GET和POST的使用场景：

　　（1）在传递一些机密信息时必须要使用POST；

　　（2）只是查询获取数据时可以用GET；

　　（3）POST请求速率会比GET慢，因为GET请求产生一个TCP数据包;POST请求产生两个TCP数据包；