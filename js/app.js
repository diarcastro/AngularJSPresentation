var app = angular.module('NgPresentation',['ngRoute','ngAnimate'])
.config(['$routeProvider',function($routeProvider){
    $routeProvider
    .when('/home',{
      templateUrl:'partials/home.html',
      controller:'ContentController'
    }).
    when('/mvc',{
      templateUrl:'partials/1-mvc.html',
      controller:'ContentController'
    }).
    when('/angular',{
      templateUrl:'partials/2-angular.html',
      controller:'ContentController'
    }).
    when('/directivas',{
      templateUrl:'partials/3-directivas.html',
      controller:'ContentController'
    }).
    when('/funciones',{
      templateUrl:'partials/4-funciones.html',
      controller:'ContentController'
    }).
    when('/demo',{
      templateUrl:'partials/5-demo.html',
      controller:'ContentController'
    }).
    when('/finish',{
      templateUrl:'partials/6-finish.html',
      controller:'ContentController'
    }).
    otherwise({
      redirectTo:'/home'
    });
  }])
.controller('BaseController',['$scope','$route',function BaseController($scope,$route){
    var pages = ['/home','/mvc','/angular','/directivas','/funciones','/demo','/finish'],
    actualIndex = 0,
    lWatcher = $('a#linkWatcher').off('keyup',_navigate).on('keyup',_navigate),
    progress = $('div.progress .progress-bar');
    ;
    $(document).off('keyup',_documentClick).on('keyup',_navigate);
//    $(document).on('click',_documentClick).on('click',_documentClick);

    function _documentClick(e){
      e.preventDefault();
      e.stopPropagation();
      var half = $(window).width() / 2;
      if(e.pageX > half)_changePage(1);
      else _changePage(-1);
    }
    $scope.$on('$viewContentLoaded',function(){
      var cPath = $route.current.$$route.originalPath;
      if(pages.indexOf(cPath) != -1){
        actualIndex = pages.indexOf(cPath);
      }else actualIndex = 0;
//      lWatcher[0].focus();
//        $(document)[0].focus();
      _refreshProgressWidth();
      $('pre code').each(function(i,block){
        hljs.highlightBlock(block);
      });
    });
    $scope.navigateTo = function(path){
      document.location.href = '#' + (path.indexOf('/') != 1 ? path : '/' + path);
    };
    function _refreshProgressWidth(){
      var percent = (actualIndex * 100) / (pages.length - 1);
      progress.width(percent + '%');
    }
    ;
    function _changePage(number){
      var aux = actualIndex + number;
      if(pages[aux]){
        $scope.navigateTo(pages[aux]);
      }
      return true;
    }
    function _navigate(e){
      e.preventDefault();
      e.stopPropagation();
      switch(e.keyCode){
        case 39:
          return _changePage(1);
        case 37:
          return _changePage(-1);
      }
    }
  }]);
app.controller('ContentController',['$scope','$route',function BaseController($scope,$route){

    $scope.logos = ['backbone','ember','angular'];
//    $scope.mvcFrameworks = [
//      {name:'Backbone',link:'http://documentcloud.github.com/backbone/'},
//      {name:'Ember',link:'http://emberjs.com/'},
//      {name:'Angularjs',link:'http://angularjs.org/'},
//      {name:'CanJS',link:'http://canjs.us/'},
//      {name:'PureMVC',link:'https://github.com/PureMVC/puremvc-js-multicore-framework/wiki'}
//    ];
  }
]);