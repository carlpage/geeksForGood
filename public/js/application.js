angular.module('MyApp', ['ngRoute', 'satellizer','ngTagsInput', 'ui.bootstrap'])
  .config(["$routeProvider", "$locationProvider", "$authProvider", function($routeProvider, $locationProvider, $authProvider) {
    skipIfAuthenticated.$inject = ["$location", "$auth"];
    loginRequired.$inject = ["$location", "$auth"];
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html'
      })
      .when('/contact', {
        templateUrl: 'partials/contact.html',
        controller: 'ContactCtrl'
      })
      .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .when('/signup', {
        templateUrl: 'partials/signup.html',
        controller: 'SignupCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .when('/account', {
        templateUrl: 'partials/profile.html',
        controller: 'ProfileCtrl',
        resolve: { loginRequired: loginRequired }
      })
      .when('/forgot', {
        templateUrl: 'partials/forgot.html',
        controller: 'ForgotCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .when('/reset/:token', {
        templateUrl: 'partials/reset.html',
        controller: 'ResetCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .when('/addproject', {
        templateUrl: 'partials/createProject.html',
        controller: 'HomeController as hc',
        resolve: { loginRequired: loginRequired }
      })
      .when('/adddataset', {
        templateUrl: 'partials/createdataset.html',
        controller: 'HomeController as hc',
        resolve: { loginRequired: loginRequired }
      })
      .otherwise({
        templateUrl: 'partials/404.html'
      });

    $authProvider.loginUrl = '/login';
    $authProvider.signupUrl = '/signup';

    function skipIfAuthenticated($location, $auth) {
      if ($auth.isAuthenticated()) {
        $location.path('/');
      }
    }

    function loginRequired($location, $auth) {
      if (!$auth.isAuthenticated()) {
        $location.path('/login');
      }
    }
  }])
  .run(["$rootScope", "$window", function($rootScope, $window) {
    if ($window.localStorage.user) {
      $rootScope.currentUser = JSON.parse($window.localStorage.user);
    }
  }]);

angular.module('MyApp')
  .controller('ContactCtrl', ["$scope", "Contact", function($scope, Contact) {
    $scope.sendContactForm = function() {
      Contact.send($scope.contact)
        .then(function(response) {
          $scope.messages = {
            success: [response.data]
          };
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    };
  }]);

angular.module('MyApp')
  .controller('ForgotCtrl', ["$scope", "Account", function($scope, Account) {
    $scope.forgotPassword = function() {
      Account.forgotPassword($scope.user)
        .then(function(response) {
          $scope.messages = {
            success: [response.data]
          };
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    };
  }]);

angular.module('MyApp')
  .controller('HeaderCtrl', ["$scope", "$location", "$window", "$auth", function($scope, $location, $window, $auth) {
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };
    
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
    
    $scope.logout = function() {
      $auth.logout();
      delete $window.localStorage.user;
      $location.path('/');
    };
  }]);

angular.module('MyApp').controller('HomeController', ["$http", "$location", function($http, $location) {
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
      vm.datasets = response.data.datasets;
      console.log(vm.datasets);
    });
    // vm.getLatLong(zip);
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
      // for (var i = 0; i < arr.length; i++) {
      //   vm.getLatLong(arr[i]);
      // }
    });
  } // end projects

  vm.getProjects();

  vm.addProject = function(project) {
    console.log('click post project', project);
    var projectToSend = {
      score: 0,
      zipcode: project.zipcode,
      name: project.name,
      description: project.description
    };
    $http.post('/projects', projectToSend).then(function(response) {
      console.log('POST function', response);
    });
    vm.getProjects();
    $location.path('/');
  };

  vm.addDataset = function(dataset) {
    console.log('click post project', dataset);
    var datasetToSend = {
      score: 0,
      zipcode: dataset.zipcode,
      name: dataset.name,
      description: dataset.description,
      url: dataset.url
    };
    $http.post('/datasets', datasetToSend).then(function(response) {
      console.log('POST function', response);
    });
    vm.getDataSet();
    $location.path('/');
  };

}]);

