## js 实现鼠标选区

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="zh" lang="zh">
  <head>
    <title>鼠标拖动画矩形</title>
    <meta http-equiv="content-type" content="text/html;charset=utf-8" />
    <style type="text/css">
      body,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      hr,
      p,
      blockquote,
      dl,
      dt,
      dd,
      ul,
      ol,
      li,
      pre,
      form,
      fieldset,
      legend,
      button,
      input,
      textarea,
      th,
      td {
        margin: 0;
        padding: 0;
      }
      html {
        color: #000;
        overflow-y: scoll;
        overflow: -moz-scrollbars-vertical;
      }
      .div {
        position: absolute;
        border: 1px dashed blue;
        width: 0px;
        height: 0px;
        left: 0px;
        top: 0px;
        overflow: hidden;
      }
      .retc {
        position: absolute;
        border: 1px solid #cccccc;
        overflow: hidden;
        background: #efefef;
      }
    </style>
  </head>
  <body></body>
  <script language="javascript">
    var wId = 'w';
    var index = 0;
    var startX = 0,
      startY = 0;
    var flag = false;
    var retcLeft = '0px',
      retcTop = '0px',
      retcHeight = '0px',
      retcWidth = '0px';
    document.onmousedown = function (e) {
      flag = true;
      try {
        var evt = window.event || e;
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
        startX = evt.clientX + scrollLeft;
        startY = evt.clientY + scrollTop;
        index++;
        var div = document.createElement('div');
        div.id = wId + index;
        div.className = 'div';
        div.style.marginLeft = startX + 'px';
        div.style.marginTop = startY + 'px';
        document.body.appendChild(div);
      } catch (e) {
        //alert(e);
      }
    };
    document.onmouseup = function () {
      try {
        document.body.removeChild($(wId + index));
        var div = document.createElement('div');
        div.className = 'retc';
        div.style.marginLeft = retcLeft;
        div.style.marginTop = retcTop;
        div.style.width = retcWidth;
        div.style.height = retcHeight;
        document.body.appendChild(div);
      } catch (e) {
        //alert(e);
      }
      flag = false;
    };
    document.onmousemove = function (e) {
      if (flag) {
        try {
          var evt = window.event || e;
          var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
          var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
          retcLeft = (startX - evt.clientX - scrollLeft > 0 ? evt.clientX + scrollLeft : startX) + 'px';
          retcTop = (startY - evt.clientY - scrollTop > 0 ? evt.clientY + scrollTop : startY) + 'px';
          retcHeight = Math.abs(startY - evt.clientY - scrollTop) + 'px';
          retcWidth = Math.abs(startX - evt.clientX - scrollLeft) + 'px';
          $(wId + index).style.marginLeft = retcLeft;
          $(wId + index).style.marginTop = retcTop;
          $(wId + index).style.width = retcWidth;
          $(wId + index).style.height = retcHeight;
        } catch (e) {
          //alert(e);
        }
      }
    };
    var $ = function (id) {
      return document.getElementById(id);
    };
  </script>
</html>
```

### 参考链接

1. [JS 拖动鼠标画出方框实现鼠标选区的方法](https://www.jb51.net/article/70657.htm)
