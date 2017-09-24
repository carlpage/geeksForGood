angular.module('MyApp').controller('homeController', function() {
  console.log('in homeControler');
  var vm = this;
  var zipToken = '8X5ulJzEJdQAdLVzY8lQSsJdyYfA7m8fjeJFXjjGxagKVckTkFKd7trGsGgz2pPm';
  vm.zipData;

  vm.getLatLong =  function(zip) {
    // var api = 'https://www.zipcodeapi.com/rest/8X5ulJzEJdQAdLVzY8lQSsJdyYfA7m8fjeJFXjjGxagKVckTkFKd7trGsGgz2pPm/info.json/' + zip + '/degrees'
    return $http({
      method: 'GET',
      url: 'https://www.zipcodeapi.com/rest/8X5ulJzEJdQAdLVzY8lQSsJdyYfA7m8fjeJFXjjGxagKVckTkFKd7trGsGgz2pPm', // edit parameters
      headers: {
        'key': zipToken;
      },
      params: {
        zipcode: zip
      }
    }).then(function(response) {
      console.log('in service, zipcode data: ', response.data);
      vm.zipData = response.data;
      console.log(vm.zipData);
      vm.initMap(vm.zipData);
      return response.data;
    });
  } // end latLong

  vm.initMap = function(vm.zipData) {
    var coords = {
      lat: Number(vm.zipData.lat),
      lng: Number(vm.zipData.lng)
    };
    console.log(coords);
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: coords
    });
    var marker = new google.maps.Marker({
      position: coords,
      map: map
    });
  } // end initMap

  vm.getDataSet = function() {

    vm.getLatLong(zip);
  } // end getDataSet

  vm.getProjects = function() {

    vm.getLatLong(zip);
  } // end projects

});
