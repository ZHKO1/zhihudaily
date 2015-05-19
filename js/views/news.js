define([
  'jquery',
  'underscore',
  'backbone',
  'collections/news',
  'views/title'
], function($, _, Backbone, newsCollection) {
  //先加载'collections/news'和'views/title'
  
  var IndexView = Backbone.View.extend({
    el: '#content1',
    
    template: _.template($('#news-template').html()),

    initialize: function() {
      this.renderLoading();
      this.listenTo(newsCollection, 'reset', this.updateNews);
    },
    
    updateNews: function(collection) {
		var that = this;
		setTimeout(function(){
			that.$el.html('');
			for (var i = 0, l = collection.length; i < l; i++) {
				var model = collection.at(i);
				model.attributes.thumbnail = model.attributes.thumbnail + "?imageView2/1/w/240/q/30";
				that.$el.append(that.template(model.attributes));
			}
		}, 0 );
		
		return that;
    },

    render: function(year, month, day) {
      this.renderLoading();
      newsCollection.fetch({
        reset: true,
        url: newsCollection.url(year, month, day),
        error: this.renderError.bind(this)
      });
      
      return this;
    },
    
    renderError: function(collection, resp, options) {
      newsCollection.trigger('date:changed');
	  
      if (resp.status === 404) {
        this.$el.html(
          '<div class="error">\
            <h2>Not Found.</h2>\
            <p>呀, 等等呗, 这天的数据还没同步呢!</p>\
          </div>');
      } else {
        this.$el.html(
          '<div class="error">\
            <h2>Whoops.</h2>\
            <p>嗯, 检查你的网络先~</p>\
          </div>');
      }
    },
    
    renderLoading: function() {
      //this.$el.html('<div class="loading"><div class="loading"><div class="spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div></div></div>');
    }
  });

  return new IndexView();
})
