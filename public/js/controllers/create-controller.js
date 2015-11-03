angular.module('gistApp')
  .controller('createController', [
    '$scope',
    '$cookies',
    ($scope, $cookies) => {
      $cookies.put('access_token', $routeParams.access_token);
    }
  ]);