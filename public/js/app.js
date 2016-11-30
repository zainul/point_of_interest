var app = angular.module('MyApp', ['ngRoute'])
  .config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      })
      .when('/contact', {
        templateUrl: 'partials/location.html',
        controller: 'LocationCtrl'
      })
      .otherwise({
        templateUrl: 'partials/404.html'
      });
  })
  .run(function($rootScope, $window) {

  });


app.directive('map', function() {
    return {
        restrict: 'E',
        replace: true,
        template: '<div></div>',
        link: function(scope, element, attrs) {
            console.log(scope);

            var myOptions = {
                zoom: 18,
                center: new google.maps.LatLng(-6.218658, 106.802645),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById(attrs.id), myOptions);

            google.maps.event.addListener(map, 'click', function(e) {
                scope.$apply(function() {
                    addMarker({
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng()
                  });
                });

            }); // end click listener

            window.add = function() {
              scope.location.name = document.getElementById("name").value;
              scope.location.description = document.getElementById("description").value;
              scope.add();
            }

            addMarker= function(pos){
               var myLatlng = new google.maps.LatLng(pos.lat,pos.lng);
               var marker = new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                    title:"Hello World!"
                });

                scope.location.lat = pos.lat;
                scope.location.lang = pos.lng;

                // info window
                var contentString = '<div id="content">'+
                  '<h3 class="col-sm-12">Information</h3>'+
                  '<div id="bodyContent">'+
                    '<div>'+
                      '<div class="col-sm-12">'+
                        '<b>Name</b>'+
                        '<input type="text" class="form-control" id="name"/>'+
                      '</div>'+

                      '<div class="col-sm-12">'+
                        '<b>Description</b>'+
                        '<textarea rows="5" class="form-control" id="description"></textarea>'+
                      '</div>' +
                      ''+
                      '<div class="col-sm-12">'+
                        '<br/><button class="btn btn-success" onclick="add()">Save</button>'+
                        ''+
                      '</div>'
                    '</div>'+
                  '</div>'+
                '</div>';

                var infowindow = new google.maps.InfoWindow({
                  content: contentString
                });

                infowindow.open(map, marker);
                // marker.addListener('click', function() {
                // });
            } //end addMarker

        }
    };
});

function MapCtrl($scope) {

    $scope.mapPin = 'No pin set yet';

}
