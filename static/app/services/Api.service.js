angular.module('myApp')
.factory('ApiFactory', ['$http', function($http){
  function getTimetable(user_id){
    return $http.get('http://localhost:8080/api/users/' + user_id + '/week');
  }

  function getGenTimetable(){
    return $http.get('http://localhost:8080/api/general/week');
  }

  function getUserList(){
    return $http.get('http://localhost:8080/api/general/userlist');
  }

  function putTimetable(user_id, data){
    return $http.put('http://localhost:8080/api/users/' + user_id + '/week', {nick:user_id, week:data});
  }

  return  {
    getTimetable : getTimetable,
    getGenTimetable : getGenTimetable,
    putTimetable : putTimetable,
    getUserList : getUserList
  };

}]);
