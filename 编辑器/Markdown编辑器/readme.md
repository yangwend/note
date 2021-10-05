## Markdown

>Markdown，是一种简单易用的标记语言，可以用它来格式化几乎任何文档。

**Markdown主要用来记笔记**。

中文文档地址：http://markdown.p2hp.com/

### Markdown 基本介绍

>Markdown是一种轻量级的标记语言，可用于将格式设置元素添加到纯文本文档中，使文档内容呈现特定的格式。

可以使用文本编辑器将Markdown格式元素添加到纯文本文件中。既可以直接读取，也可以使用预览插件进行预览。

**Markdown优势：**
* Markdown可以用于一切。人们使用它来创建网站，文档，便笺，书籍，演示文稿，电子邮件和技术文档。

* 支持跨应用程序打开包含Markdown格式文本的文件。

* 支持在任何操作系统的设备上创建Markdown格式文本文件。

* reddit、github、许多基于web的应用程序都支持Markdown。


**工作流程**
1. 使用文本编辑器或专用的Markdown应用程序创建Markdown文件，扩展名为 .md 或者 .markdown。

2. 在Markdown应用程序中打开Markdown文件。

3. 使用Markdown应用程序将Markdown文件转换为HTML文档。

4. 在浏览器中查看HTML文件，或在Markdown应用程序中预览该HTML，或用Markdown应用程序将其转换为其他格式文件，如pdf。


### Markdown 常用语法

>我们不仅可以在Markdown文件中使用Markdown语法，也可以使用HTML标签。

#### 标题
使用`#`来创建标题。标题级别与`#`的个数相对应。其中，在文本下方的行上，添加任意数量的`=`代表`h1`，添加任意数量的`-`代表`h2`。

| Markdown | HTML | 渲染输出 |
| --- | --- | --- |
| # head1 | `<h1>head1</h1>` | <h1>head1</h1> |
| head1<br>========= | `<h1>head1</h1>` | <h1>head1</h1> |
| ## head2 | `<h2>head2</h2>` | <h2>head2</h2> |
| head2<br>--------- | `<h2>head2</h2>` | <h2>head2</h2> |
| ### head3 | `<h3>head3</h3>` | <h3>head3</h3> |
| #### head4 | `<h4>head4</h4>` | <h4>head4</h4> |
| ##### head5 | `<h5>head51</h5>` | <h5>head5</h5> |
| ###### head6 | `<h6>head6</h6>` | <h6>head6</h6> |

#### 段落
使用`空白行`分隔一行或多行文本，**不应缩进带空格或制表符的段落**。

