angular.module('myApp')
  .controller('MainCtrl', ['$scope', '$http', 'ApiFactory', function ($scope, $http, ApiFactory) {
    var ctrl = this;
    var _slots = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];


  function _init() {
    ctrl.slots = _slots;
  }

  ctrl.user = "Rady";

  ctrl.loadTable = function(user){
    console.log(ApiFactory)
    ApiFactory.getTimetable(user).then(function(data){
      if(data.data.response === "Error"){

      }
      else{
        console.log(data)
        ctrl.slots = data.data.week;
      }
    });
  };

  ctrl.saveTable = function(user, slots){
    console.log(ApiFactory)
    ApiFactory.putTimetable(user, slots).then(function(data){
      if(data.data.response === "Error"){

      }
      else{
        console.log(data)
        // ctrl.loadGenTable()
      }
    });
  };

  ctrl.loadGenTable = function(){
    console.log(ApiFactory)
    ApiFactory.getGenTimetable().then(function(data){
      if(data.data.response === "Error"){

      }
      else{
        console.log(data)
        // ctrl.slots2 = data.data.week;
      }
    });
  };


  //
  // it('should check ng-click', function() {
  //   $http.put('/api/users/PEPE/week')
  // });



  _init();
}]);
