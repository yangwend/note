## file

### file.type

判断为 xlsx 格式：
application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
判断为 xls 格式：
application/vnd.ms-excel


### file.size
判断是否超过 2M
```
file.size > 2 * 1024 * 1024
```