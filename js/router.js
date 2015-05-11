define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {

  var Router = Backbone.Router.extend({
    routes: {
		//括号里表示可有可无
		'(!/)': 'news_',
		'(!/)news/:year/:month/:day': 'news',
		'*defAction': 'defAction'
	},
	
    news_: function(year, month, day) {
		alert("初始化");
    },

    news: function(year, month, day) {
		require([
			'views/news'
		], function(newsView) {
			newsView.render(year, month, day);
		});
    },

    defAction: function(permalink) {
      console.log('[router] 404: ' + permalink);
    }
  });

  return new Router();
})
