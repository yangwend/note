## vsCode简单配置和插件配置

### 配置文件

配置文件所在地：  
C:\Users\Administrator\AppData\Roaming\Code\User\settings.json


settings.json配置项：

```json
{
  // "terminal.integrated.shell.windows": "C:\\Windows\\System32\\cmd.exe",
  // "terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe",
  "terminal.integrated.profiles.windows": {
    "Git-Bash": {
      "path": "C:\\Program Files\\Git\\bin\\bash.exe",
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
  "files.associations": {
    "*.wpy": "vue"
  },
  "window.zoomLevel": 0,
  "editor.codeActionsOnSave": {
    "source.fixAll": false
  },
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
  "fileheader.customMade": {
    "Date": "Do not edit", // 文件创建时间(不变)
    // 文件最后编辑者
    "LastEditors": "git config user.name && git config user.email", 
    "LastEditTime": "Do not edit", // 文件最后编辑时间
    "FilePath": "Do not edit" // 文件在项目中的相对路径 自动更新
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
    "prohibitAutoAdd": [
      "json"
    ],
    "folderBlacklist": [
      "node_modules",
      "文件夹禁止自动添加头部注释"
    ],
    "prohibitItemAutoAdd": [
      "项目的全称, 整个项目禁止自动添加头部注释, 可以使用快捷键添加"
    ],
    "moveCursor": true,
    "dateFormat": "YYYY-MM-DD HH:mm:ss",
    "atSymbol": [
      "@",
      "@"
    ],
    "atSymbolObj": {
      "文件后缀": [
        "头部注释@符号",
        "函数注释@符号"
      ]
    },
    "colon": [
      ": ",
      ": "
    ],
    "colonObj": {
      "文件后缀": [
        "头部注释冒号",
        "函数注释冒号"
      ]
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
    "functionParamsShape": [
      "{",
      "}"
    ],
    "functionBlankSpaceAll": {},
    "functionTypeSymbol": "*",
    "typeParamOrder": "type param",
    "customHasHeadEnd": {},
    "throttleTime": 60000,
    "functionParamAddStr": "",
    "NoMatchParams": "no show param"
  }
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
| TSLint Vue | tslint for vue |
| Vetur | vue工具 |
| Vetur-wepy | 对wepy框架的.wpy后缀支持 |
| vue-helper | vue 特性提示 |
| volar | vue工具 |
| Dart | 支持 dart 语言 |
| flutter | 支持flutter |
| markdown-all-in-one | markdown 支持 |
| marp for vsCode | marp for vsCode |
| koroFileHeader | 文件头部注释 |