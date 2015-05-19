//OVER~
define([
  'jquery',
  'underscore',
  'backbone',

], function($, _, Backbone) {
	//console.log(swiper)
	var App = {
		initialize: function() {
			//先加载nav.js 运行遍nav.js里面的所有数据
			require([
			'views/nav'
			], function() {
			//？？？？？？？？？？？
			//对于Backbone.history还是不明觉厉
			Backbone.history.start();
			//先实例化页面记载的路由器 在发动
			});
		}
	};
	return App;
});
