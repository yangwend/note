## 单元测试

采用 mocha 和 istanbul ， mocha 执行测试用例，istanbul 用于检查覆盖率。

### 命令
1. istanbul cover demo.js：测试覆盖率

2. istanbul cover ./node_modules/mocha/bin/_mocha：测试覆盖率且运行测试用例

3. ./node_modules/mocha/bin/_mocha --reporter mochawesome 运行测试用例且结合mochawesome 打印测试报告

4. mocha -b ./test/open_services.test.js

### 参考链接
1. [mocha、chai、sinon和istanbul实现100%单元测试覆盖率](https://www.jianshu.com/p/ba58b219ea49)

2. [代码覆盖率工具 Istanbul 入门教程](http://www.ruanyifeng.com/blog/2015/06/istanbul.html)

3. [【前端单元测试入门01】Mocha与chai](https://www.jianshu.com/p/aa53ac34e4c0)

4. [测试框架 Mocha 实例教程](http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html)

5. [Chai.js断言库API中文文档](https://www.jianshu.com/p/f200a75a15d2)
