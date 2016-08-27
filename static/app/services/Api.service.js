angular.module('myApp')
.factory('ApiFactory', ['$http', function($http){

  var url='http://127.0.0.1:8080';

  function getTimetable(user_id){
    return $http.get(url + user_id + '/week');
  }

  function deleteOne(user_id){
    return $http.delete(url +'/api/users/' + user_id + '/week');
  }

  function getGenTimetable(){
    return $http.get(url + '/api/general/week');
  }

  function getUserList(){
    return $http.get(url + '/api/general/userlist');
  }

  function putTimetable(user_id, data){
    return $http.put(url + '/api/users/' + user_id + '/week', {nick:user_id, week:data});
  }

  return  {
    getTimetable : getTimetable,
    getGenTimetable : getGenTimetable,
    putTimetable : putTimetable,
    getUserList : getUserList,
    deleteOne : deleteOne
  };

}]);
