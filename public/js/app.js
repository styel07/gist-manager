angular.module('gistApp', [
  'ngRoute',
  'ngCookies'
]);

var gistApp = angular.module('gistApp');

gistApp.config( ($routeProvider) => {
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
  .when('/create', {
    controller : 'createController',
    templateUrl : 'views/createGist.html',
    resolve : {
      authorized : function ($q, OAuthService) {
        return $q.when(OAuthService.checkToken);
      }
    }
  })
  .when('/edit/:id', {
    controller : 'editController',
    templateUrl : 'views/editGist.html',
    resolve : {
      authorized : function ($q, OAuthService) {
        return $q.when(OAuthService.checkToken);
      }
    }
  })
  .otherwise({
    templateUrl : 'views/404.html'
  });
})
.run(['$rootScope', ($rootScope) => {
  // run things
}]);