angular.module('gistApp')
  .controller('createController', [
    '$scope',
    '$cookies',
    'GistService',
    ($scope, $cookies, GistService) => {
      var userCookie = $cookies.get('access_token');
      $scope.gists = [];
      GistService.getGists(userCookie)
        .success((gists) => {
          $scope.gists = gists;
        });
    }
  ]);