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
        $scope.displayGist = {};
        $scope.gists = [];
        $scope.GistService = GistService;
        $scope.cookies = userCookie;

        // gets all gists
        GistService.getGists(userCookie)
          .success((gists) => {
            $scope.gists = gists;
            $scope.displayGist = gists[0];
            $scope.display = (id) => {
              GistService.singleGist(userCookie, id)
              .success( (gist)=> {
                $scope.displayGist = gist;
              });
            }
          });
      } else {
        $window.location.href = '/#/login';
      }
    }
  ]);