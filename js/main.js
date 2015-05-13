//OVER~
require.config({
  paths: {
    'jquery': [
      'http://cdn.staticfile.org/jquery/2.1.1-rc2/jquery.min',
      'vendor/jquery-2.1.1.min'
    ],
    'underscore': [
      'http://cdn.staticfile.org/underscore.js/1.6.0/underscore-min',
      'vendor/underscore-1.6.0.min'
    ],
    'backbone': [
      'http://cdn.staticfile.org/backbone.js/1.1.2/backbone-min',
      'vendor/backbone-1.1.2.min'
    ],
    'then': 'vendor/then-0.1.0.min',
    'text': 'vendor/text'
  }
});
//先定义require的基本信息,先说明jquery和underscore和backbone是什么玩意儿。以后就知道了

//加载现在文件夹里的app.js
//这里要说明一下 define定义的模块可以被其他调用 require却不行

require([
  'app'
], function(App){
  App.initialize();
});
