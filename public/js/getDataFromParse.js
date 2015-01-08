Parse.initialize("DHPbawPXsk9VM697XtD0UNuYAuaxuxc8tEXoIquY", "nzM6oFs11Dh2RroQIUyiJQpgZ6ZLIieC7ts6UlhC");

var Products = Parse.Object.extend("Products");
var products = new Products();

var query = new Parse.Query(Products);


query.each(function(object) {
  console.log(object.get('story'));
});

