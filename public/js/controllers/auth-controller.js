angular.module('gistApp')
  .controller('authController', [
    '$scope',
    '$routeParams',
    '$cookies',
    ($scope, $routeParams, $cookies) => {
      $scope.createURL = '/#/create';
      $scope.createURL = '/#/edit';
      $scope.deleteURL = '/#/delete';
      $cookies.put('access_token', $routeParams.access_token);
      console.log($cookies.get('access_token'));
      // $window.location.href = '/#/';
    }
  ]);