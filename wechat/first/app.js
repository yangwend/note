//app.js
App({
    onLaunch: function () {
        // 展示本地存储能力
        let logs = wx.getStorageSync('logs') || [];
        logs.unshift(Date.now());
        wx.setStorageSync('logs', logs);
    },
    getUserInfo: function(cb) {
        let that = this;
        if (this.globalData.userInfo) {
            cb && cb(this.globalData.userInfo);
        } else {
            wx.login({
                success: res => {
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo
                            cb && cb(this.globalData.userInfo);
                        }
                    });
                }
            });
        }
    },
    globalData: {
        userInfo: null
    }
})