## 微信小程序

### 1. 微信开发者工具

https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html

### 2. 微信小程序 api

https://developers.weixin.qq.com/miniprogram/dev/

### 小程序用户信息相关接口调整公告

具体见如下链接：https://developers.weixin.qq.com/community/develop/doc/000e881c7046a8fa1f4d464105b001?blockType=1

1. 访问蓝牙、添加通讯录联系人、添加日历事件需要用户授权
2. `<open-data>` 组件获取用户头像和昵称
   （1）使用 button(open-type="getUserInfo") 进行授权登录，授权后可以获得用户信息  
    https://developers.weixin.qq.com/miniprogram/dev/component/button.html

   ```wxml
   <!-- 需要使用 button 来授权登录 -->
   <button wx:if="{{canIUse}}" open-type="getUserInfo" bindgetuserinfo="bindGetUserInfo">授权登录</button>
   <view wx:else>请升级微信版本</view>
   ```

   ```wxjs
   Page({
     data: {
       canIUse: wx.canIUse('button.open-type.getUserInfo')
     },
     onLoad: function() {
       // 查看是否授权
       wx.getSetting({
         success (res){
           if (res.authSetting['scope.userInfo']) {
             // 已经授权，可以直接调用 getUserInfo 获取头像昵称
             wx.getUserInfo({
               success: function(res) {
                 console.log(res.userInfo)
               }
             })
           }
         }
       })
     },
     bindGetUserInfo (e) {
       console.log(e.detail.userInfo)
     }
   })
   ```

   （2）使用 button(open-type=chooseAvatar)，提供选择头像的功能，保存到后台数据中，展示的时候获取用户信息再展示。设置中可以修改用户头像和昵称。  
    https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/userProfile.html

   ```wxml
   <button class="avatar-wrapper" open-type="chooseAvatar" bind:chooseavatar="onChooseAvatar">
     <image class="avatar" src="{{avatarUrl}}"></image>
   </button>
   <input type="nickname" class="weui-input" placeholder="请输入昵称"/>
   ```

   ```wxjs
   const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

   Page({
     data: {
       avatarUrl: defaultAvatarUrl,
     },
     onChooseAvatar(e) {
       const { avatarUrl } = e.detail
       this.setData({
         avatarUrl,
       })
     }
   })
   ```

3. 获取手机号能力安全升级
   （1）新版本接口不再需要提前调用 wx.login 进行登录。
   （2）button(open-type) 监听 bindgetphonenumber，获取到动态令牌 code  
    https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/getPhoneNumber.html

   ```wxml
   <button open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber"></button>
   ```

   ```wxjs
   Page({
     getPhoneNumber (e) {
       console.log(e.detail.code)
     }
   })
   ```

   获取到 code 之后，传给后台，后台调用 phonenumber.getPhoneNumber api 获取手机号：phoneNumber
   https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/phonenumber/phonenumber.getPhoneNumber.html

### 3. 注意点
