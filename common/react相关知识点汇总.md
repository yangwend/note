## react相关知识点汇总

这个文档主要作为我在平常项目开发过程中遇到的react相关的知识点汇总。文档会持续更新~

react中文文档：https://zh-hans.reactjs.org/docs/getting-started.html

### state与setState
关于state和setState的详细介绍，大家可以直接访问react中文文档，里面有详细解释。

#### state定义
state，可被视为一个react组件UI中的可变状态数据的集合。可变状态数据，即在当前组件中可以被改变的数据。因此，不变数据或者通过可变数据计算出来的数据就不需要作为state了。

#### 一个变量是否可以作为一个state
前提条件：<br/>
(1) state要能代表组件UI中数据的体现，即UI是随着state变化而变化的。<br/>
(2) state只能代表组件UI中数据的体现，即state全部用来控制UI的展示。多余的状态或者通过计算得来的状态是不需要存在于state集合里面的。<br/>

因此，一个变量是否可以作为一个state，可以由以下几种方式来判断：<br/>
(1) 这个变量是否是通过props从父组件中获得的？如果是，那它就不适合作为state。<br/>
(2) 这个变量是否在整个组件生命周期过程中都不变，即不会随着接口或者页面操作而触发改变？如果是，那它就不适合作为state。<br/>
(3) 这个变量是否可以通过可变数据（state或者props）计算得到？比如说state中有个name和age属性，这个变量是通过state中的name属性和age属性拼接得到。如果是，那它就不适合作为state。<br/>
(4) 这个变量是否同时在父组件和子组件中用到？如果是，请考虑将变量提升到父组件中使用。
(5) 这个变量是否在组件的render方法中用于渲染页面？如果不是，那它就不适合作为state。<br/>

#### state和props区别
state和props都是普通的javascript对象，用于存放组件的信息，控制组件的渲染输出。而它们之间最重要的不同点就是：<br/>
`state` 是在组件内部使用，不允许跨组件使用（类似于在一个函数内声明的变量）。可以通过调用setState来改变组件的state状态。<br/>
`props` 用于传递给组件使用（不限制是父组件还是子组件，类似于函数的形参），子组件和父组件都可以改变props。


#### 如何修改state
1. 不要直接给state赋值<br/>
```javascript
// 错误，这样不会改变state，组件不会重新渲染
this.state.name = 'xxx';
// 正确
this.setState({ name: 'xxx' });
```

2. state 更新是异步操作<br/>
react将多个setState调用合并为一个调用来提高性能，因此它是异步更新的。不允许在setState后直接取获取最新的state。
```javascript
// 错误，无法获取最新的state
this.setState({ name: 'xxx' });
console.log(this.state.name);
// 正确
this.setState({ name: 'xxx' }, () => {
    console.log(this.state.name);
});
// 正确
this.setState((preState, props) => {
    // preState可捕获到最新的上一个State
    // props可捕获到最新的Props
    const currName = preState.name + props.name;
    console.log(currName);
    return { name: currName };
})
```
看一个例子：<br/>
```javascript
state = {
    count: 0
};

addCount = ()=> {
    this.setState({count: this.state.count + 1});
}

// 按钮点击触发
handleSomething = () => {
    this.addCount();
    this.addCount();
    this.addCount();
}
```
在render方法里面打印一下 this.state.count，最终会得到几？<br/>
答案是1，不是3。原因：addCount方法里面是通过 this.state.count 执行加1操作。而根据上述所知，setState是异步操作，拿到的 this.state.count 是0，所以最后执行的时候是 0 + 1 为1。

看另外一个类似的例子：<br/>
```javascript
state = {
    count: 0
};

addCount = ()=> {
    this.setState((preState) => {
        return {count: preState.count + 1}
    });
}

// 按钮点击触发
handleSomething = () => {
    this.addCount();
    this.addCount();
    this.addCount();
}
```
在render方法里面打印一下 this.state.count，最终会得到几？<br/>
答案是3。原因：addCount方法里面是通过 preState.count 执行加1操作。而根据上述所知，preState可捕获到最新的上一个state，因此最后一个addCount执行时拿到的 preState.count 是2，所以最后执行的时候是 2 + 1 为3。

3. setState的两种写法<br/>
setState的写法可以分为两类：<br/>
(1) setState(updater[, callback])：第一个参数是一个updater函数；第二个参数是个回调函数（可选）<br/>
```javascript
this.setState((prevState, props) => {
    // preState和props都能拿到最新的数据
    return {age: prevState.age + props.age};
});
```

(2) setState(stateChange[, callback])：第一个参数是一个对象；第二个参数同上（可选）<br/>
```javascript
this.setState({age: 2}, () => {
    // do something
})
```

4. state更新是一个浅合并的过程<br/>
根据react源码可知，setState最终会执行一个更新state的过程，其中最新的state是由原来的state和收集到的state通过 [Object.assign](https://juejin.im/post/5a7418256fb9a0634d277e4e) 来实现合并的。因此它是一个浅合并的过程。
因此，需要改变哪一个属性，直接传入改变后的属性值即可，其余属性值无需传入。



### 参考链接
1. [react 中文文档](https://zh-hans.reactjs.org/docs/getting-started.html)

2. [深入理解State和setState()](https://alexzhong22c.github.io/2018/01/15/react-state/)

3. [组件状态](https://zh-hans.reactjs.org/docs/faq-state.html)

4. [你需要掌握的21个React性能优化技巧](https://mp.weixin.qq.com/s/iZqV6GAi5zyX5P48hR4VLA)

5. [React setState实现机制](http://172.29.3.246:8888/i-front/doc/blob/master/%E5%B0%8F%E7%BB%84%E5%88%86%E4%BA%AB/React-setState%E5%AE%9E%E7%8E%B0%E6%9C%BA%E5%88%B6/page/setState.md)