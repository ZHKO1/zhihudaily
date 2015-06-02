define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {

  var Router = Backbone.Router.extend({
    routes: {
		'(!/)': 'news',
		'(!/)news/:year/:month/:day': 'news',
		'*defAction': 'defAction'
	},
	
    news: function(year, month, day) {
			var that = this;
			if(Backbone.swipering_){
				Backbone.swipering_ = false;
				require([
					'views/news'
				], function(newsView) {
					if(Backbone.swipering){
						newsView.setElement("#content" + year + month + day);
						if($("#content" + year + month + day).length){
								if($("#content" + year + month + day)[0].children.length == 1){
								newsView.render(year, month, day);
							}
						}
						
					}
					else{
						if(year == null && month == null && day == null){
							var date = new Date();
						}
						else{
							var date = new Date(year,month-1,day);
						}
						newsView.setElement("#content" + that.datetoString(date));
						newsView.render(year, month, day);
					}					
				});
			}
			else{
				require([
					'views/news'
				], function(newsView) {
					Backbone.swipering = false;
					Backbone.swipering_ = true;
					
					var index_div = document.getElementsByTagName("body")[0].children[0].children[0].children[1].children[1];
					index_div.id = "content" + year + month + day;
					
					var index_div = document.getElementsByTagName("body")[0].children[0].children[0].children[0].children[1];
					var preday = new Date(year,month - 1,day);
					preday.setDate(preday.getDate() - 1);
						
					index_div.id = "content" + that.datetoString(preday);
					
					var index_div = document.getElementsByTagName("body")[0].children[0].children[0].children[2].children[1];
					var nextday = new Date(year,month - 1,day);
					nextday.setDate(nextday.getDate() + 1);
					index_div.id = "content" + that.datetoString(nextday);
					
					newsView.setElement("#content" + year + month + day);
					newsView.render(year, month, day);
				});
			}
    },
		
		datetoString:function(date){
			return date.getFullYear().toString() + (date.getMonth()+1).toString() + date.getDate().toString();
		},
	

    defAction: function(permalink) {
      console.log('[router] 404: ' + permalink);
    }
  });

  return new Router();
})