angular.module('MyApp')
  .controller('LoginCtrl', ["$scope", "$rootScope", "$location", "$window", "$auth", function($scope, $rootScope, $location, $window, $auth) {
    $scope.login = function() {
      $auth.login($scope.user)
        .then(function(response) {
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $location.path('/account');
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    };

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function(response) {
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $location.path('/');
        })
        .catch(function(response) {
          if (response.error) {
            $scope.messages = {
              error: [{ msg: response.error }]
            };
          } else if (response.data) {
            $scope.messages = {
              error: [response.data]
            };
          }
        });
    };
  }]);
angular.module('MyApp')
  .controller('ProfileCtrl', ["$scope", "$rootScope", "$location", "$window", "$auth", "Account", function($scope, $rootScope, $location, $window, $auth, Account) {
    $scope.profile = $rootScope.currentUser;

    $scope.updateProfile = function() {
      Account.updateProfile($scope.profile)
        .then(function(response) {
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $scope.messages = {
            success: [response.data]
          };
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    };

    $scope.changePassword = function() {
      Account.changePassword($scope.profile)
        .then(function(response) {
          $scope.messages = {
            success: [response.data]
          };
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    };

    $scope.link = function(provider) {
      $auth.link(provider)
        .then(function(response) {
          $scope.messages = {
            success: [response.data]
          };
        })
        .catch(function(response) {
          $window.scrollTo(0, 0);
          $scope.messages = {
            error: [response.data]
          };
        });
    };
    $scope.unlink = function(provider) {
      $auth.unlink(provider)
        .then(function() {
          $scope.messages = {
            success: [response.data]
          };
        })
        .catch(function(response) {
          $scope.messages = {
            error: [response.data]
          };
        });
    };

    $scope.deleteAccount = function() {
      Account.deleteAccount()
        .then(function() {
          $auth.logout();
          delete $window.localStorage.user;
          $location.path('/');
        })
        .catch(function(response) {
          $scope.messages = {
            error: [response.data]
          };
        });
    };
    $scope.client = filestack.init('A9SEH898vToqPWbDc1VCAz');

     $scope.showPicker = function(){
        $scope.client.pick({
        }).then(function(result) {
            console.log(JSON.stringify(result.filesUploaded));
        });
    };
  }]);

angular.module('MyApp')
  .controller('ResetCtrl', ["$scope", "Account", function($scope, Account) {
    $scope.resetPassword = function() {
      Account.resetPassword($scope.user)
        .then(function(response) {
          $scope.messages = {
            success: [response.data]
          };
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    }
  }]);

angular.module('MyApp')
  .controller('SignupCtrl', ["$scope", "$rootScope", "$location", "$window", "$auth", function($scope, $rootScope, $location, $window, $auth) {
    $scope.signup = function() {
      $auth.signup($scope.user)
        .then(function(response) {
          $auth.setToken(response);
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $location.path('/');
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    };

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function(response) {
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $location.path('/');
        })
        .catch(function(response) {
          if (response.error) {
            $scope.messages = {
              error: [{ msg: response.error }]
            };
          } else if (response.data) {
            $scope.messages = {
              error: [response.data]
            };
          }
        });
    };
  }]);
angular.module('MyApp')
  .factory('Account', ["$http", function($http) {
    return {
      updateProfile: function(data) {
        return $http.put('/account', data);
      },
      changePassword: function(data) {
        return $http.put('/account', data);
      },
      deleteAccount: function() {
        return $http.delete('/account');
      },
      forgotPassword: function(data) {
        return $http.post('/forgot', data);
      },
      resetPassword: function(data) {
        return $http.post('/reset', data);
      }
    };
  }]);
angular.module('MyApp')
  .factory('Contact', ["$http", function($http) {
    return {
      send: function(data) {
        return $http.post('/contact', data);
      }
    };
  }]);