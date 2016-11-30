angular.module('MyApp')
  .controller('HomeCtrl', function($scope, Location) {
    $scope.location = {}

    $scope.add = function () {
      Location.save($scope.location).then((res) => {
        window.location.reload();
      });
    }

    $scope.remove = function(id) {
      Location.delete(id).then((res) => {
        window.location.reload();
      })
    }

    $scope.index = Location.get;

    Location.get().then((res) => {
      $scope.listLocation = res.data;
    })

  });
