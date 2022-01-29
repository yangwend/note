## HTTP 响应状态码

### 408 Request Timeout

响应状态码 `408 Request Timeout` 表示服务器想要将没有在使用的连接关闭。一些服务器会在空闲连接上发送此信息，**即便是在客户端没有发送任何请求的情况下**。

服务器应该在此类响应中将 `Connection` 首部的值设置为 "close"，因为 `408` 意味着服务器已经决定将连接关闭，而不是继续等待。

这类响应出现的比较频繁，源于一些浏览器——例如 Chrome, Firefox 27+, 或者 IE9 等——使用 HTTP 协议中的预连接机制来加速上网体验。同时应该注意到，某些服务器会直接关闭连接，而不发送此类消息。

http://tool.chinaz.com/pagestatus/
https://www.cnblogs.com/lienen/p/10767687.html

### 参考链接

1. [HTTP 状态码](https://www.runoob.com/http/http-status-codes.html)
