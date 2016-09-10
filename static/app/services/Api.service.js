angular.module('dofitarioApp')
.factory('ApiFactory', ['$http', function($http){

  var url='http://www.dofitos.tk/';

  function getTimetable(user_id){
    return $http.get(url + 'api/users/' + user_id + '/week');
  }

  function deleteOne(user_id){
    return $http.delete(url +'api/users/' + user_id + '/week');
  }

  function getGenTimetable(){
    return $http.get(url + 'api/general/week');
  }

  function getUserList(){
    return $http.get(url + 'api/users');
  }

  function createNewUser(user_name){
    console.log(user_name)
    return $http.post(url + 'api/users', { nick : user_name});
  }

  function putTimetable(user_id, data){
    return $http.put(url + 'api/users/' + user_id + '/week', {nick:user_id, week:data});
  }

  return  {
    getTimetable : getTimetable,
    getGenTimetable : getGenTimetable,
    putTimetable : putTimetable,
    getUserList : getUserList,
    deleteOne : deleteOne,
    createNewUser :createNewUser
  };

}]);
