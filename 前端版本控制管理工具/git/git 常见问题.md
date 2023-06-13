## git 常见问题

### 解决 fatal: refusing to merge unrelated histories

原代码在 gitee 上，在 gitlab 上新建了一个仓库之后，需要把原代码提交到 gitlab 上的远程仓库，设置 remote origin 后，git pull origin develop，
本地仓库进行关联提交、拉取的时候，出现了如下错误：fatal: refusing to merge unrelated histories

解决：git pull origin develop --allow-unrelated-histories
在命令后面加上 `--allow-unrelated-histories`

### git 强制覆盖代码

git push -f origin develop

### Recv failure: Connection was reset

① 依次将如下两条语句复制到 git 中后，点击回车。

```bash
git config --global --unset http.proxy
git config --global --unset https.proxy
```

② 从 Windows 搜索中输入打开 cmd，将 ipconfig/flushdns 复制，点击回车，清理 DNS 缓存，再尝试提交

### fatal: unable to access ‘https://github.com/.......‘: OpenSSL SSL_read: Connec

产生原因：一般是这是因为服务器的 SSL 证书没有经过第三方机构的签署，所以才报错
解除 ssl 验证后，再次 git 即可
解决办法输入此条 git 命令：

```bash
git config --global http.sslVerify "false"
```

### 参考链接

1. [解决 fatal: refusing to merge unrelated histories](https://blog.51cto.com/laok8/2454524)
2. [Recv failure: Connection was reset](https://blog.csdn.net/m0_69087087/article/details/128838186)
3. [git push 代码到远程仓库，报错解决：fatal: unable to access ‘https://github.com/.......‘: OpenSSL SSL_read: Connec](https://blog.csdn.net/cubejava/article/details/120631396)
