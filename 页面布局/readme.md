## 页面布局总结

1. 解决移动端iPhone设备点击时出现半透明的灰色背景
https://blog.csdn.net/username_xu/article/details/79697616  
.class{  
    &nbsp;&nbsp;&nbsp;&nbsp;-webkit-tap-highlight-color:transparent;//方法一  
    &nbsp;&nbsp;&nbsp;&nbsp;-webkit-tap-highlight-color: rgba(0, 0, 0, 0);//方法二  
    &nbsp;&nbsp;&nbsp;&nbsp;tap-highlight-color: rgba(0, 0, 0, 0);//方法三  
}  
或者  
html, body{  
    &nbsp;&nbsp;&nbsp;&nbsp;-webkit-tap-highlight-color: rgba(0, 0, 0, 0);  
}  

2. -webkit-text-size-adjust使用汇总  
https://www.jianshu.com/p/9fad261dd3e1  
-webkit-text-size-adjust: 100%|none;  
如果要用小于12px字体时，用-webkit-transform: scale( ) 缩小到合适值。

3. CSS3 鲜为人知的属性-webkit-tap-highlight-color的理解  
https://www.cnblogs.com/libin-1/p/5903350.html  

4. img 标签显示问题：  
在部分安卓手机（x5内核）如果页面采用img标签进行布局，用户点击图片，则会进行放大。  
解决办法：  
（1）使用：  
img {  
    &nbsp;&nbsp;&nbsp;&nbsp;pointer-events: none;  
}  
（2）将 img 标签改为 background-image 来进行布局（注意不同手机端的兼容问题）  

5. font-spider(http://www.font-spider.org/)  
 （1）[web字体格式及几种在线格式转换工具介绍](https://blog.csdn.net/xiaolongtotop/article/details/8316554)  
 （2）[在线字体转换工具](http://www.freefontconverter.com/)  
 （3）[@font-face中#iefix的详解](http://m18050905128.lofter.com/post/373374_60afdbf)  
 （4）[Font-Spider 一个神奇的网页中文字体工具，就是这么任性](http://www.cnblogs.com/Kummy/p/4442142.html)
