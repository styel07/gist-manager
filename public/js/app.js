angular.module('gistApp', [
  'ngRoute'
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
  .otherwise({
    templateUrl : 'views/404.html'
  });
})
.run(['$rootScope', ($rootScope) => {
  // run things

}]);