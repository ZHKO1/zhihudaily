define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {
  //最终加载的起点
  var NewsModel = Backbone.Model.extend({
    defaults: {
      image: '',
      thumbnail: 'http://7xin0n.com1.z0.glb.clouddn.com/default.png',
      type: 0,
      id: 0,
      share_url: '',
      title: ''
    }
  });
  
  return NewsModel;
})
