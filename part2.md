#创建四个jade视图及入口文件中路由处理
##1.创建入口文件，并初始化Express
```
- Imooc
    - app.js

  1 var express = require('express')
  2 var port = process.env.PORT || 3000
  3 var app = express()
  4 
  5 app.set('views', './views')
  6 app.set('view engine', 'jade')
  7 
  8 app.listen(port)
  9 
 10 console.log('imooc started on port ' + port)
```

##2.创建四个jade视图
`Tip:`这里只是为了简单的跑通`part1`中的四个测试路径，在此只写一个，其他三个与之类似

```
- Imooc
    - views
        - index.jade
 
  1 doctype
  2 html
  3   head
  4     meta(charset="utf-8")
  5     title #{title}
  6   body
  7     h1 #{title}
 ```
 `list.jade、admin.jade、detail.jade`与`index.jade`类似，不再贴代码了。
 
##3.路由编写
 
 ```
- Imooc
    - app.js

 12 // index page
 13 app.get('/', function(req, res) {
 14     console.log('index')
 15     res.render('index', {
 16         title: 'Home'
 17     })
 18 })
```

其他几项写之类似，具体看代码。