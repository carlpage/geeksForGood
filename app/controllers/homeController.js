angular.module('MyApp').controller('HomeController', function($http) {
  console.log('in HomeControler');
  var vm = this;
  var zipToken = '8X5ulJzEJdQAdLVzY8lQSsJdyYfA7m8fjeJFXjjGxagKVckTkFKd7trGsGgz2pPm';
  var zip = vm.zipData;
  var zipCode;
  var arr = [];
  var latLongArr = [];

  vm.viewBy = 10;
  vm.itemsPerPage = vm.viewBy;
  vm.numPerPage = 10;
  vm.currentPage = 1;
  vm.isCollapsed = true;

  vm.setPage = function(pageNo) {
    vm.currentPage = pageNo;
  };

  vm.pageChanged = function() {
    console.log('Page changed to: ' + vm.currentPage);
  }; // logs in the console that pagination has occurred

  vm.setItemsPerPage = function(num) {
    vm.itemsPerPage = num;
    vm.currentPage = 1; //reset to first page
  };

    vm.initMap = function(zip) {
      var coords = {
        lat: Number(zip.lat),
        lng: Number(zip.lng)
      };
      console.log(coords);
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: coords
      });
      var marker = new google.maps.Marker({
        position: coords,
        map: map
      });
    }; // end initMap

  vm.getLatLong = function(zip) {
    console.log('zipcode', zip);
    // var api = 'https://www.zipcodeapi.com/rest/8X5ulJzEJdQAdLVzY8lQSsJdyYfA7m8fjeJFXjjGxagKVckTkFKd7trGsGgz2pPm/info.json/' + zip + '/degrees'
    return $http({
      method: 'GET',
      url: 'https://www.zipcodeapi.com/rest/8X5ulJzEJdQAdLVzY8lQSsJdyYfA7m8fjeJFXjjGxagKVckTkFKd7trGsGgz2pPm', // edit parameters
      headers: {
        'key': zipToken
      },
      params: {
        zip_code: zip,
        units: 'degrees'
      }
    }).then(function(response) {
      console.log('in service, zipcode data: ', response.data);
      vm.zipData = response.data;
      console.log('zipdata: ', vm.zipData);
      var zipCode = vm.zipData;
      vm.initMap(zipCode);
      return response.data;
    });
  }; // end latLong


  vm.getDataSet = function() {
    console.log('getDataList clicked');
    $http.get('/datasets').then(function(response) {
      console.log(response);
      vm.dataList = response.data.dataList;
      console.log(vm.getDataSet);
    });
    vm.getLatLong(zip);
  } // end getDataSet

  vm.getProjects = function() {
    console.log('inGetProjects');
    $http.get('/projects').then(function(response) {
      console.log(response);
      vm.projectList = response.data.projects;
      console.log(vm.projectList);
      for (var i = 0; i < vm.projectList.length; i++) {
        arr.push(vm.projectList[i].zipcode);
      }
      console.log('yuuuuuup', arr);
      console.log(zipCode);
      for (var i = 0; i < arr.length; i++) {
        vm.getLatLong(arr[i]);
      }
    });
  } // end projects

  vm.getProjects();

  vm.addProject = function() {
    console.log('click post project');

    //  var projectToSend = {
    //    score: project.score,
    //    zipcode: project.zipcode,
    //    name: project.name,
    //    description: project.description
    //  };

    var projectToSend = {
      score: 1,
      zipcode: 55075,
      name: 'test project',
      description: 'this is a test'
    };

    $http.post('/projects', projectToSend).then(function(response) {
      console.log('POST function', response);
    });
    vm.getProjects();
  }; //  end addProject

});
