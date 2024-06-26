## vsCode 简单配置和插件配置

### 配置文件

配置文件所在地：  
C:\Users\Administrator\AppData\Roaming\Code\User\settings.json

settings.json 配置项：

```json
{
  // "terminal.integrated.shell.windows": "C:\\Windows\\System32\\cmd.exe",
  // "terminal.integrated.shell.windows": "D:\\Program Files\\Git\\bin\\bash.exe",
  "terminal.integrated.profiles.windows": {
    "Git-Bash": {
      "path": "D:\\Program Files\\Git\\bin\\bash.exe",
      "args": []
    }
  },
  "terminal.integrated.defaultProfile.windows": "Git-Bash",
  "tslint.autoFixOnSave": true,
  "editor.formatOnSave": true,
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
  "prettier.bracketSameLine": true,
  "prettier.jsxSingleQuote": true,
  "prettier.printWidth": 120,
  "editor.tabSize": 2,
  "docthis.includeAuthorTag": true,
  "docthis.includeDescriptionTag": true,
  "docthis.authorName": "yangwen",
  "files.associations": {
    "*.wpy": "vue"
  },
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.fixAll.eslint": true,
    "eslint.autoFixOnSave": true,
    "source.fixAll.stylelint": true
  },
  "stylelint.validate": ["css", "less", "postcss", "scss", "vue", "sass"],
  "editor.detectIndentation": false,
  "security.workspace.trust.untrustedFiles": "open",
  "security.workspace.trust.enabled": false,
  "editor.unicodeHighlight.allowedCharacters": {
    "！": true,
    "：": true,
    "　": true
  },
  "[markdown]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "vue.inlayHints.optionsWrapper": false,
  "fileheader.customMade": {
    "Author": "git config user.name",
    "Date": "Do not edit", // 文件创建时间(不变)
    // 文件最后编辑者
    "LastEditors": "git config user.name && git config user.email",
    "LastEditTime": "Do not edit", // 文件最后编辑时间
    "Description": "描述"
  },
  "fileheader.configObj": {
    "createFileTime": true,
    "language": {
      "languagetest": {
        "head": "/$$",
        "middle": " $ @",
        "end": " $/",
        "functionSymbol": {
          "head": "/** ",
          "middle": " * @",
          "end": " */"
        },
        "functionParams": "js"
      }
    },
    "autoAdd": true,
    "autoAddLine": 100,
    "autoAlready": true,
    "annotationStr": {
      "head": "/*",
      "middle": " * @",
      "end": " */",
      "use": false
    },
    "headInsertLine": {
      "php": 2,
      "sh": 2
    },
    "beforeAnnotation": {
      "文件后缀": "该文件后缀的头部注释之前添加某些内容"
    },
    "afterAnnotation": {
      "文件后缀": "该文件后缀的头部注释之后添加某些内容"
    },
    "specialOptions": {
      "特殊字段": "自定义比如LastEditTime/LastEditors"
    },
    "switch": {
      "newlineAddAnnotation": true
    },
    "supportAutoLanguage": [],
    "prohibitAutoAdd": ["json"],
    "folderBlacklist": ["node_modules", "文件夹禁止自动添加头部注释"],
    "prohibitItemAutoAdd": ["项目的全称, 整个项目禁止自动添加头部注释, 可以使用快捷键添加"],
    "moveCursor": true,
    "dateFormat": "YYYY-MM-DD HH:mm:ss",
    "atSymbol": ["@", "@"],
    "atSymbolObj": {
      "文件后缀": ["头部注释@符号", "函数注释@符号"]
    },
    "colon": [": ", ": "],
    "colonObj": {
      "文件后缀": ["头部注释冒号", "函数注释冒号"]
    },
    "filePathColon": "路径分隔符替换",
    "showErrorMessage": false,
    "writeLog": false,
    "wideSame": false,
    "wideNum": 13,
    "functionWideNum": 0,
    "CheckFileChange": false,
    "createHeader": false,
    "useWorker": false,
    "designAddHead": false,
    "headDesignName": "random",
    "headDesign": false,
    "cursorModeInternalAll": {},
    "openFunctionParamsCheck": true,
    "functionParamsShape": ["{", "}"],
    "functionBlankSpaceAll": {},
    "functionTypeSymbol": "*",
    "typeParamOrder": "type param",
    "customHasHeadEnd": {},
    "throttleTime": 60000,
    "functionParamAddStr": "",
    "NoMatchParams": "no show param"
  },
  "editor.fontSize": 15,
  "workbench.startupEditor": "none",
  "typescript.updateImportsOnFileMove.enabled": "always",
  "javascript.updateImportsOnFileMove.enabled": "always",
  "volar.inlayHints.eventArgumentInInlineHandlers": false,
  "window.zoomLevel": 1,
  "files.eol": "\r\n",
  "vue.codeActions.savingTimeLimit": 10000,
  "diffEditor.ignoreTrimWhitespace": false,
  "cSpell.userWords": [
    "ahooks",
    "antd",
    "camelcase",
    "consts",
    "dedup",
    "kotler",
    "MANUFACTOR",
    "openx",
    "phmc",
    "pinia",
    "pluve",
    "popconfirm",
    "provincecode",
    "Scrm",
    "stylelint",
    "Webp",
    "Weixin",
    "yangwen"
  ]
}
```

