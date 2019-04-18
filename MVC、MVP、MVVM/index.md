## 前端开发中的 MVC/MVP/MVVM

> MVC、MVP、MVVM 是常见的软件架构设计模式，它通过分离关注点来改进代码的组织方式。<br/>
设计模式，是为了解决一类问题而总结出的抽象的方法。而一种架构模式往往使用了多种设计模式。<br/>
MVC、MVP、MVVM 相同部分在于 MV(Model-View)，不同地方在于 C(Controller)、P(Presenter)、VM(ViewModel)。

### MVC
* Model：模型层，用于封装和应用程序的业务逻辑相关的数据以及对数据的处理方法。例如：数据变量、操作数据的方法。

* View：视图层，用于数据展示，即页面展示。

* Controller：控制器，定义用户界面对用户输入的响应方式，连接模型和视图，用于控制应用程序的流程，处理用户的行为和数据上的改变。<br/>
    ![MVC流程图](https://lc-gold-cdn.xitu.io/9da7ababda36b88a5dd7.png?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

    如图，实线代表方法调用，虚线代表事件通知。
    Controller 响应 View 的事件，即调用 Model 的接口（操作数据方法）对数据进行操作，数据发生变化之后，通知 View 进行更新。

总结：<br/>
（1）Model 和 View　之间使用了观察者模式，View 事先在此 Model 上注册，Model 发生变化时通知 View 进行更新。<br/>
（2）View 和 Model 之间使用了策略模式。View 引入了 Controller 的实例来实现特定的响应策略。如果需要实现不同的响应策略，只需要使用不同的 Controller 实例替换即可。<br/>
（3）控制器是模型和视图之间的纽带。MVC 将响应机制封装在 Controller 对象中，当用户操作页面时，控制器中的事件触发器就会执行。

缺点：<br/>
View 和 Controller 一一对应，Controller 复用性比较差。



### MVP
* Model：模型层，用于封装和应用程序的业务逻辑相关的数据以及对数据的处理方法。例如：数据变量、操作数据的方法。

* View：视图层，用于数据展示，即页面展示。

* Presenter：包含用户对 View 的操作方法。用户操作页面时，会通知 Model 更新，并调用 View 提供的方法更新 View。<br/>
    ![MVP流程图](https://lc-gold-cdn.xitu.io/7e6efa438bda9cb0073d.png?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

总结：<br/>
（1）Model 层包含与业务相关的数据和处理数据的方法。<br/>
（2）用户对 View 的操作都放到了 Presenter 里。用户操作页面后，Presenter 通知 Model 更新，再调用 View 提供的接口（这里指提供的更新视图的方法 render 等）更新视图。<br/>

缺点：<br/>
Presenter 中需要提供大量代码维持 View 到 Model 和 Model 和 View 的数据的 “手动同步”。MVP 缺乏数据绑定，Presenter 会根据视图渲染需求而改变。



### MVVM
* Model：数据层，负责数据本身，不包含行为。

* View：视图层，实现数据格式化、数据绑定渲染到 DOM。

* ViewModel：核心——数据绑定。负责View 和 Model 之间的数据同步。<br/>
    ![MVVM流程图](https://lc-gold-cdn.xitu.io/1fba28fee8c9c5eeb021.png?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

总结：<br/>
（1）View 不知道 Model 的存在，Model 和 ViewModel 也察觉不到 View，达到低耦合模式。<br/>
（2）ViewModel 监听 View 的变化，通知 Model 进行改变；ViewModel 监听 Model 的变化，通知 View 发生变化。<br/>


### 参考文档
1. [浅析前端开发中的 MVC/MVP/MVVM 模式](https://juejin.im/post/593021272f301e0058273468#heading-4)