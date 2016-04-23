var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var port = process.env.PORT || 3000
var app = express()

app.set('views', './views/pages')
app.set('view engine', 'jade')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
//app.all('/', function(req, res){
//  res.send(req.body.title, req.body.text);
//})
//app.use(express.bodyParser())
app.use(express.static(path.join(__dirname, 'bower_components')))
app.listen(port)

console.log('imooc started on port ' + port)

// index page
app.get('/', function(req, res) {
  console.log('index')
  res.render('index', {
    title: 'imooc 首页',
    movies: [{
      title:'机械战警',
      _id:1,
      poster:"http://r3.ykimg.com/05160000530EEB63675839160D0B79D5"
    }, {
      title:'机械战警',
      _id:2,
      poster:"http://r3.ykimg.com/05160000530EEB63675839160D0B79D5"
    }, {
      title:'机械战警',
      _id:3,
      poster:"http://r3.ykimg.com/05160000530EEB63675839160D0B79D5"
    }, {
      title:'机械战警',
      _id:4,
      poster:"http://r3.ykimg.com/05160000530EEB63675839160D0B79D5"
    }, {
      title:'机械战警',
      _id:5,
      poster:"http://r3.ykimg.com/05160000530EEB63675839160D0B79D5"
    }, {
      title:'机械战警',
      _id:6,
      poster:"http://r3.ykimg.com/05160000530EEB63675839160D0B79D5"
    }, {
      title:'机械战警',
      _id:7,
      poster:"http://r3.ykimg.com/05160000530EEB63675839160D0B79D5"
    }]
  })
})

// detail page
app.get('/movie/:id', function(req, res) {
  console.log('detail')
  res.render('detail', {
    title: 'imooc 详情',
    movie: {
      doctor: '何塞.帕迪里亚',
      country: '美国',
      title: '机械战警',
      year: 2014,
      language:'英语',
      flash:'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
      summary: '翻拍自1987年同名科幻经典、由《精英部队》导演何塞.帕迪里亚执导的新版《机械战警》'
    }
  })
})

// list page
app.get('/admin/list', function(req, res) {
  console.log('list')
  res.render('list', {
    title: 'imooc 列表',
    movies: [{
      title: '机械战警',
      _id: 1,
      doctor: '何塞.帕迪里亚',
      country: '美国',
      year: 2014,
      language: '英语',
      flash:'http:://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
      summary: '翻拍自1987年同名科幻经典、由《精英部队》导演何塞.帕迪里亚执导的新版《机械战警》'

    }]
  })
  console.log(res.get('list'))
})

// admin page
app.get('/admin/movie', function(req, res) {
  console.log('admin')
  res.render('admin', {
    title: 'imooc 后台录入页',
    movie: {
      doctor: '',
      country: '',
      year: '',
      poster: '',
      flash: '',
      summary: '',
      language: ''
    }
  })
})
