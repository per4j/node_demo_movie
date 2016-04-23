#伪造数据填充模板，路通前后端交互流程
##1.项目目录调整
```
- Imooc
    - node_modules/
    - bower_components/
    - views/
        - includes/
                - head.jade
                - header.jade
        - pages/
        	     - index.jade
        	     - detail.jade
        	     - admin.jade
        	     - list.jade
        - layout.jade
    - app.js
```

在`views/includes/head.jade`中添加`css`和'javascript'引用

```
link(href="/bootstrap/dist/css/bootstrap.min.css", rel="stylesheet")
script(src="/jquery/dist/jquery.min.js")
script(src="/bootstrap/dist/js/bootstrap.min.js")

```

在`views/includes/header.jade`中添加

```
.container
  .row
    .page-header
      h1= title
      small 重度科幻迷

```

在`views/layout.jade`中配置模板

```
doctype
html
  head
    meta(charset="utf-8")
    title #{title}
    include ./includes/head
  body
    include ./includes/header
    block content
    //- h1 #{title}

```

##2.编写视图
###2.1 index.jade

```
- Imooc
     - views
         - pages
             - index.jade
             
extends ../layout

block content
  .container
    .row
      each item in movies
        .col-md-2
          .thumbnail
            a(href="/movie/#{item._id}")
              img(src="#{item.poster}", alt="#{item.title}")
            .caption
              h3 #{item.title}
              p: a.btn.btn-primary(href="/movie/#{item._id}", role="button")
                观看预告片

```

###2.2 detail.jade

```
extends ../layout

block content
  .container
    .row
      .col-md-7
        embed(src="#{movie.flash}", allowFullScreen="true", quality="high", width="720", height="600", align="middle", type="application/x-shockwave-flash")
      .col-md-5
        dl.dl-horizontal
          dt 电影名字
          dd= movie.title
          dt 导演
          dd= movie.doctor
          dt 国家
          dd= movie.country
          dt 语言
          dd= movie.language
          dt 上映年份
          dd= movie.year
          dt 简介
          dd= movie.summary

```

###2.3 list.jade

```
extends ../layout

block content
  .container
    .row
      table.table.table-hover.table-bordered
        thead
          tr
            th 电影名字
            th 导演
            th 国家
            th 上映年份
            //-th 录入时间
            th 查看
            th 更新
            th 删除
        tbody
          each item in movies
            tr(class="item-id-#{item._id}")
              td #{item.title}
              td #{item.doctor}
              td #{item.country}
              td #{item.year}
              //-td #{moment(item.meta.createAt).format('MM/DD/YYYY')}
              td: a(target="_blank", href="../movie/#{item._id}") 查看
              td: a(target="_blank", href="../admin/update/#{item._id}") 修改
              td
                button.btn.btn-danger.del(type="button", data-id="#{item._id}") 删除

```

###2.4 admin.jade

```
extends ../layout

block content
  .container
    .row
      form.form-horizontal(method="post", action="/admin/movie/new")
        .form-group
          label.col-sm-2.control-label(for="inputTitle") 电影名字
          .col-sm-10
            input#inputTitle.form-control(type="text", name="movie[title]")
        .form-group
          label.col-sm-2.control-label(for="inputDoctor") 导演
          .col-sm-10
            input#inputDoctor.form-control(type="text", name="movie[doctor]", value="#{movie.doctor}")
        .form-group
          label.col-sm-2.control-label(for="inputCountry") 国家
          .col-sm-10
            input#inputCountry.form-control(type="text", name="movie[country]", value="#{movie.country}")
        .form-group
          label.col-sm-2.control-label(for="inputLanguage") 语种
          .col-sm-10
            input#inputLanguage.form-control(type="text", name="movie[language]", value="#{movie.language}")
        .form-group
          label.col-sm-2.control-label(for="inputPost") 海报地址
          .col-sm-10
            input#inputPost.form-control(type="text", name="movie[poster]", value="#{movie.poster}")
        .form-group
          label.col-sm-2.control-label(for="inputFlash") 片源地址
          .col-sm-10
            input#inputFlash.form-control(type="text", name="movie[flash]", value="#{movie.flash}")
        .form-group
          label.col-sm-2.control-label(for="inputYear") 上映年份
          .col-sm-10
            input#inputYear.form-control(type="text", name="movie[year]", value="#{movie.year}")
        .form-group
          label.col-sm-2.control-label(for="inputSummary") 电影简介
          .col-sm-10
            textarea#inputSummary.form-control(type="text", name="movie[summary]", value="#{movie.summary}")
        .form-group
          label.col-sm-offset-2.col-sm-10
          button.btn.btn-default(type='submit') 录入
```

##3.伪造数据
修改app.js，向对应的请回返回数据

###3.1 index

```
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
    }]
  })
})
```

###3.2 detail

```
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
```

###3.3 list

```
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
})
```

###3.4 admin

```
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
```