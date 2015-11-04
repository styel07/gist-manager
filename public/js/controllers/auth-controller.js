angular.module('gistApp')
  .controller('authController', [
    '$scope',
    '$routeParams',
    '$cookies',
    '$window',
    ($scope, $routeParams, $cookies, $window) => {
      $scope.createURL = '/#/create';
      $scope.editURL = '/#/edit';
      $scope.deleteURL = '/#/delete';

      $cookies.put('access_token', $routeParams.access_token);
      $window.location.href = '/dashboard/';
      console.log('You get a Cookie!', $cookies.get('access_token'));
    }
  ]);