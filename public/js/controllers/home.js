angular.module('MyApp')
  .controller('HomeCtrl', function($scope, Location) {

    $scope.map = {};

    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay;
    var origin;
    var destinations = [];

    function calculateDistances() {
      var service = new google.maps.DistanceMatrixService();

      service.getDistanceMatrix({
        origins: [origin], //array of origins
        destinations: destinations, //array of destinations
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
      }, callback);
    }

    function callback(response, status) {
      if (status != google.maps.DistanceMatrixStatus.OK) {
        alert('Error was: ' + status);
      } else {

        //we only have one origin so there should only be one row
        var routes = response.rows[0];
        var sortable = [];

        var resultText = "Origin: <b>" + response.originAddresses + "</b><br/><br/>";

        resultText += "Estimate Travel and  Routes: <br/>";

        for (var i = routes.elements.length - 1; i >= 0; i--) {

          var rteLength = routes.elements[i].duration.value;

          var duration = routes.elements[i].duration.text;
          var distance = routes.elements[i].distance.text

          resultText += "<b>"+i+ " </b> To: <b>" + response.destinationAddresses[i] + "</b>, " + "Distance: <b>" + distance + "</b> Duration  <b>"+ duration +"</b>  <br/>";

          sortable.push([destinations[i], rteLength]);

        }

        //sort the result lengths from shortest to longest.
        sortable.sort(function(a, b) {
          return a[1] - b[1];
        });

        //build the waypoints.
        var waypoints = [];
        for (j = 0; j < sortable.length - 1; j++) {
          waypoints.push({
            location: sortable[j][0],
            stopover: true
          });
        }

        //start address == origin
        var start = origin;
        //end address is the furthest desitnation from the origin.
        var end = sortable[sortable.length - 1][0];
        //calculate the route with the waypoints
        calculateRoute(start, end, waypoints);
        //log the routes and duration.
        document.getElementById('routeExplanation').innerHTML = resultText;
      }
    }

    //Calculate the route of the shortest distance we found.
    function calculateRoute(start, end, waypoints) {
      var request = {
          origin: start,
          destination: end,
          waypoints: waypoints,
          optimizeWaypoints: true,
          travelMode: google.maps.TravelMode.DRIVING
      };
      directionsService.route(request, function (result, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
          }
      });
    }

    $scope.location = {}
    $scope.startPoint;

    Location.get().then((res) => {
      $scope.listLocation = res.data;
    })

    $scope.add = function() {
      Location.save($scope.location).then((res) => {
        window.location.reload();
      });
    }

    $scope.remove = function(id) {
      Location.delete(id).then((res) => {
        window.location.reload();
      })
    }

    $scope.showTimeTravel = function() {

      for (var i = 0; i < $scope.listLocation.locations.length; i++) {
        var locationObject = $scope.listLocation.locations[i];
        if (locationObject.code == $scope.startPoint) {
          origin = new google.maps.LatLng(locationObject.lat, locationObject.lang);

          directionsDisplay = new google.maps.DirectionsRenderer();

          var map = new google.maps.Map(document.getElementById('map_canvas'),{
              zoom: 18,
              center: origin,
              mapTypeId: google.maps.MapTypeId.ROADMAP
          });

          directionsDisplay.setMap(map);

        }else {

          var destination = new google.maps.LatLng(locationObject.lat, locationObject.lang);
          destinations.push(destination)

        }
      }

      calculateDistances();
    }

    $scope.index = Location.get;


  });