| Markdown | HTML | 渲染输出 |
| --- | --- | --- |
| I really like using Markdown.<br><br>I think I'll use it to format all of my documents from now on.<br><br> | `<p>I really like using Markdown.</p>`<br><br>`<p>I think I'll use it to format all of my documents from now on.</p>` | <p>I really like using Markdown.</p><p>I think I'll use it to format all of my documents from now on.</p> |


#### 换行
使用`两个或多个空格`结束一行，然后回车。

| Markdown | HTML | 渲染输出 |
| --- | --- | --- |
| This is the first line. <br>And this is the second line. | `<p>This is the first line.<br>And this is the second line.</p>` | <p>This is the first line.<br>And this is the second line.</p> |


#### 着重-粗体
在单词或短语前后添加`**`或者`__`。如果要加粗一个单词的中部，使用`**`且字母之间不要加空格。

| Markdown | HTML | 渲染输出 |
| --- | --- | --- |
| I just love \*\*bold text\*\*. | `I just love <strong>bold text</strong>.` | I just love **bold text**. |
| I just love \_\_bold text\_\_. | `I just love <strong>bold text</strong>.` | I just love __bold text__. |
| l\*\*o\*\*ve | `l<strong>o</strong>ve` | l**o**ve |


#### 着重-斜体
在单词或短语前后添加`*`或`_`。如果要斜体突出单词的中间部分，使用`*`且字母之间不要加空格。
| Markdown | HTML | 渲染输出 |
| --- | --- | --- |
| Italicized text is the \*cat's meow\*. | `Italicized text is the <em>cat's meow</em>.` | Italicized text is the *cat's meow*. |
| Italicized text is the \_cat's meow\_. | `Italicized text is the <em>cat's meow</em>.` | Italicized text is the _cat's meow_. |
| l\*o\*ve | `l<em>o</em>ve` | l*o*ve |


#### 着重-粗体+斜体
在单词或短语前后添加`***`或`___`或`**_`或`__*`。**其中**`**_`和`_**`相配对，`__*`和`*__`相配对。

| Markdown | HTML | 渲染输出 |
| --- | --- | --- |
| This text is \*\*\*really important\*\*\*. | `This text is <strong><em>really important</em></strong>.` | This text is ***really important***. |
| This text is \_\_\_really important\_\_\_. | `This text is <strong><em>really important</em></strong>.` | This text is ___really important___. |
| This text is \*\*\_really important\_\*\*. | `This text is <strong><em>really important</em></strong>.` | This text is **_really important_**. |
| This text is \_\_\*really important\*\_\_. | `This text is <strong><em>really important</em></strong>.` | This text is __*really important*__. |


#### 块引用
在段落前面添加`>`。

```
>Dorothy followed her through.
```

==>

>Dorothy followed her through.


#### 具有多个段落的块引用
块引用可以包含多个段落。在段落之间的空白行上添加`>`。

```
>Dorothy followed her through.
>
> asdwefwgrg
```

==>

>Dorothy followed her through.
>
>asdwefwgrg


#### 嵌套块引用
块引用可以嵌套。在要嵌套的段落前面添加`>>`。

```
>Dorothy followed her through.
>
>> asdwefwgrg
```

==>

>Dorothy followed her through.
>
>>asdwefwgrg


#### 具有其他元素的块引用
块引用可以包含其他Markdown格式的元素。并非所有元素都可以使用`-`，您需要进行实验以查看哪些元素有效。

```
> #### The quarterly results look great!
>
> - Revenue was off the chart.
> - Profits were higher than ever.
>
> *Everything* is going according to **plan**.
```

==>

> #### The quarterly results look great!
>
> - Revenue was off the chart.
> - Profits were higher than ever.
>
> *Everything* is going according to **plan**.



#### 清单-有序列表
在每一项前面添加`数字和句点`。数字不必按数字顺序排列，但列表应以数字开头。

| Markdown | HTML | 渲染输出 |
| --- | --- | --- |
| 1. First item<br>2. Second item<br>3. Third item<br>4. Fourth item | `<ol>`<br>`<li>First item</li>`<br>`<li>Second item</li>`<br>`<li>Third item</li>`<br>`<li>Fourth item</li>`<br>`</ol>` | <ol><li>First item</li><li>Second item</li><li>Third item</li><li>Fourth item</li></ol> |
| 1. First item<br>4. Second item<br>6. Third item<br>2. Fourth item | `<ol>`<br>`<li>First item</li>`<br>`<li>Second item</li>`<br>`<li>Third item</li>`<br>`<li>Fourth item</li>`<br>`</ol>` | <ol><li>First item</li><li>Second item</li><li>Third item</li><li>Fourth item</li></ol> |
| 1. First item<br>2. Second item<br>3. Third item<br>&nbsp;&nbsp;&nbsp;&nbsp;1. Indented item<br>&nbsp;&nbsp;&nbsp;&nbsp;2. Indented item<br>4. Fourth item | `<ol>`<br>`<li>First item</li>`<br>`<li>Second item</li>`<br>`<li>Third item`<br>`<ol>`<br>`<li>Indented item</li>`<br>`<li>Indented item</li>`<br>`</ol>`<br>`</li>`<br>`<li>Fourth item</li>`<br>`</ol>` | <ol><li>First item</li><li>Second item</li><li>Third item<ol><li>Indented item</li><li>Indented item</li></ol></li><li>Fourth item</li></ol> |

#### 清单-无序列表
在每一项前面添加`-`或者`*`或者`+`。缩进一个或多个项目以创建嵌套列表。

| Markdown | HTML | 渲染输出 |
| --- | --- | --- |
| - First item<br>- Second item<br>- Third item<br>- Fourth item | `<ul>`<br>`<li>First item</li>`<br>`<li>Second item</li>`<br>`<li>Third item</li>`<br>`<li>Fourth item</li>`<br>`</ul>` | <ul><li>First item</li><li>Second item</li><li>Third item</li><li>Fourth item</li></ul> |
| * First item<br>* Second item<br>* Third item<br>* Fourth item | `<ul>`<br>`<li>First item</li>`<br>`<li>Second item</li>`<br>`<li>Third item</li>`<br>`<li>Fourth item</li>`<br>`</ul>` | <ul><li>First item</li><li>Second item</li><li>Third item</li><li>Fourth item</li></ul> |
| + First item<br>* Second item<br>- Third item<br>* Fourth item | `<ul>`<br>`<li>First item</li>`<br>`<li>Second item</li>`<br>`<li>Third item</li>`<br>`<li>Fourth item</li>`<br>`</ul>` | <ul><li>First item</li><li>Second item</li><li>Third item</li><li>Fourth item</li></ul> |
| - First item<br>- Second item<br>- Third item<br>&nbsp;&nbsp;&nbsp;&nbsp;- Indented item<br>&nbsp;&nbsp;&nbsp;&nbsp;- Indented item<br>- Fourth item | `<ul>`<br>`<li>First item</li>`<br>`<li>Second item</li>`<br>`<li>Third item`<br>`<ul>`<br>`<li>Indented item</li>`<br>`<li>Indented item</li>`<br>`</ul>`<br>`</li>`<br>`<li>Fourth item</li>`<br>`</ul>` | <ul><li>First item</li><li>Second item</li><li>Third item<ul><li>Indented item</li><li>Indented item</li></ul></li><li>Fourth item</li></ul> |



#### 清单-在列表中添加元素
要在保留列表连续性的同时在列表中添加另一个元素，请将该元素缩进四个空格或一个制表符，如以下示例所示。

```
* This is the first list item.
* Here's the second list item.
  I need to add another paragraph below the second list item.
