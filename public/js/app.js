angular.module('gistApp', [
  'ngRoute',
  'ngCookies'
]);

var gistApp = angular.module('gistApp');

gistApp.config( ($routeProvider) => {
  // routes
  $routeProvider
  .when('/', {
    templateUrl : 'views/default.html'
  })
  .when('/login', {
    templateUrl : 'views/login.html',
    controller : 'loginController'
  })
  .when('/auth_token/:access_token', {
    controller : 'authController'
  })
  .otherwise({
    templateUrl : 'views/404.html'
  });
})
.run(['$rootScope', ($rootScope) => {
  // run things

}]);