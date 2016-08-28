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
    ctrl.generateUserList()
    ctrl.loadGenTable()
  }

  // ctrl.user = "Henry";

  ctrl.generateUserList = function(){
    console.log('Generando lista')
    ApiFactory.getUserList().then(function(data){
      if(data.data.response === "Error"){

      }
      else {
        console.log(data)
        ctrl.userList = data.data.users
      }
    });
  };

  ctrl.loadTable = function(user){
    // console.log(ApiFactory)
    console.log(user)
    ApiFactory.getTimetable(user).then(function(data){
      if(data.data.response === "Error"){

      }
      else{
        console.log(data)
        ctrl.slots = data.data.week;
      }
    });
  };

  ctrl.deleteUser = function(user){
    console.log(ApiFactory)
    ApiFactory.deleteOne(user).then(function(data){
      if(data.data.response === "Error"){

      }
      else{
        console.log(data)
        ctrl.generateUserList()
        ctrl.loadGenTable()
        ctrl.user = ''
      }
    });
  };


  ctrl.saveTable = function(user, slots){
    slots = slots || _slots
    console.log(ApiFactory)
    ApiFactory.putTimetable(user, slots).then(function(data){
      if(data.data.response === "Error"){

      }
      else{
        console.log(data)
        ctrl.newUser = ''
        ctrl.generateUserList()
        ctrl.loadGenTable()
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
        ctrl.slots2 = data.data.week;
      }
    });
  };


  //
  // it('should check ng-click', function() {
  //   $http.put('/api/users/PEPE/week')
  // });



  _init();
}]);
