angular.module('gistApp')
  .controller('createController', [
    '$scope',
    '$cookies',
    'GistService',
    '$window',
    ($scope, $cookies, GistService, $window, authorized) => {
      var userCookie = $cookies.get('access_token');
      if (userCookie) {
        $scope.gists = [];
        $scope.GistService = GistService;
        $scope.cookies = userCookie;
      } else {
        $window.location.href = '/#/login';
      }
    }
  ]);