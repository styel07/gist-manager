'use strict';
angular.module('gistApp')
  .service('OAuthService', ['$http', '$cookies', function($http, $cookies){
    var self = this;

    // this endpoint points from express to angular
    this.endpoint = 'http://localhost:3000/auth/login';

    this.getUrl = () => {
      return $http.get(self.endpoint);
    };

  }])
  .service('GistService', ['$http', function($http){
    var self = this;
    this.endpoint = 'http://localhost:3000/gists';

    this.getGists = (cookie) => {
      return $http({
        method : 'GET',
        url : self.endpoint,
        headers : {
          authorization : 'Bearer ' +  cookie
        }
      });
    };

    this.postGists = (cookie, input) => {
      var data = {
            description : input.description,
            public : true,
            files : {}
          };

      data.files[input.filename] = { content : input.fileContent };

      return $http({
        method : 'POST',
        url : self.endpoint,
        data : data,
        headers : {
          authorization : 'Bearer ' +  cookie
        }
      });
    };

    this.singleGist = (cookie, id) => {
      return $http({
        method : 'GET',
        url : self.endpoint + '/' + id,
        headers : {
          authorization : 'Bearer ' + cookie
        }
      });
    };

    this.editGist = (cookie, input, id) => {
      var data = {
            description : input.description,
            public : true,
            files : {}
          };

      data.files[input.filename] = { content : input.fileContent };

      return $http({
        method : 'PATCH',
        url : self.endpoint + '/' + id,
        data : data,
        headers : {
          authorization : 'Bearer ' +  cookie
        }
      });
    };

    this.deleteGist = (cookie, id) => {
      return $http({
        method : 'DELETE',
        url : self.endpoint + '/' + id,
        headers : {
          authorization : 'Bearer ' +  cookie
        }
      });
    };

  }]);