## vue3 开发使用 vscode 插件

vue3 插件：volar
vue2 插件：vetur

使用 vue3 开发的时候需要关闭 vetur
使用 vue2 开发的时候需要关闭 volar

如果不提示，需要更新 vsCode 版本，卸载 volar 并重装。

### `的参数不能赋给类型“App<any> & Partial`

2023 年 4 月 26 日，突然发现，打开之前 vue3 + hooks 的项目，有一行一行的报错提示了，`的参数不能赋给类型“App<any> & Partial`，后面百度发现，是 volar 插件升级了的问题，可以参考 https://blog.csdn.net/qq_39581137/article/details/130281753：

1. 解决了 npm uninstall -g @volar/vue-language-server 或者 npm uninstall @volar/vue-language-server 执行其中一句然后重启 vscode 就可以。
2. 把"Vue Language Features (Volar)"插件切换到预发布版本后，左侧提示“需要重新加载”,点击自动重新加载，OK。

### xxx
