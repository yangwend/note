## LODOP

关于 Web 打印服务 C-Lodop 支持 https 协议，包含两方面含义：

第一：安装后自带特殊域名 localhost.lodop.net(旧版是 localhost)的 SSL 证书，来自该域名的调用自动适用 https 协议，无需任何设置（适用角色 1）； 
第二：支持自有域名的 SSL 证书，一般在 C-Lodop 担任独立的 AO 服务器角色(角色 2,3)时使用；

1. 64 位浏览器可以安装 32 和 64 位 CLODOP 打印服务；32 位浏览器只能安装 32 位 CLODOP 打印服务。
2. 如果项目中引入的是 https 本地打印服务脚本（32 位的 LODOP 不支持），则只能是 64 位浏览器安装 64 位 CLODOP 插件。如果项目中引入的是 http 本地打印服务脚本，则应该没有位数限制（例如老 pos 现在这样）

以下是经常用到的链接：
http://www.c-lodop.com/blogs/Blog026.html
http://www.c-lodop.com/faq/pp21.html
https://www.lodop.net/faq/pp9.html
https://www.lodop.net/demolist/PrintSample4.html

### 参考链接

1. [LODOP 官网](http://www.lodop.net/index.html)
2. [kr-print-designer 打印模板设计器](https://myliuxia.github.io/demo/kr-print-designer/index.html#/)
