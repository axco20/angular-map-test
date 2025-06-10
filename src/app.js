angular.module('mapApp', [])
.controller('MainCtrl', function($http) {
  const ctrl = this;

  //Initialize starting coordinates when map boots up to McLean, Virginia
  ctrl.lat = 38.9339;
  ctrl.lon = -77.1773;

  //search() is called when user clicks Search buttona on the map header
  ctrl.search = () => {
    $http
        //makes HTTP GET request to OpenStreetMap's API
      .get('https://nominatim.openstreetmap.org/search', {
        //parameters that are passed into the GET request
        params: { 
            q: ctrl.address, 
            format: 'json', 
            limit: 1 }
      })
      //API request handling
      .then(response => {
        //Extracts the first search result from the API response
        const result = response.data[0];
        //Updates the map coordinates witgh the new locations latitude and longitude
        [ctrl.lat, ctrl.lon] = [+result.lat, +result.lon];
      });
  };
});
