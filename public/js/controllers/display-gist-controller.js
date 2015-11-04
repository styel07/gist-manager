angular.module('gistApp')
  .controller('displayController', [
    '$scope',
    '$cookies',
    'GistService',
    '$window',
    '$routeParams',
    ($scope, $cookies, GistService, $window, $routeParams) => {
      var userCookie = $cookies.get('access_token');
      if (userCookie) {
        console.log($routeParams);
        console.log($routeParams.gist_id);
        $scope.gist = {};
        $scope.gists = [];
        $scope.GistService = GistService;
        $scope.cookies = userCookie;

        // gets all gists
        GistService.getGists(userCookie)
          .success((gists) => {
            $scope.gists = gists;
          });

        // gets a single gist
        GistService.singleGist(userCookie, $routeParams.gist_id)
          .success((gist) => {
            $scope.gist = gist;
          });
      } else {
        $window.location.href = '/#/login';
      }
    }
  ]);