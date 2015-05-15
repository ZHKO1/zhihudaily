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
	Backbone.swipering = false;
	Backbone.swipering_number = 1;
	Backbone.swiper_pages = {};
	
  var NavView = Backbone.View.extend({
    el: '#nav',
	
	template: _.template($('#swiper-template').html()),
	
	events: {
      'click .prev': 'prevDay',
      'click .next': 'nextDay',
	  
    },
	initialize: function() {
		var that = this;
		
		var lastnumber = 0;
		var swiperH = new Swiper('.swiper-container-h', {
			paginationClickable: true,
			spaceBetween: 0,
			onSlideChangeEnd: function(swiper){
				console.log(lastnumber);
				console.log(swiper.translate);
				if(lastnumber > swiper.translate){
					$('.prev').trigger('click');
					Backbone.swipering = true;
					Backbone.swipering_number ++;
				}
				else{
					$('.next').trigger('click');
					Backbone.swipering = true;
					Backbone.swipering_number --;
				}
				lastnumber = swiper.translate;
				//alert(swiperH.activeIndex);
				//swiperH.activeIndex是当前页的索引号码
			}
		});
		
		//初始化时就产生前一页和后一页的界面 以备用户滑动操作读取下一页或者上一页的内容
		
		swiperH.prependSlide(this.template({row_id:'content' + (Backbone.swipering_number-1)}));
		swiperH.appendSlide(this.template({row_id:'content' + (Backbone.swipering_number+1)}));
		
		
		//开始尝试在空白页面上加载内容
		//首先必须确定当前的页 方便加载 如何确定？
		//那么我可以先尝试在其他页上加载
		//加载成功 剩下来就是
		//1.如何自动根据读者的滑动方向插入新的一页？
		//2.如何避免反复加载？
		
		
		this.curdate = new Date();
		this.listenTo(router, 'route:news', this.routeChanged);
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
