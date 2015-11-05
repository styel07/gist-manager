angular.module('gistApp', [
  'ngRoute',
  'ngCookies'
]);

var gistApp = angular.module('gistApp');

gistApp.config( ($routeProvider, $locationProvider) => {
  // auth

  // routes
  $routeProvider
  .when('/', {
    templateUrl : 'views/default.html',
    controller : 'loginController'
  })
  .when('/auth_token/:access_token', {
    controller : 'authController',
    templateUrl : 'views/default.html'
  })
  .when('/dashboard/', {
    controller : 'displayController',
    templateUrl : 'views/dashboard.html'
  })
  .when('/create', {
    controller : 'createController',
    templateUrl : 'views/createGist.html'
  })
  .when('/edit/:gist_id', {
    controller : 'editController',
    templateUrl : 'views/editGist.html'
  })
  .otherwise({
    templateUrl : 'views/404.html'
  });

  // location
  $locationProvider.html5Mode({
    enabled : true,
    requireBase : false
  });
})
.run(['$rootScope', ($rootScope) => {
  // run things
}]);