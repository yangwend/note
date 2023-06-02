## AES

在某些比较特殊的场景下，**由于数据的敏感性以及特殊性**，部分前后端的数据交互是需要进行加密传输的，比如账号、密码等信息需要通过加密往后台发送，而后台接口传递到前台的数据也需要进行解密后显示。

什么是 `AES`，简单的说就是一种对称加密，它的**优点**是**算法公开、计算量小、加解密的效率高、加密速度快(加密和解密使用相同的密钥)**，也正因为由于加密解密使用相同的密钥，这就导致**缺点**也很明显，**密钥的管理和分发上比较困难，不是非常安全，密钥管理负担很重**；毕竟需要同步管理前后端的密钥，且存在密钥被获取的风险，但总体来讲，这总比没有加密来的好~

### 步骤

1. 先安装 crypto-js 插件 和 @types/crypto-js 类型描述文件，安装命令：
   ```bash
   npm nstall crypto-js -S
   npm install @types/crypto-js -S
   # or
   yarn add crypto-js -S
   yarn add @types/crypto-js -S
   ```
2. 新建 crypto.ts 文件，封装自定义加密和解密方法，导出

   ```ts
   import CryptoJS from 'crypto-js';

   // 这是密钥，非常重要，可以是后台获取，或者是前后台约定好，注意保护
   // 默认的 KEY 与 iv 与后端保持一致，不采用后端传值密钥。
   const KEY = CryptoJS.enc.Utf8.parse('aaDJL2d9DfhLZO0z'); // 密钥
   const IV = CryptoJS.enc.Utf8.parse('412ADDSSFA342442'); // 偏移量

   export default class CryptoUtils {
     /**
      * @description AES 加密
      * @author yangwen
      * @static
      * @param {string} word
      * @param {string} [keyStr]
      * @param {string} [ivStr]
      * @memberof CryptoUtils
      */
     static encrypt = (word: string, keyStr?: string, ivStr?: string) => {
       let key = KEY;
       let iv = IV;

       if (keyStr && ivStr) {
         key = CryptoJS.enc.Utf8.parse(keyStr);
         iv = CryptoJS.enc.Utf8.parse(ivStr);
       }

       const srcs = CryptoJS.enc.Utf8.parse(word);
       const encrypted = CryptoJS.AES.encrypt(srcs, key, {
         iv: iv,
         mode: CryptoJS.mode.CBC,
         padding: CryptoJS.pad.ZeroPadding,
       });

       return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
     };

     /**
      * @description AES 解密
      * @author yangwen
      * @static
      * @param {string} word
      * @param {string} [keyStr]
      * @param {string} [ivStr]
      * @memberof CryptoUtils
      */
     static decrypt = (word: string, keyStr?: string, ivStr?: string) => {
       let key = KEY;
       let iv = IV;

       if (keyStr && ivStr) {
         key = CryptoJS.enc.Utf8.parse(keyStr);
         iv = CryptoJS.enc.Utf8.parse(ivStr);
       }

       const base64 = CryptoJS.enc.Base64.parse(word);
       const src = CryptoJS.enc.Base64.stringify(base64);

       const decrypt = CryptoJS.AES.decrypt(src, key, {
         iv: iv,
         mode: CryptoJS.mode.CBC,
         padding: CryptoJS.pad.ZeroPadding,
       });

       const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
       return decryptedStr.toString();
     };
   }
   ```

3. 引入使用，如下：

   ```ts
   // 引入
   import CryptoUtils from './crypto.ts';

   // 使用方式
   Encrypt(JSON.stringify(config.data)); //加密
   // 密码加密
   this.formLogin.password = Encrypt(JSON.stringify(this.formLogin.password));

   JSON.parse(Decrypt(response.data)); //解密
   // 密码解密
   this.formLogin.password = JSON.parse(Decrypt(this.getCookie('password')));
   ```

### 参考链接

1. [前端使用 AES 密码加密、解密](https://blog.csdn.net/weixin_65793170/article/details/128238297)
2. [前端如何理解 AES 加解密](https://zhuanlan.zhihu.com/p/543366122?utm_id=0)
3. [解决前端如何使用插件 crypto-js 进行 AES 加密方式数据加密](https://blog.csdn.net/zy21131437/article/details/128528713)
