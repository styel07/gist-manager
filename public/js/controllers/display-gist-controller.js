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
        $scope.displayGist = {};
        $scope.gists = [];
        $scope.GistService = GistService;
        $scope.cookies = userCookie;

        // gets all gists
        GistService.getGists(userCookie)
          .success((gists) => {
            $scope.gists = gists;

            // gets a single gist in the array
            GistService.singleGist(userCookie, gists[0].id)
            .success( (gist) => {
              $scope.displayGist = gist;
            });

            $scope.display = (id) => {
              GistService.singleGist(userCookie, id)
              .success( (gist)=> {
                $scope.displayGist = gist;
              });
            };
          });
      } else {
        $window.location.href = '/#/';
      }
    }
  ]);