* And here's the third list item.
```
or

```
注意：实测：这种情况下不缩进也可以实现。

* This is the first list item.
* Here's the second list item.
I need to add another paragraph below the second list item.
* And here's the third list item.
```

==>

* This is the first list item.
* Here's the second list item.
I need to add another paragraph below the second list item.
* And here's the third list item.


#### 清单-块引用

```
* This is the first list item.
* Here's the second list item.
  >A blockquote would look great below the second list item.
* And here's the third list item.
```

==>

* This is the first list item.
* Here's the second list item.
  >A blockquote would look great below the second list item.
* And here's the third list item.



#### 表格
使用三个或多个连字符(---)创建每列的标题，并使用管道(|)分隔每列。

```
| 句法 | 描述 |
| --- | ------ |
| xx | xxx |
| zz | zzz |
```

==>

| 句法 | 描述 |
| --- | --- |
| xx | xxx |
| zz | zzz |

可以通过在标题行内的连字符的左侧，右侧或两侧添加一个冒号（:），以使列中的文本左，右或居中对齐。

```
| 左对齐 | 居中对齐 | 居右对齐 |
| :--- | :----: | ---: |
| Header | Title | Here's this |
| Paragraph | Text | And more |
```

==>

| 左对齐 | 居中对齐 | 居右对齐 |
| :--- | :----: | ---: |
| Header | Title | Here's this |
| Paragraph | Text | And more |



#### 代码
将单词或短语前后添加(`)，可实现代码突出显示。

| Markdown | HTML | 渲染输出 |
| --- | --- | --- |
| 这个是\`hi\` | `<span>这个是<code>hi</code></span>` | 这个是`hi` |


#### 转义刻度线
如果要表示为代码的单词或短语包含一个或多个刻度线，可以通过将单词或短语括在双刻度线（``）中来对其进行转义。

| Markdown | HTML | 渲染输出 |
| --- | --- | --- |
| \`\`Use \`code\` in your Markdown file.\`\` | ``<code>Use `code` in your Markdown file.</code>`` | ``Use `code` in your Markdown file.`` |



#### (围栏)代码块
代码块，通常缩进四个空格或一个制表符。当它们在列表中时，将它们缩进八个空格或两个选项卡。在很多情况下这种方式不方便，我们可以在代码块前后的行上使用(```)或者(~~~)，而不必缩进。

```
~~~/```
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
~~~/```
```

==>

~~~
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
~~~

