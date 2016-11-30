angular.module('MyApp')
  .controller('HomeCtrl', function($scope, Location) {
    $scope.location = {}

    $scope.add = function () {
      Location.save($scope.location);
    }
  });
