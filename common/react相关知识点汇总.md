## react相关知识点汇总

这个文档主要作为在平常项目开发过程中遇到的react相关的知识点汇总。文档会持续更新~

附上react中文文档地址：https://zh-hans.reactjs.org/docs/getting-started.html

### state与setState
关于state和setState的详细介绍，大家可以直接访问react中文文档，里面有详细解释。

#### state定义
state，可被视为一个react组件UI中的可变状态数据的集合。可变状态数据，即在当前组件中可以被改变的数据。因此，不变数据或者通过可变数据计算出来的数据就不需要作为state了。

#### 一个变量是否可以作为一个state
前提条件：<br/>
（1）state要能代表组件UI中数据的体现，即UI是随着state变化而变化的。<br/>
（2）state只能代表组件UI中数据的体现，即state全部用来控制UI的展示。多余的状态或者通过计算得来的状态是不需要存在于state集合里面的。<br/>

因此，一个变量是否可以作为一个state，可以由以下几种方式来判断：<br/>
（1）这个变量是否是通过props从父组件中获得的？如果是，那它就不适合作为state。<br/>
（2）这个变量是否在整个组件生命周期过程中都不变，即不会随着接口或者页面操作而触发改变？如果是，那它就不适合作为state。<br/>
（3）这个变量是否可以通过可变数据（state或者props）计算得到？比如说state中有个name和age属性，这个变量是通过state中的name属性和age属性拼接得到。如果是，那它就不适合作为state。<br/>
（4）这个变量是否同时在父组件和子组件中用到？如果是，请考虑将变量提升到父组件中使用。<br/>
（5）这个变量是否在组件的render方法中用于渲染页面？如果不是，那它就不适合作为state。<br/>

#### state和props区别
state和props都是普通的javascript对象，用于存放组件的信息，控制组件的渲染输出。而它们之间最重要的不同点就是：<br/>
（1）`state` 是在组件内部使用，不允许跨组件使用（类似于在一个函数内声明的变量）。可以通过调用setState来改变组件的state状态。<br/>
（2）`props` 用于传递给组件使用（不限制是父组件还是子组件，类似于函数的形参），子组件和父组件都可以改变props。


#### 如何修改state
（1）不要直接给state赋值<br/>
```javascript
// 错误，这样不会改变state，组件不会重新渲染
this.state.name = 'xxx';
// 正确
this.setState({ name: 'xxx' });
```

（2）state 更新是异步操作<br/>
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
答案是3。原因：addCount方法里面是通过 preState.count 执行加1操作。而根据上述所知，preState可捕获到最新的上一个state，因此最后一个addCount执行时拿到的 preState.count 是2，所以最后执行的时候是 2 + 1 为3。<br/>

（3）setState的两种写法<br/>
setState(updater[, callback])：第一个参数是一个updater函数；第二个参数是个回调函数（可选）<br/>
```javascript
this.setState((prevState, props) => {
    // preState和props都能拿到最新的数据
    return {age: prevState.age + props.age};
});
```

setState(stateChange[, callback])：第一个参数是一个对象；第二个参数同上（可选）<br/>
```javascript
this.setState({age: 2}, () => {
    // do something
})
```