### 插件配置

常用的插件有：

| 插件名称                                                  | 功用                                           |
| --------------------------------------------------------- | ---------------------------------------------- |
| 小程序助手                                                | 将小程序 app 项目转换为其他类型项目            |
| Auto Rename Tag                                           | 自动重命名 HTML/XML 标签                       |
| axml-highlight                                            | 针对支付宝小程序的 axml 语法高亮显示           |
| ChatGPT GPT-4                                             | chatGPT                                        |
| Chinese (Simplified) Language Pack for Visual Studio Code | 适用于 VS Code 的中文（简体）语言包            |
| Code Spell Checker                                        | 代码拼写检查工具                               |
| css-auto-prefix                                           | 添加 css 前缀用于浏览器兼容                    |
| Document This                                             | 为 ts 或 js 文件添加注释                       |
| Dart                                                      | dart flutter                                   |
| Docker                                                    | docker 部署                                    |
| Error Lens                                                | 错误显示提示                                   |
| ESLint                                                    | es 校验规则                                    |
| Flutter                                                   | flutter 支持                                   |
| GitLens — Git supercharged                                | 为 vsCode 添加 git 能力                        |
| HTML Snippets                                             | 支持编辑 HTML 文件                             |
| JSON Tools                                                | json 格式化                                    |
| Live Server                                               | 起本地服务器                                   |
| Markdown All in One                                       | markdown 相关                                  |
| Markdown Preview Enhanced                                 | Markdown 预览                                  |
| Marp for VS Code                                          | markdown 转 ppt                                |
| Path Intellisense                                         | 路径下文件名自动补全                           |
| Prettier - Code formatter                                 | 代码格式化                                     |
| sjs(支付宝小程序 sjs 文件识别)                            | highlight \*.sjs file                          |
| Smarty Template Support                                   | -                                              |
| stylelint                                                 | 样式文件校验                                   |
| SVG                                                       | SVG Coding, Minify, Pretty, Preview All-In-One |
| SVG Viewer                                                | svg 预览                                       |
| SVG Previewer                                             | svg 预览                                       |
| TODO Highlight                                            | todo 高亮工具                                  |
| TortoiseSVN                                               | TortoiseSVN                                    |
| TS in Markdown                                            | markdown 支持 ts 语法                          |
| TSLint Vue                                                | tslint for vue                                 |
| Vetur                                                     | vue 工具                                       |
| Vetur-wepy                                                | 对 wepy 框架的.wpy 后缀支持                    |
| vue-helper                                                | vue 特性提示                                   |
| volar                                                     | vue 工具                                       |
| Dart                                                      | 支持 dart 语言                                 |
| flutter                                                   | 支持 flutter                                   |
| markdown-all-in-one                                       | markdown 支持                                  |
| marp for vsCode                                           | marp for vsCode                                |
| koroFileHeader                                            | 文件头部注释                                   |
