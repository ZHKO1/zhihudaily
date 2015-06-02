define([
  'jquery',
  'underscore',
  'backbone',

], function($, _, Backbone) {
	var App = {
		initialize: function() {
			require([
			'views/nav'
			], function() {
			Backbone.history.start();
			});
		}
	};
	return App;
});
