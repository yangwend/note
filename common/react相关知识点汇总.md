## react 相关知识点汇总

这个文档主要作为在平常项目开发过程中遇到的 react 相关的知识点汇总。文档会持续更新~

附上 react 中文文档地址：https://zh-hans.reactjs.org/docs/getting-started.html

### state 与 setState
关于 state 和 setState 的详细介绍，大家可以直接访问 react 中文文档，里面有详细解释。

#### state 定义
state，可被视为一个 react 组件 UI 中的可变状态数据的集合。可变状态数据，即在当前组件中可以被改变的数据。因此，不变数据或者通过可变数据计算出来的数据就不需要作为 state 了。

#### 一个变量是否可以作为一个 state
前提条件：<br/>
（1）state 要能代表组件 UI 中数据的体现，即 UI 是随着 state 变化而变化的。<br/>
（2）state 只能代表组件 UI 中数据的体现，即 state 全部用来控制 UI 的展示。多余的状态或者通过计算得来的状态是不需要存在于 state 集合里面的。<br/>

因此，一个变量是否可以作为一个 state，可以由以下几种方式来判断：<br/>
（1）这个变量是否是通过 props 从父组件中获得的？如果是，那它就不适合作为 state。<br/>
（2）这个变量是否在整个组件生命周期过程中都不变，即不会随着接口或者页面操作而触发改变？如果是，那它就不适合作为 state。<br/>
（3）这个变量是否可以通过可变数据（state 或者 props）计算得到？比如说 state 中有个 name 和 age 属性，这个变量是通过 state 中的 name 属性和 age 属性拼接得到。如果是，那它就不适合作为 state。<br/>
（4）这个变量是否同时在父组件和子组件中用到？如果是，请考虑将变量提升到父组件中使用。<br/>
（5）这个变量是否在组件的 render 方法中用于渲染页面？如果不是，那它就不适合作为 state。<br/>

#### state 和 props 区别
state 和 props 都是普通的 javascript 对象，用于存放组件的信息，控制组件的渲染输出。而它们之间最重要的不同点就是：<br/>
（1）`state` 是在组件内部使用，不允许跨组件使用（类似于在一个函数内声明的变量）。可以通过调用 setState 来改变组件的 state 状态。<br/>
（2）`props` 用于传递给组件使用（不限制是父组件还是子组件，类似于函数的形参），子组件和父组件都可以改变 props。


#### 如何修改 state
（1）不要直接给 state 赋值<br/>
```javascript
// 错误，这样不会改变state，组件不会重新渲染
this.state.name = 'xxx';
// 正确
this.setState({ name: 'xxx' });
```

（2）state 更新是异步操作<br/>
react 将多个 setState 调用合并为一个调用来提高性能，因此它是异步更新的。不允许在 setState 后直接取获取最新的 state。
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
在 render 方法里面打印一下 this.state.count，最终会得到几？<br/>
答案是1，不是3。原因：addCount 方法里面是通过 this.state.count 执行加1操作。而根据上述所知，setState 是异步操作，拿到的 this.state.count 是0，所以最后执行的时候是 0 + 1 为1。

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
在 render 方法里面打印一下 this.state.count，最终会得到几？<br/>
答案是3。原因：addCount 方法里面是通过 preState.count 执行加1操作。而根据上述所知，preState 可捕获到最新的上一个 state，因此最后一个 addCount 执行时拿到的 preState.count 是2，所以最后执行的时候是 2 + 1 为3。<br/>

（3）setState 的两种写法<br/>
setState(updater[, callback])：第一个参数是一个 updater 函数；第二个参数是个回调函数（可选）<br/>
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

