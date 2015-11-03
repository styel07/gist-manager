angular.module('gistApp')
  .controller('loginController', [
    '$scope',
    'OAuthService',
    ($scope, OAuthService) => {
      $scope.authURL = '';
      OAuthService.getUrl()
      .success((URL) => {
        $scope.authURL = URL;
      });
    }
  ]);