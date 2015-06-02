define([
  'jquery',
  'underscore',
  'backbone',
  'collections/news'
], function($, _, Backbone, newsCollection) {

  var TitleView = Backbone.View.extend({
    el: '.header h1',
    initialize: function() {
      this.listenTo(newsCollection, 'date:changed', this.updateTitle); 
    },
    updateTitle: function(date) {
    }
  });
  return new TitleView();
})