（4）state更新是一个浅合并的过程<br/>
根据react源码可知，setState最终会执行一个更新state的过程，其中最新的state是由原来的state和收集到的state通过 [Object.assign](https://juejin.im/post/5a7418256fb9a0634d277e4e) 来实现合并的。因此它是一个浅合并的过程，无法进行深层次的合并。对于数组和对象等引用类型来说，如果更改时没有改变其引用地址，就无法触发组件的重新渲染。


（5）如何修改为数组类型的state<br/>
```javascript
/** 
* 新增元素
*/
// 方法一：将state先赋值给另外的变量，然后使用concat创建新数组
const books = this.state.books;
this.setState({
    books: books.concat(['React']);
});

// 方法二：使用preState、concat创建新数组
this.setState(preState => ({
    books: preState.books.concat(['React']);
}));

// 方法三：ES6数组扩展 spread syntax
this.setState(preState => ({
    books: [...preState.books, 'React'];
}))


/** 
* 截取元素（使用slice或者splice都可以返回一个新的数组）
*/
// 方法一：将state先赋值给另外的变量，然后使用slice创建新数组
const books = this.state.books;
this.setState({
    books: books.slice(1, 5);
})
// 方法二：使用preState、slice创建新数组
this.setState(preState => ({
    books: preState.books.slice(1, 5);
}))


/** 
* 过滤元素
*/
// 方法一：将state先赋值给另外的变量，然后使用filter创建新数组
const books = this.state.books;
this.setState({
    books: books.filter(item => {
        return item != 'React';
    });
})
// 方法二：使用preState、filter创建新数组
this.setState(preState => ({
    books: preState.books.filter(item => {
        return item != 'React';
    });
}))
```
注意，不要使用push、pop、shift、unshift等方法修改数组类型的状态，因为这些方法都是在原数组的基础上修改。concat、slice、splice、filter可以返回一个新的数组。


### Component、PureComponent、Stateless Functional Component
Component、PureComponent、Stateless Functional Component是三种创建组件的方式。

#### Component
使用es6语法，我们可以这样来创建一个组件
```javascript
import React, { Component } from 'react';
import { Button } from 'antd';

export default class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }

    // 使用箭头函数，可直接绑定this，无需使用bind来实现绑定
    handleClick = () => {
        const { count } = this.state;
        this.setState({
            count: count++
        });
    }
    
    render() {
        return (
            <div>
                <p>最新的count为 {this.state.count}，父组件的name为 {this.props.name}</p>
                <Button onClick={this.handleClick}>加1</Button>
            </div>
        );
    }
}
```
通过上述例子可以知道，组件继承自`React.Component`。组件的state可以在构造函数中进行赋值，而组件可以接收父组件传过来的props。当点击【加1】按钮时，count加1，触发组件重新渲染。

使用Component创建组件时，生命周期函数 `shouldComponentUpdate` 默认返回true，因此当组件的props或者state发生改变时，会将当前的state和props与nextState和nextProps进行对比，如果改变，就会重新渲染。


#### PureComponent
有时，我们为了避免不必要的渲染，会对shouldComponentUpdate做一下处理，请看如下例子：
```javascript
import React, { Component } from 'react';
import { Button } from 'antd';

export default class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }

    // 修改生命周期函数，判断部分属性发生改变时才重新渲染，可以避免不必要的渲染
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.name !== nextProps.name) {
            return true;
        }
        if (this.state.count !== nextState.count) {
            return true;
        }
        return false;
    }

    // 使用箭头函数，可直接绑定this，无需使用bind来实现绑定
    handleClick = () => {
        const { count } = this.state;
        this.setState({
            count: count++
        });
    }
    
    render() {
        return (
            <div>
                <p>最新的count为 {this.state.count}，父组件的name为 {this.props.name}</p>
                <Button onClick={this.handleClick}>加1</Button>
            </div>
        );
    }
}
```
上面的例子使用shouldComponentUpdate对该组件进行了性能优化，只有当props.name和state.count发生改变时，才会触发页面的重新渲染，其余时候都不会发生变化，可以提供性能。然而，如果每个组件都这样去定义，会使得代码很臃肿。React提供了`PureComponent`来实现这部分性能处理，我们只需要实现组件的业务逻辑即可。

但是，React提供的PureComponent只会对props和state进行浅比较，当props和state为嵌套对象或者数组等时，就无法重新渲染页面了。比如使用数组的push方法更新state，就无法达到预期效果。

因此，要想解决上述的弊端，就要避免使用可变对象作为props和state，可以每次返回一个全新的对象，来进行props和state的更新，例如数组的concat、filter等。


#### Stateless Functional Component
对于Component和PureComponent而言，都是属于包含自身状态以及页面交互等的复杂型组件。React还为我们提供了一种无状态组件(Stateless Functional Component)，用来实现简单的页面展示的功能。
```javascript
import React from 'react';
const Demo1 = ({ count, addCount }) => {
    return (
        <div>
            <p>最新的count为 {count}</p>
            <Button onClick={addCount}>加1</Button>
        </div>
    )
}
```
上面的例子使用无状态组件实现一个加1的功能，count和addCount都由props提供，自身没有任何状态。因此，对于相同的props输入，必定有相同的页面展示。


#### 三种方式比较
1. Component：<br/>
用来创建组件，组件继承它，拥有自身的状态和交互等，属于复杂型组件。<br/>
适用场景：创建拥有内部state和交互的组件，不需要考虑性能的业务场景下。

2. PureComponent：<br/>
用来创建组件，组件继承它，拥有自身的状态和交互等，属于复杂型组件。组件内部实现了浅比较状态下的shouldComponentUpdate，可以提高性能。<br/>
适用场景：创建拥有内部state和交互的组件，考虑性能，个人推荐使用这种方式。对于数组或者嵌套对象需要避免使用可变对象作为state和props。

3. Stateless Functional Component：<br/>
用来创建组件，自身没有状态和交互行为，全部由父组件的props来控制，属于纯渲染页面型组件。<br/>
适用场景：创建没部无状态、纯展示型的组件。



### react 性能优化技巧

#### 使用React.PureComponent
由上一节可知，使用React.PureComponent可以对state和props进行浅比较，避免一些不必要的渲染，提升页面性能。

#### 使用shouldComponentUpdate生命周期事件
由上一节可知，在组件中使用shouldComponentUpdate生命周期事件，可以根据不同的业务场景，实现不一样的功能，屏蔽部分不需要再次渲染页面的场景，提升页面性能。

#### 使用 React Fragments 避免额外标记
在写组件过程中，会不可避免的写一些标签用来包裹一段内容。但是有时候可以使用React.Fragment来避免额外的标记数量。
```javascript
import React, { Fragment } from 'react';
const Demo1 = ({ count, addCount }) => {
    return (
        <div>
            <p>最新的count为 {count}</p>
            <Button onClick={addCount}>加1</Button>
        </div>
    )
}
// 其中的最外层的div标签就只是用来包裹里面的内容，其实没有任何含义，可直接使用Fragment来代替
const Demo2 = ({ count, addCount }) => {
    return (
        <Fragment>
            <p>最新的count为 {count}</p>
            <Button onClick={addCount}>加1</Button>
        </Fragment>
    )
}
```

#### 避免componentWillMount()中的异步请求
根据react生命周期执行顺序可知，componentWillMount 是在渲染组件之前调用的。在componentWillMount执行时，此时还没有挂载组件，无法访问DOM元素。
```javascript
import React, { PureComponent, Fragment } from "react";
export default class Demo extends PureComponent {
    constructor() {
        this.state = {
            userData: {}
        };
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'xxx',
            callback: (res) => {
                this.setState({
                    userData: res || {}
                });
            }
        })
    }

    render() {
        return (
            <Fragment>
                <b>UserName: {this.state.userData.name}</b>
                <b>UserAge: {this.state.userData.age}</b>
            </Fragment>
        )
    }
}
```
上述例子中，在componentWillMount生命周期里面调用异步API，在render初次渲染时，无法获取到对应的数据。等数据返回，setState后，需要重新渲染页面。对比直接在componentDidMount中调用API，多了一次渲染的操作。因此，尽可能避免在componentWillMount生命周期中调用异步API。


#### 使用唯一键迭代



### 参考链接
1. [react 中文文档](https://zh-hans.reactjs.org/docs/getting-started.html)

2. [深入理解State和setState()](https://alexzhong22c.github.io/2018/01/15/react-state/)

3. [组件状态](https://zh-hans.reactjs.org/docs/faq-state.html)

4. [你需要掌握的21个React性能优化技巧](https://mp.weixin.qq.com/s/iZqV6GAi5zyX5P48hR4VLA)

5. [谈一谈创建React Component的几种方式](https://segmentfault.com/a/1190000008402834)