## colgroup 中 col 标签指定 width 不生效

有时候，使用 table 开发页面的时候，会存在表格合并和拆分的需求。
列合并在 td 上使用 colspan，行合并在 td 上使用 rowspan 即可。那如何去固定每列的宽度呢？

可以通过使用 colgroup 和 col 标签，给 col 标签配置 width 属性，就可以实现。然而，width 属性在 html5 中已经被废弃了，那怎么使用才能固定列宽呢？

可以给 col 标签加类名，类中指定 width，就能完美实现了。

注意：表格列的宽度会根据内容的宽度自动调整，所以即使你指定了 td 的宽度，内容过宽时，整个表格的布局还是会发生改变，需要给 table 标签的样式属性添加 `table-layout: fixed`

### 参考链接

1. [colgroup 中 col 标签指定 width 不生效的问题](https://www.cnblogs.com/roooobin/p/15689159.html)
