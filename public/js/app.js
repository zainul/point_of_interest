var app = angular.module('MyApp', ['ngRoute'])
  .config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
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
            var myOptions = {
                zoom: 15,
                center: new google.maps.LatLng(-6.218658, 106.802645),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            var markers = [];

            var map = new google.maps.Map(document.getElementById(attrs.id), myOptions);
            scope.map = map;
            
            var infoWindow = new google.maps.InfoWindow();

            google.maps.event.addListener(map, 'click', function(e) {
                scope.$apply(function() {
                    addMarker({
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng(),
                    isNew: true
                  });
                });
            }); // end click listener

            scope.$watch('listLocation.locations', function(newLocations, oldValue) {
              // console.log(newValue)
              if (newLocations) {
                for (var i = 0; i < newLocations.length; i++) {
                  addMarker({
                    lat: newLocations[i].lat,
                    lng: newLocations[i].lang,
                    isNew: false,
                    location: newLocations[i]
                  });
                }
              }
            });

            window.add = function() {
              scope.location.name = document.getElementById("name").value;
              scope.location.description = document.getElementById("description").value;
              scope.add();
            }

            window.remove = function(code) {
              scope.remove(code);
            }

            window.makeActionButton = function(location) {
              if (location.id) {
                return '<br/><button class="btn btn-danger" onclick="remove(\''+ location.code +'\')">Delete</button>';
              }else {
                return '<br/><button class="btn btn-success" onclick="add()">Save</button>';
              }
            }

            window.getContent = function(options) {
              // info window
              var location = {
                name: '',
                description: ''
              };

              if (options && options.location) {
                location.name = options.location.name;
                location.description = options.location.description;
                location.id = options.location.id;
                location.code = options.location.code;
              }

              var contentString = '<div id="content">'+
                '<h3 class="col-sm-12">Information</h3>'+
                '<div id="bodyContent">'+
                  '<div>'+
                    '<div class="col-sm-12">'+
                      '<b>Name</b>'+
                      '<input type="text" class="form-control" id="name" value="'+ location.name +'" />'+
                    '</div>'+

                    '<div class="col-sm-12">'+
                      '<b>Description</b>'+
                      '<textarea rows="5" class="form-control" id="description">'+ location.description +'</textarea>'+
                    '</div>' +
                    ''+
                    '<div class="col-sm-12">'+
                      window.makeActionButton(location)
                      ''+
                    '</div>'
                  '</div>'+
                '</div>'+
              '</div>';

              return contentString;
            }

            addMarker= function(pos){
               var myLatlng = new google.maps.LatLng(pos.lat,pos.lng);
               var marker = new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                    title:"Hello World!",
                    location: pos.location || null
                });

                markers.push(marker)

                scope.location.lat = pos.lat;
                scope.location.lang = pos.lng;

                infoWindow.setContent(window.getContent());

                if (pos.isNew) {
                  infoWindow.open(map, marker);

                  google.maps.event.addListener(infoWindow,'closeclick',function(){
                    marker.setMap(null)
                  });
                }

                marker.addListener('click', function() {
                  infoWindow.setContent(window.getContent({ location: pos.location }));
                  infoWindow.open(map, this);
                });

            } //end addMarker

        }
    };
});

function MapCtrl($scope) {

    $scope.mapPin = 'No pin set yet';

}
