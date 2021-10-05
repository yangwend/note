## vsCode简单配置和插件配置

### 配置文件

配置文件所在地：  
C:\Users\Administrator\AppData\Roaming\Code\User\settings.json


settings.json配置项：

```json
{
    // "terminal.integrated.shell.windows": "C:\\Windows\\System32\\cmd.exe",
    // "terminal.integrated.shell.windows": "C:\\Program Files (x86)\\Git\\bin\\bash.exe",
    "terminal.integrated.profiles.windows": {
      "Git-Bash": {
        "path": "C:\\Program Files (x86)\\Git\\bin\\bash.exe",
        "args": []
      }
    },
    "terminal.integrated.defaultProfile.windows": "Git-Bash",
    "tslint.autoFixOnSave": true,
    "editor.formatOnSave": false,
    "[typescript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[scss]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[jsonc]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescriptreact]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[json]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[html]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "prettier.singleQuote": true,
    "prettier.jsxBracketSameLine": true,
    "prettier.jsxSingleQuote": true,
    "prettier.printWidth": 120,
    "editor.tabSize": 2,
    "docthis.includeAuthorTag": true,
    "docthis.includeDescriptionTag": true,
    "docthis.authorName": "yangwen",
    "open-in-browser.default": "Chrome",
    "files.associations": {
        "*.wpy": "vue"
    },
    "window.zoomLevel": 0,
    "editor.codeActionsOnSave": {
      "source.fixAll": true
    },
    "editor.detectIndentation": false,
    "security.workspace.trust.untrustedFiles": "open",
    "security.workspace.trust.enabled": false
}
```


### 插件配置
常用的插件有：

| 插件名称 | 功用 |
| --- | --- |
| 小程序助手 | 将小程序app项目转换为其他类型项目 |
| Auto Rename Tag | 自动重命名HTML/XML标签 |
| axml-highlight | 针对支付宝小程序的axml语法高亮显示 |
| Chinese (Simplified) Language Pack for Visual Studio Code | 适用于 VS Code 的中文（简体）语言包 |
| css-auto-prefix | 添加css前缀用于浏览器兼容 |
| Document This | 为ts或js文件添加注释 |
| ESLint | es 校验规则 |
| GitLens — Git supercharged | 为vsCode添加git能力 |
| HTML Snippets | 支持编辑HTML文件 |
| Markdown Preview Enhanced | Markdown预览 |
| Path Intellisense | 路径下文件名自动补全 |
| Prettier - Code formatter | 代码格式化 |
| sjs(支付宝小程序sjs文件识别) | highlight *.sjs file |
| stylelint | 样式文件校验 |
| SVG Viewer | svg 预览 |
| TortoiseSVN | TortoiseSVN |
| TSLint | ts校验规则 |
| Vetur | vue工具 |
| Vetur-wepy | 对wepy框架的.wpy后缀支持 |
| vue-helper | vue 特性提示 |