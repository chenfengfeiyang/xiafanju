var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));//视图文件的目录，存放模板文件
app.set('view engine', 'ejs');//视图模板引擎  ejs

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));//路由中没有路径会在静态配置文件中查找

app.use('/', index);
app.use('/users', users);

// var users = {
//     'byvoid' : {
//         name:'carbo',
//         website:'http://www.xiafanju.com'
//     }
// };
// app.all('/user/:username',function (req, res, next) {
//     if(users[req.params.username]){
//         next();
//     }else{
//         next(new Error(req.params.username + "没有这个用户"));
//     }
// });
// app.get('/user/:username',function (req, res) {
//     res.send(JSON.stringify(users[req.params.username]));
// });
// app.put('/user/:username',function (req, res) {
//     res.send('done')
// })

app.get('/list',function (req, res ) {
    res.render('list',{
      title : 'list',
      items : [1991,'angular','express','node','MongoDB']
    })
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