在(```)或者(~~~)后指定某种**语言**，可以使**代码块高亮**。

```
~~~/```json
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
~~~/```
```

==>

~~~json
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
~~~



#### 水平线
在单独一行上使用**三个及以上**的(\*)或(-)或(_)。

```
****
---
______
```


==>

***
---
___


#### 链接
格式如：\[链接文本](链接地址)

```
[Markdown 中文文档地址](http://markdown.p2hp.com/)
```

==>

[Markdown 中文文档地址](http://markdown.p2hp.com/)

若需要链接上添加工具提示，格式如：\[链接文本](链接地址 "链接提示")。

```
[Markdown 中文文档地址](http://markdown.p2hp.com/ "地址哟哟哟")
```

==>

[Markdown 中文文档地址](http://markdown.p2hp.com/ "地址哟哟哟")



#### 网址和电子邮件地址
将URL或电子邮件地址快速转换为链接，请将其括在尖括号中。直接使用链接也可以（Markdown处理器会自动将其转换为链接。）

```
<https://markdown.p2hp.com>
https://markdown.p2hp.com
<fake@example.com>
```

==>

<https://markdown.p2hp.com>
https://markdown.p2hp.com
<fake@example.com>


#### 格式化链接
格式如：\*\*\[链接文本](链接地址)** or \*\[链接文本](链接地址)*。即在方括号和大括号前后添加(**)或者(__)或者(\*)或者(_)。

```
**[Markdown 中文文档地址](http://markdown.p2hp.com/)**

__[Markdown 中文文档地址](http://markdown.p2hp.com/)__

*[Markdown 中文文档地址](http://markdown.p2hp.com/)*

_[Markdown 中文文档地址](http://markdown.p2hp.com/)_
```

==>

**[Markdown 中文文档地址](http://markdown.p2hp.com/)**

__[Markdown 中文文档地址](http://markdown.p2hp.com/)__

*[Markdown 中文文档地址](http://markdown.p2hp.com/)*

_[Markdown 中文文档地址](http://markdown.p2hp.com/)_



#### 图片
格式如：\!\[替代文本](图像资源路径或URL "标题")。其中 "标题"可选。


```
![图片示例](./images/图片示例.jpg "图片标题")
```

==>

![图片示例](./images/图片示例.jpg "图片标题")

若需要向图片添加链接，格式如：\[\!\[替代文本](图像资源路径或URL "标题")](链接地址)。

```
[![图片示例](./images/图片示例.jpg "图片标题")](http://markdown.p2hp.com/)
```

==>

[![图片示例](./images/图片示例.jpg "图片标题")](http://markdown.p2hp.com/)



#### 转义字符
在字符前面添加 \。在表格中可以使用 HTML字符代码`&#124;`显示竖线/管道。以下表格中列举了可以使用反斜杠转义的字符：

| 字符 | 名称 |
| --- | --- |
| \ | 反斜杠 |
| ` | 刻度线 |
| * | 星号 |
| _ | 下划线 |
| {} | 大括号 |
| [] | 中括号 |
| () | 括号 |
| # | 井号 |
| + | 加号 |
| - | 减号 |
| . | 点 |
| ！| 感叹号 |
| \| | 管道 |


#### 标题ID
添加自定义的ID，您可以直接链接到标题，并用CSS修改。格式如：### 标题 {#标题自定义ID}

#### 链接到标题ID
格式如：\[标题](#标题自定义ID)。


#### 删除线
创建带有中心删除线的单词。格式如：\~\~要删除的单词\~\~

```
~~要删除的单词~~
```

==>

~~要删除的单词~~


#### 任务清单
创建带有复选框的项目列表。格式如：- [ ] 项目内容 或 - [x] 项目内容。

```
- [ ] 项目内容
- [x] 项目内容
```

==>

- [ ] 项目内容
- [x] 项目内容



#### 禁用自动URL链接
格式如：\`链接地址`。

```
`http://www.example.com`
```

==>

`http://www.example.com`



### Markdown工具
1. [Dillinger：在线Markdown编辑器](https://dillinger.io/)
2. [GitBook](https://www.gitbook.com/)
3. [Jekyll](https://jekyllrb.com)
4. [Typora](https://typora.io)
5. [StackEdit：在线Markdown编辑器](https://stackedit.io)
6. [印象笔记](https://www.yinxiang.com/product/markdown1/)
...




### 参考链接
1. [Markdown 中文文档地址](http://markdown.p2hp.com/)