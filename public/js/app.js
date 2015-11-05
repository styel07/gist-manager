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
    templateUrl : 'views/default.html'
  })
  .when('/login', {
    controller : 'loginController',
    templateUrl : 'views/login.html'
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
  $locationProvider.html5Mode(true);
})
.run(['$rootScope', ($rootScope) => {
  // run things
}]);