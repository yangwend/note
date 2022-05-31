## 浏览器兼容问题

### 兼容问题

1. 解决移动端 iPhone 设备点击时出现半透明的灰色背景：
   -webkit-tap-highlight-color 是 css3 的新属性，这个属性只用于 IOS(iPhone 和 iPad)。当你**点击一个链接或通过 Javascript 定义的可点击元素**的时候，它就会出现一个半透明的灰色背景。

   你可以设置 -webkit-tap-highlight-color 为任何颜色，想要禁用这个背景，设置颜色的透明度设置为 0。

```css
.class {
  -webkit-tap-highlight-color: transparent; //方法一
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0); //方法二
  tap-highlight-color: rgba(0, 0, 0, 0); //方法三
}
```

2. font-spider(http://www.font-spider.org/)  
   （1）[web 字体格式及几种在线格式转换工具介绍](https://blog.csdn.net/xiaolongtotop/article/details/8316554)  
   （2）[在线字体转换工具](http://www.freefontconverter.com/)  
   （3）[@font-face 中#iefix 的详解](http://m18050905128.lofter.com/post/373374_60afdbf)  
   （4）[Font-Spider 一个神奇的网页中文字体工具，就是这么任性](http://www.cnblogs.com/Kummy/p/4442142.html)

3. img 标签显示问题：  
   在部分安卓手机（x5 内核）如果页面采用 img 标签进行布局，用户点击图片，则会进行放大。  
   解决办法：  
   （1）使用：

   ```css
   img {
     pointer-events: none;
   }
   ```

   （2）将 `img` 标签改为 `background-image` 来进行布局（注意不同手机端的兼容问题）

4. iphone 及 ipad 下输入框默认内阴影
   ```css
   .class {
     -webkit-appearance: none;
   }
   ```

### 参考链接

1. [微信公众号开发，移动端开发遇到的问题及其他技巧](https://blog.csdn.net/tang242424/article/details/82660838)

2. [-webkit-text-size-adjust 使用汇总](https://www.jianshu.com/p/9fad261dd3e1)

3. [CSS3 鲜为人知的属性-webkit-tap-highlight-color 的理解](https://www.cnblogs.com/libin-1/p/5903350.html)
4. []()
