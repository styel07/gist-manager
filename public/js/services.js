angular.module('gistApp')
  .service('OAuthService', ['$http', function($http){
    var self = this;

    // this endpoint points from express to angular
    this.endpoint = 'http://localhost:3000/auth/login';

    this.getUrl = () => {
      return $http.get(self.endpoint);
    };

  }]);