#Node入口文件分析和目录初始化
##1.项目结构初始化
 
 ``` 
－Imooc/   
  > npm instsall express
  > npm install jade
  > npm install mongoose
  > npm install bower -g
  > bower install bootstrap
  > npm install body-parser
  
  ```
  
##2.入口文件编码

```
-Imooc/app.js
var express = require('express')
var app = express()

app.set('view engine', 'jade')
app.set('port', 3000)

app.get('/', function(req, res){
  res.render('index', {'title', 'node'})
})
```

上面`index`对应`index.jade`

```
doctype html //html可有可无
html
  head
  body
    title #{title}
```

##3.创建视图
```
- Imooc/
       - node_modules/
       - bower_components/
       - views/
       		 - index.jade
       		 - detail.jade
       		 - admin.jade
       		 - list.jade
       - app.js
```

##4.测试前端流程
```
- localhost:3000/ 
- localhost:3000/movie/1
- localhost:3000/admin/movie
- localhost:3000/admin/list
```