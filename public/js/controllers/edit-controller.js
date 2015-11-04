angular.module('gistApp')
  .controller('editController', [
    '$scope',
    '$cookies',
    'GistService',
    '$window',
    '$routeParams',
    ($scope, $cookies, GistService, $window, $routeParams) => {
      var userCookie = $cookies.get('access_token');
      $scope.edit_gist = {};

      $scope.GistService = GistService;
      $scope.cookies = userCookie;
      $scope.gist_id = $routeParams.gist_id;

      if (userCookie) {
        GistService.singleGist(userCookie, $routeParams.gist_id)
          .success((gist) => {
            console.log(gist);
            var filesArray = [];
            var files = gist.files;

            for (var file in files) {
              filesArray.push(files[file]);
            }
            $scope.edit_gist = {
              filename : filesArray[0].filename,
              description : gist.description,
              fileContent : filesArray[0].content
            };
          });
      } else {
        $window.location.href = '/#/login';
      }
    }
  ]);