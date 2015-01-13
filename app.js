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
var getProduct = thunkify(meepbee.classes('Products').getProduct);
var getComment = thunkify(meepbee.classes('Comments').getAll);
var getLike = thunkify(meepbee.classes('Likes').getLike);
var getUser = thunkify(meepbee.users().get);


app.use(router(app));
app.use(mount('/public', serve(__dirname + '/public')));

app.get('/', function* (next) {
  var html = yield render('src/home/index.jade');
  this.body = html;
});

app.get('/:productId', function* (next) {
  var productId = this.params.productId;

  var product = yield getProduct(productId);
  product = JSON.parse(product[0].body);
  product.comments = [];
  product.like = []


  var comments = yield getComment();
  comments = JSON.parse(comments[0].body).results;
  comments.forEach(function (comment) {
    if (comment.product.objectId === productId) {
      product.comments.push(comment)
    }
  });

  var likes = yield getLike();
  likes = JSON.parse(likes[0].body).results;
  likes.forEach(function (like) {
    if (like.likedProduct.objectId === productId) {
      product.like.push(like);
    }
  });

  var html = yield render('src/home/index.jade', {
    product: JSON.stringify(product)
  });
  this.body = html;
});

console.log('Hey sailor, Your server is on at port: 9000');
app.listen(9000);
