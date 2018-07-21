Component({
    properties: {
        showClose: { // 是否显示 X
            type: Boolean,
            value: false
        },
        title: { // 标题
            type: String,
            value: ''
        },
        cancelText: { // 取消的文案
            type: String,
            value: '取消'
        },
        sureText: { // 确定的文案
            type: String,
            value: '确定'
        },
    },
    data: {
        // 这里是一些组件内部数据
        someData: {}
    },
    methods: {
        // 这里是一个自定义方法
        customMethod: function() {}
    }
})