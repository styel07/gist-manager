angular.module('gistApp')
  .controller('authController', [
    '$scope',
    '$routeParams',
    '$cookies',
    '$window',
    ($scope, $routeParams, $cookies, $window) => {
      $scope.createURL = '/#/create';
      $cookies.put('access_token', $routeParams.access_token);
      $window.location.href = '/#/dashboard/';
    }
  ]);