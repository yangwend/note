## windows如何彻底清除nodejs
有时候在安装了nodejs后，发现版本不对，或者版本比较高，或者版本比较低，需要支持不同的版本的nodejs的安装。如果单纯的直接去nodejs官网上下载安装最新版本的Nodejs并不会起效。

当然，nvm 可以用来切换nodejs版本，该方式不在此篇文章讨论范围内。

在重新安装nodejs之前，我们需要把 windows 电脑上所有关于nodejs安装的路径等进行删除。那么如何彻底删除呢？

### 彻底删除

彻底卸载nodejs（删除**环境变量**，删除**磁盘安装文件夹**，删除**C盘的各种npm，node缓存**，删除**注册表**）

一定要删干净，删干净，删干净！

最后，以防万一，在“我的电脑”C盘搜索“node”，“npm”，“yarn”，“tyarn”，“cnpm”等总之和这个版本nodejs有关联的文件夹和文件（特别提醒，有的软件也有node_modules，不要删错了）。

然后重启电脑（最好用cleaner或者电脑管家之类的软件清理一下垃圾，缓存，和无效注册表）。

好了，接着重新安装node，把node放在某个磁盘根目录（我一度怀疑，这个问题是由于我之前把node放在“D:\Program Files”文件夹下导致的，因为Program Files中间有空格）。此时也可以使用 nvm 来对node进行管理。

1. 命令行输入：npm cache clean --force
2. C:\Program Files (x86)\Nodejs
3. C:\Program Files\Nodejs
4. C:\Users\{User}\AppData\Roaming\npm (or %appdata%\npm)
5. C:\Users\{User}\AppData\Roaming\npm-cache (or %appdata%\npm-cache)
6. C:\Users\{User}\.npmrc (and possibly check for that without the . prefix too)
7. C:\Users\{User}\AppData\Local\Temp\npm-*
8. Check your %PATH% environment variable 
9. 命令行输入：where node


### 参考链接
1. [how-to-completely-remove-node-js-from-windows](https://stackoverflow.com/questions/20711240/how-to-completely-remove-node-js-from-windows)