var serve = require('koa-static');
var koa = require('koa');
var mount = require('koa-mount');
var app = koa();
var fs = require('co-fs');
var views = require('co-views');
var router = require('koa-router');
var Parse = require('koa-parse-restapi');
var keys = require('./key');
var meepbee = new Parse(keys.appId, keys.restKey);
var render = views('.', {
  default: 'jade'
});

app.use(router(app));
app.use(mount('/public', serve(__dirname + '/public')));

app.get('/', function* (next) {
  var html =
    yield render('src/home/index.jade');
  this.body = html;
});

app.get('/:productId', function* (next) {
  var productId = this.params.productId;

  var product =
    yield meepbee.classes('Products').get(productId, {
      include: 'seller'
    });
  product = JSON.parse(product.body);
  product.comments = [];
  product.like = []

  var comments =
    yield meepbee.classes('Comments').getAll({
      include: 'commenter'
    });
  comments = JSON.parse(comments.body).results;
  comments.forEach(function (comment) {
    if (comment.product.objectId === productId) {
      product.comments.push(comment)
    }
  });

  var likes =
    yield meepbee.classes('Likes').getAll({
      include: 'likedUser'
    });
  likes = JSON.parse(likes.body).results;
  likes.forEach(function (like) {
    if (like.likedProduct.objectId === productId) {
      product.like.push(like);
    }
  });

  var html =
    yield render('src/home/index.jade', {
      product: JSON.stringify(product)
    });
  this.body = html;
});

console.log('Hey sailor, Your server is on at port: 9000');
app.listen(9000);
