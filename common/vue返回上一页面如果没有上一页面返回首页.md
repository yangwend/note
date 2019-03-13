# vue返回上一页面如果没有上一页面返回首页
```javascript
methods: {
    back(){
        if (window.history.length <= 1) {
            this.$router.push({path:'/'})
            return false
        } else {
            this.$router.go(-1)
        }
    }
},
```