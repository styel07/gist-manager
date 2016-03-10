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

              for (key in gist.files) {
                console.log('aksjdakshdkahsd23', key);
              }

              console.log('this', gist);
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
        console.log('not logged in');
        $window.location.href = '/';
      }
    }
  ]);