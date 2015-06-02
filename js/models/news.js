define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {
  var NewsModel = Backbone.Model.extend({
    defaults: {
      image: '',
      thumbnail: 'http://7xin0n.com1.z0.glb.clouddn.com/default.png',
      id: 0,
      share_url: '',
      title: ''
    }
  });
  return NewsModel;
});