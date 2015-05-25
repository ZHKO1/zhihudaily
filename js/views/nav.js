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
	Backbone.swipering = false; //来判断是否是滑动状态
	Backbone.swipering_ = true;
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
		that.curdate = new Date();
		that.listenTo(router, 'route:news', this.routeChanged);
		
		//剩下最后三个问题
		//1.如果快速滑动切换的话 100%出错 比如不能切换到下一页 难度：4星
		//2.如果直接改HASH的话 就由于找不到相应DIV 所以跟没有一样的感觉 难度：3星
		//3.最后也是决定这个毕业设计是否完美的一个功能 点击查看内容再返回
		//由于涉及到了太多东 修改python爬虫就得大出血
		//时间已经不允许我再修改下去了 顶多就是前两个完成而已。
		//还得再接着写毕业论文
		
	},

	datetoString:function(date){
		return date.getFullYear().toString() + (date.getMonth()+1).toString() + date.getDate().toString();
	},

	routeChanged: function(year, month, day) {
		var that = this;
		that.swiperlock = false;
		date = new Date(year, month - 1, day);
		if (!_.isNaN(date.getTime())) {
			this.curdate = date;
		}

		if(!Backbone.swipering){
			console.log("由router:new事件发动");
			if(typeof(Backbone.swiperH) != "undefined"){
			//	console.log("此时开始清掉多余的两页");
			//	Backbone.swiperH.removeSlide([0, 2]);
			}
			
			that.index_div = document.getElementsByTagName("body")[0].children[0].children[0].children[0].children[1].children[0];
			Backbone.swipering_number = that.datetoString(that.curdate);
			that.index_div.id = "content" + Backbone.swipering_number;
			

			var lastnumber = 0;
			Backbone.swiperH = new Swiper('.swiper-container-h', {
				paginationClickable: true,
				spaceBetween: 0,
				onInit: function(swiper){
			    	$('body').keydown(function(e) {
				        if(e.which == 37) { // left keypress
				        	if(!that.swiperlock)
				           	swiper.slidePrev();
				        } else if(e.which == 39) { // right keypress
				           	if(!that.swiperlock)
				           	swiper.slideNext();
				        }
			      	});
			    },

				onSlideChangeStart: function(swiper){
					swiper.detachEvents();
					that.swiperlock = true;
				},
				onSlideChangeEnd: function(swiper){
					swiper.attachEvents();
					that.swiperlock = false;
				
					//console.log("OVER");
					//console.log(that.curdate);
					
					Backbone.swipering = true;
					Backbone.swipering_number = that.datetoString(that.curdate);
					
					if(lastnumber > swiper.translate){
						that.todateswiper(swiper,1);
					}
					else{
						that.todateswiper(swiper,-1);
						/*
						$('.next').trigger('click');
						var  nextdate = new Date(that.curdate);
						nextdate.setDate(that.curdate.getDate() - 1);
						nextdate = that.datetoString(nextdate);

						if(!$("#content" + nextdate).length){
							swiper.prependSlide(that.template({row_id:'content' + nextdate}));
						}
						swiper.removeSlide(3);
						*/
					}
					lastnumber = swiper.translate;
					
					//alert(swiperH.activeIndex);
					//swiperH.activeIndex是当前页的索引号码
				}
			});
			//Backbone.swiperH.appendSlide(that.template({row_id:'content' + year + month +day}));
						
			//初始化时就产生前一页和后一页的界面 以备用户滑动操作读取下一页或者上一页的内容
			
			var  nextdate = new Date(that.curdate);
			var  predate = new Date(that.curdate);

			predate.setDate(that.curdate.getDate() - 1);
			
			nextdate.setDate(that.curdate.getDate() + 1);
			
			predate = that.datetoString(predate);
			nextdate = that.datetoString(nextdate);

					
			Backbone.swiperH.prependSlide(this.template({row_id:'content' + predate}));
			Backbone.swiperH.appendSlide(this.template({row_id:'content' + nextdate}));
		}
		
	},
	
	todateswiper:function(swiper,date){
		var that = this;
		var  nextdate = new Date(that.curdate);
		if(date == 1){
			$('.prev').trigger('click');
		}
		else{
			$('.next').trigger('click');
		}
		nextdate.setDate(that.curdate.getDate() + date);
		
		nextdate = that.datetoString(nextdate);
		
		if(!$("#content" + date).length){
			if(date == 1){
				swiper.appendSlide(that.template({row_id:'content' + nextdate}));	
				swiper.removeSlide(0);
			}
			if(date == -1){
				swiper.prependSlide(that.template({row_id:'content' + nextdate}));
				swiper.removeSlide(3);
			}
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
		console.log("navigateDay-function:" + route);
		
		Backbone.swipering_ = true;
		router.navigate(route, {trigger: true});
	},
	
	prevDay: function() {
		console.log("prevDate");
		this.navigateDay(1);
	},
	
	nextDay: function() {
		console.log("nextDate");
		this.navigateDay(-1);
	}
  });

  return new NavView();
})
