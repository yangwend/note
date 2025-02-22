## HTTP 请求方法

### 简单介绍

`HTTP` 是超文本传输协议，其定义了客户端与服务器端之间文本传输的规范。
**`HTTP` 默认使用 `80` 端口**，这个端口指的是服务端的端口，而客户端使用的端口是动态分配的。当我们没有指定端口访问时，浏览器会默认帮我们添加 `80` 端口。
现在大多数访问都使用了 `HTTPS` 协议，**`HTTPS` 的默认端口为 `443`**，如果使用 80 端口访问 HTTPS 协议的服务器可能会被拒绝。

### HTTP 请求方法

根据 HTTP 标准，HTTP 请求可以使用多种请求方法。

HTTP1.0 定义了三种请求方法： `GET`、`POST` 和 `HEAD` 方法。

HTTP1.1 新增了六种请求方法：`OPTIONS`、`PUT`、`PATCH`、`DELETE`、`TRACE` 和 `CONNECT` 方法。

| 序号 | 方法             | 描述                                                                                                                                              |
| ---- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | GET              | 向特定的资源发出请求。                                                                                                                            |
| 2    | HEAD             | 向服务器索要与 GET 请求相一致的响应，只不过响应体将不会被返回。这一方法可以在不必传输整个响应内容的情况下，就可以获取包含在响应消息头中的元信息。 |
| 3    | POST             | 向指定资源提交数据进行处理请求（例如提交表单或者上传文件）。数据被包含在请求体中。POST 请求可能会导致新的资源的建立和/或已有资源的修改。          |
| 4    | PUT              | 向指定资源位置上传其最新内容。                                                                                                                    |
| 5    | DELETE           | 请求服务器删除 Request-URI 所标识的资源。                                                                                                         |
| 6    | CONNECT          | HTTP/1.1 协议中预留给能够将连接改为管道方式的代理服务器。                                                                                         |
| 7    | OPTIONS          | 返回服务器针对特定资源所支持的 HTTP 请求方法。也可以利用向 Web 服务器发送'\*'的请求来测试服务器的功能性。                                         |
| 8    | TRACE            | 回显服务器收到的请求，主要用于测试或诊断。                                                                                                        |
| 9    | PATCH            | 实体中包含一个表，表中说明与该 URI 所表示的原内容的区别。                                                                                         |
| 10   | MOVE             | 请求服务器将指定的页面移至另一个网络地址。                                                                                                        |
| 11   | COPY             | 请求服务器将指定的页面拷贝至另一个网络地址。                                                                                                      |
| 12   | LINK             | 请求服务器建立链接关系。                                                                                                                          |
| 13   | UNLINK           | 断开链接关系。                                                                                                                                    |
| 14   | WRAPPED          | 允许客户端发送经过封装的请求。                                                                                                                    |
| 15   | Extension-mothed | 在不改动协议的前提下，可增加另外的方法。                                                                                                          |

### 注意

1. 方法名称是区分大小写的，当某个请求所针对的资源不支持对应的请求方法的时候，服务器应当返回状态码 405（Mothod Not Allowed）；当服务器不认识或者不支持对应的请求方法时，应返回状态码 501（Not Implemented）。
2. HTTP 服务器至少应该实现 GET 和 HEAD/POST 方法，其他方法都是可选的，此外除上述方法，特定的 HTTP 服务器支持扩展自定义的方法。

### 参考链接

1. [HTTP 请求方法](https://www.runoob.com/http/http-methods.html)

2. [HTTP 请求方法对照表](http://tools.jb51.net/table/http_request_method)

3. [HTTP 请求方式中 8 种请求方法（简单介绍）](https://www.cnblogs.com/weibanggang/p/9454581.html)
