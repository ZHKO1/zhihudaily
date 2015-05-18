define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {

  var Router = Backbone.Router.extend({
    routes: {
		//括号里表示可有可无
		'(!/)': 'news',
		'(!/)news/:year/:month/:day': 'news',
		'*defAction': 'defAction'
	},
	
    news: function(year, month, day) {
			// 如何判定这个事件是滑动引发的还是Hash直接修改的？
			// 在nav.js里的navigateDay函数加个参数判断？
			// 感觉很蠢....但是事到如今也没别的办法了
			// 不作死就不会死 我已经混乱了
			// 毕竟不会设计模式的硬伤
			// 我自己都不知道swipering_和swipering都是什么作用
			var that = this;
			if(Backbone.swipering_){
				Backbone.swipering_ = false;
				require([
					'views/news'
				], function(newsView) {
					if(Backbone.swipering){
						//如果已经滑动过了 就根据目标DIV里是loading还是已经加载过的避免重复的网络请求。
						newsView.setElement("#content" + year + month + day);
						if($("#content" + year + month + day).length){
								if($("#content" + year + month + day)[0].children.length == 1){
								console.log($("#content" + year + month + day)[0].children);
								console.log($("#content" + year + month + day)[0].children.length);
								newsView.render(year, month, day);
							}
						}
						
					}
					else{
						newsView.setElement("#content" + year + month + day);
						newsView.render(year, month, day);
					}					
				});
			}
			else{
				//这里是改变Hash的关键
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
