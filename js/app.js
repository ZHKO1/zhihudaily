define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {
  var App = {
    initialize: function() {
      require([
        'views/nav'
      ], function() {
        Backbone.history.start();
		//先实例化页面记载的路由器 在发动
      });
    }
  };
  return App;
});
