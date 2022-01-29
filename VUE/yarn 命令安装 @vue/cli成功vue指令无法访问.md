## yarn 命令安装 @vue/cli成功vue指令无法访问
使用 `yarn global add @vue/cli` 指令全局安装 @vue/cli 脚手架后，访问 `vue --version`，报错：`bash: vue command not found`。

导致该问题的原因是 **环境变量** 的问题。

### 解决方案
1. 找到 yarn 全局安装 vue 的路径：C:\Users\Administrator\AppData\Local\Yarn\bin\vue

2. 右键我的电脑 —> 属性—> 高级系统设置 —> 高级 —> 环境变量 —> 系统变量 —> Path 选择编辑，将路径复制进去，点击确定。就可以了。

3. 运行命令 vue，成功。

todo   发现还是不行，没有用

### 参考链接
1. [yarn 命令安装 @vue/cli成功，bash: vue command not found](https://blog.csdn.net/xiaohuli_hyr/article/details/108101417)