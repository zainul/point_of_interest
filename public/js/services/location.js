angular.module('MyApp')
  .factory('Location', function($http) {
    return {
      save: function(data) {
        return $http.post('/api/locations', data);
      },
      get: function() {
        return $http.get('/api/locations');
      },
      delete: function(id) {
        return $http.delete('/api/locations/' + id);
      }
    };
  });