（4）state 更新是一个浅合并的过程<br/>
根据 react 源码可知，setState 最终会执行一个更新 state 的过程，其中最新的 state 是由原来的 state 和收集到的 state 通过 [Object.assign](https://juejin.im/post/5a7418256fb9a0634d277e4e) 来实现合并的。因此它是一个浅合并的过程，无法进行深层次的合并。对于数组和对象等引用类型来说，如果更改时没有改变其引用地址，就无法触发组件的重新渲染。


（5）如何修改为数组类型的 state<br/>
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
注意，不要使用 push、pop、shift、unshift 等方法修改数组类型的状态，因为这些方法都是在原数组的基础上修改。concat、slice、splice、filter 可以返回一个新的数组。


### Component、PureComponent、Stateless Functional Component
Component、PureComponent、Stateless Functional Component 是三种创建组件的方式。

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
适用场景：创建内部无状态、纯展示型的组件。



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
当我们渲染一个列表时，一般会使用一个数组做循环处理。循环时需要一个键来识别被添加或者删除的列表子项。例如 ant design 提供的 Table 组件，使用时就需要声明一个 rowKey 作为表格行的 key 值。

键应该是唯一的，一般使用 index 作为默认键（index 每个列表子项都是不一样的，具有唯一性）。当然也可以使用业务 id 等其他变量，只需要保持每个列表子项唯一即可。

使用 index 作为唯一键的场景：<br/>
1. 列表是静态的，列表数据不随着时间变化。
2. 列表循环时，没有唯一id作为唯一键，可使用 index 代替。
3. 列表在整个生命周期过程中，不会进行重新排序、从顶部或者中间添加或者删除某几项。

```javascript
import React, { PureComponent } from 'react';
import { Button, Input } from 'antd';

export default class Demo extends PureComponent {
    state = {
        inputName: '',
        list: ['react', 'angular', 'vue', 'scss']
    };

    addListData = () => {
        this.setState({
            list: [this.state.inputName, ...this.state.list]
        });
    }

    changeInput = (e) => {
        this.setState({
            inputName: e.target.value || ''
        });
    }

    render() {
        return (
            <div>
                <Input
                    style={{width: '200px', marginBottom: '20px'}}
                    placeholder="请输入"
                    defaultValue={this.state.inputName}
                    onChange={this.changeInput}
                /><br/>
                <Button type="primary" onClick={this.addListData}>添加list子项</Button>
                <p>list 展示：</p>
                {
                    this.state.list.map((item, index) => (
                        <div>{index + 1}. {item}</div>
                    ))
                }
            </div>
        );
    }
}
```

每当新元素添加到列表时，默认情况下 react 会同时遍历新列表和旧列表，并作对比。在上面这个例子中，每次输入再点击【添加list子项】，列表顶部就会增加一个元素。由于默认列表使用index作为唯一键。增加子项后，列表内每一项的index都发生变化，需要更新列表每一项。这无疑会拖累组件渲染，导致性能下降。

列表渲染如此，列表渲染多个form表单亦是如此。因此可以使用业务id或者随机数作为唯一键进行渲染，如下面的例子所示：

```javascript
import React, { PureComponent } from 'react';
import { Button, Input } from 'antd';

export default class Demo extends PureComponent {
    state = {
        inputName: '',
        list: [
            { id: '12345', name: 'react' },
            { id: 'wer45', name: 'angular' },
            { id: '3ed4d', name: 'vue' },
            { id: '2se42', name: 'scss' }
        ]
    };

    randomString(length, charSet) {
        const possibleStr = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // 可能的随机数集合
        let finStr = ''; // 最终生成的随机数

        for (let i = 0; i < length; i++) {
            finStr += possibleStr.charAt(Math.floor(Math.random() * possibleStr.length));
        }

        return finStr;
    }

    addListData = () => {
        this.setState({
            list: [{ id: this.randomString(5), name: this.state.inputName }, ...this.state.list]
        });
    }

    changeInput = (e) => {
        this.setState({
            inputName: e.target.value || ''
        });
    }

    render() {
        return (
            <div>
                <Input
                    style={{ width: '200px', marginBottom: '20px' }}
                    placeholder="请输入"
                    defaultValue={this.state.inputName}
                    onChange={this.changeInput}
                /><br />
                <Button type="primary" onClick={this.addListData}>添加list子项</Button>
                <p>list 展示：</p>
                <ul>
                    {
                        this.state.list.map((item, index) => (
                            <li key={item.id}>{item.id}. {item.name}</li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}
```



### 参考链接
1. [react 中文文档](https://zh-hans.reactjs.org/docs/getting-started.html)

2. [深入理解State和setState()](https://alexzhong22c.github.io/2018/01/15/react-state/)

3. [组件状态](https://zh-hans.reactjs.org/docs/faq-state.html)

4. [你需要掌握的21个React性能优化技巧](https://mp.weixin.qq.com/s/iZqV6GAi5zyX5P48hR4VLA)

5. [谈一谈创建React Component的几种方式](https://segmentfault.com/a/1190000008402834)

6. [对子节点进行递归](https://zh-hans.reactjs.org/docs/reconciliation.html)