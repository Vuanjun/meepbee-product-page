var serve = require('koa-static');
var koa = require('koa');
var mount = require('koa-mount');
var app = koa();
var fs = require('co-fs');
var views = require('co-views');
var render = views('.', {default: 'jade'});
var router = require('koa-router');
var Parse = require('parse-restapi');
var keys = require('./key');
var meepbee = new Parse(keys.appId, keys.restKey);
var thunkify = require('thunkify');
var getObject = thunkify(meepbee.classes('Products').get);

app.use(router(app));
app.use(mount('/public', serve(__dirname + '/public')));


app.get('/', function* (next) {
    var html = yield render('src/home/index.jade');
    this.body = html;
});

app.get('/:productId', function* (next) {
    var productId = this.params.productId;
    var obj = yield getObject(productId);
    var html = yield render('src/home/index.jade', {product: obj[0].body});
    this.body = html;
    //this.body = obj[0].body;
});

console.log('Hey sailor, Your server is on at port: 9000');
app.listen(9000);
