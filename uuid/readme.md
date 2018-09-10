### uuid
---
#### 1. npm 包 uuid（生成唯一标识符）
简单，快速生成RFC4122 UUIDS。  
链接：https://www.npmjs.com/package/uuid  
安装：`npm install uuid`  
使用方法：  
```
var uuid = require('uuid');
uuid.v1();
uuid.v4();

import * as uuid from 'uuid';
uuid.v1();
uuid.v4();

const uuidv4 = require('uuid/v4');
uuidv4();
```