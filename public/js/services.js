'use strict';
angular.module('gistApp')
  .service('OAuthService', ['$http', '$cookies', function($http, $cookies){
    var self = this;

    // this endpoint points from express to angular
    this.endpoint = 'http://localhost:3000/auth/login';

    this.getUrl = () => {
      return $http.get(self.endpoint);
    };

    this.checkToken = () => {
      if ($cookies.get('access_token')) {
        return true;
      } else {
        return false;
      }
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
    }
  }]);