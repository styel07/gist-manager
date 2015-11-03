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
    controller : 'authController',
    templateUrl : 'views/default.html'
  })
  .when('/create', {
    controller : 'createController',
    templateUrl : 'views/createGist.html'
  })
  .when('/edit/:id', {
    controller : 'editController',
    templateUrl : 'views/editGist.html'
  })
  .otherwise({
    templateUrl : 'views/404.html'
  });
})
.run(['$rootScope', '$injector', ($rootScope, $injector) => {
  // run things
  $injector.get('$http').defaults.tranformRequest = (data, headersGetter) => {
    console.log(data);
    console.log(headersGetter);
  }
}]);