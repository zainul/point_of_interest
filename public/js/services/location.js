angular.module('MyApp')
  .factory('Location', function($http) {
    return {
      save: function(data) {
        return $http.post('/api/locations', data);
      }
    };
  });
