## git 常见问题

### 解决 fatal: refusing to merge unrelated histories

原代码在 gitee 上，在 gitlab 上新建了一个仓库之后，需要把原代码提交到 gitlab 上的远程仓库，设置 remote origin 后，git pull origin develop，
本地仓库进行关联提交、拉取的时候，出现了如下错误：fatal: refusing to merge unrelated histories

解决：git pull origin develop --allow-unrelated-histories
在命令后面加上 `--allow-unrelated-histories`

### git 强制覆盖代码

git push -f origin develop

### 参考链接

1. [解决 fatal: refusing to merge unrelated histories](https://blog.51cto.com/laok8/2454524)
