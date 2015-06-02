define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'swiper'
], function($, _, Backbone, router) {
  	Backbone.swipering = false;
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
				if(typeof(Backbone.swiperH) != "undefined"){
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
						Backbone.swipering = true;
						Backbone.swipering_number = that.datetoString(that.curdate);
						if(lastnumber > swiper.translate){
							that.todateswiper(swiper,1);
						}
						else{
							that.todateswiper(swiper,-1);
						}
						lastnumber = swiper.translate;
					}
				});
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
			nextdate.setDate(nextdate.getDate() + date * 2);
			nextdate = that.datetoString(nextdate);
			if(!$("#content" + nextdate).length){
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
			Backbone.swipering_ = true;
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
