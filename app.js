var serve = require('koa-static');
var koa = require('koa');
var mount = require('koa-mount');
var app = koa();
var fs = require('co-fs');
var views = require('co-views');
var render = views('.', {default: 'jade'});
var router = require('koa-router');
// var liveload = require('koa-liveload');
// var session = require('koa-session');

app.use(router(app));
app.use(mount('/public', serve(__dirname + '/public')));

// app.use(liveload(__dirname, {
//  includes: ['scss','jade']
// }))

// app.keys = ['secret', 'keys'];
// app.use(session());

app.get('/', function *(next) {
  var html = yield render('src/home/index.jade');
  this.status = 200;
  this.body = html;
});

console.log('Hey sailor, Your server is on at port: 9000');
app.listen(9000);
