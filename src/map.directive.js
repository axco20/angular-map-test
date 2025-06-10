//AngularJS interactive map
angular.module('mapApp')
.directive('mapDirective', function() {
  return {
    //Defines a scope for latitude and longitude
    scope: {
      latitude: '=lat',    
      longitude: '=lon'    
    },
    link: function(scope, element) {

        //Initializes Leaflet map, sets initial view to coordinates, sets zoom level of 10
      const map = L.map(element[0])
        .setView([scope.latitude, scope.longitude], 10);

        //Adds OpenStreetMap layers to the map using standard URL template.
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
       .addTo(map);

       //creates a marker at the coordinates given, adds the marker to the map.
      const markerPin = L.marker([scope.latitude, scope.longitude])
        .addTo(map);

        //Watches for changes to Latitude and Longitude
        //If either value changes, map view and marker will be updated using the new coordinates.
      scope.$watchGroup(['latitude', 'longitude'], ([newLat, newLon]) => {
        map.setView([newLat, newLon], 13);
        markerPin.setLatLng([newLat, newLon]);
      });
    }
  };
});