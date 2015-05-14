define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'swiper'
], function($, _, Backbone, router) {
  //先加载router
  //这里负责对于操控模块的注册
  //比如click .pre click .next 还有就是点击的事情

  var NavView = Backbone.View.extend({
    el: '#nav',
		
    events: {
      'click .prev': 'prevDay',
      'click .next': 'nextDay'
    },
	initialize: function() {
		var that = this;
		var lastnumber = 0;
	  var swiperH = new Swiper('.swiper-container-h', {
			paginationClickable: true,
			spaceBetween: 20,
			onSlideChangeEnd: function(swiper){
				console.log(lastnumber);
				console.log(swiper.translate);
				
				if(lastnumber > swiper.translate){
					$('.prev').trigger('click');
				}
				else{
					$('.next').trigger('click');
				}
				lastnumber = swiper.translate;
			}
		});
		
    this.curdate = new Date();
    this.listenTo(router, 'route:news', this.routeChanged);
		
		/*
    $('body').keydown(function(e) {
      if(e.which == 37) { // left keypress
         $('.prev').trigger('click');
      } else if(e.which == 39) { // right keypress
         $('.next').trigger('click');
      }
    });
		*/
	},
    
	routeChanged: function(year, month, day) {
		date = new Date(year, month - 1, day);
		if (!_.isNaN(date.getTime())) {
			this.curdate = date;
		}
	},
	
	navigateDay: function(th) {
		var date = new Date(this.curdate);
		date.setDate(date.getDate() + th);

		var route = '#!/news/'
			+ date.getFullYear() + '/'
			+ (date.getMonth() + 1) + '/'
			+ date.getDate();
		//???????????
		//问题：如果我去掉
		//this.listenTo(router, 'route:news', this.routeChanged);
		//那么剩下来负责跳转的就是router.navigate(route, {trigger: true});这段代码
		//这段代码有什么用？
		router.navigate(route, {trigger: true});
	},
	
	prevDay: function() {
		this.navigateDay(1);
	},
	
	nextDay: function() {
		this.navigateDay(-1);
	}
  });

  return new NavView();
})
