angular.module('gistApp')
  .controller('createController', [
    '$scope',
    '$cookies',
    'GistService',
    '$window',
    ($scope, $cookies, GistService, $window, authorized) => {
      var userCookie = $cookies.get('access_token');

       $scope.process_done = () => {
        $window.location.href = '/#/dashboard';
      };

      if (userCookie) {
        $scope.gists = [];
        $scope.GistService = GistService;
        $scope.cookies = userCookie;
      } else {
        $window.location.href = '/#/login';
      }
    }
  ]);