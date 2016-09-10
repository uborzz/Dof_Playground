angular.module('dofitarioApp')
  .controller('MainCtrl', ['$scope', '$http', 'ApiFactory', '$state', function ($scope, $http, ApiFactory, $state) {
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
    ctrl.userList = [];
    ctrl.slots = _slots;
    ctrl.slots2 = _slots;
    ctrl.user = '';
    ctrl.newUser = '';
    ctrl.generateUserList();
    ctrl.loadGenTable();
  }

  // ctrl.user = "Henry";

  ctrl.generateUserList = function(current_user){
    console.log('Generando lista')
    ApiFactory.getUserList()
    .then(function(data){
      ctrl.userList = data.data.users
      ctrl.user = current_user? current_user: ctrl.userList[0]
      if(ctrl.user){ /// if we have on user selected then load the table
        ctrl.loadTable(ctrl.user)
      }
      else{
        ctrl.slots = _slots
      }      
    });
  };

  ctrl.loadTable = function(user){
    ApiFactory.getTimetable(user)
    .then(function(data){
      ctrl.slots = data.data.week;
    })
    .catch(function(data){

    });
  };

  ctrl.deleteUser = function(user){
    ApiFactory.deleteOne(user)
    .then(function(data){
        ctrl.generateUserList()
        ctrl.loadGenTable()
        ctrl.user = ctrl.userList[0]
    })
    .catch(function(data){

    });
  };


  ctrl.saveTable = function(user, slots){
    slots = slots || _slots
    ApiFactory.putTimetable(user, slots)
    .then(function(data){
        console.log(data)
        ctrl.newUser = ''
        ctrl.generateUserList(ctrl.user)
        ctrl.loadGenTable()
    })
    .catch(function(data){
      console.log(data)
      alert(data.data.message)
    });
  };

  ctrl.createUser = function(){
    ApiFactory.createNewUser(ctrl.newUser)
    .then(function(data){
      var values = data.data;
      ctrl.newUser = ''
      ctrl.loadTable(values.nick)
      ctrl.generateUserList(values.nick)
      ctrl.loadGenTable()
    })
    .catch(function(data){
      console.log(data)
      alert(data.data.message)
    })
  };


  ctrl.resetTable = function(user){
    ApiFactory.putTimetable(user, _slots)
    .then(function(data){
        ctrl.slots = data.data.week
        ctrl.newUser = ''
        ctrl.generateUserList(ctrl.user)
        ctrl.loadGenTable()
    })
    .catch(function(data){
      alert(data.data.message)
    });
  };

  ctrl.loadGenTable = function(){
    console.log(ApiFactory)
    ApiFactory.getGenTimetable()
    .then(function(data){
      ctrl.slots2 = data.data.week;
    })
    .catch(function(data){
      console.log(data.data.message)
      ctrl.slots2 = _slots
    });
  };


  //
  // it('should check ng-click', function() {
  //   $http.put('/api/users/PEPE/week')
  // });



  _init();
}]);
