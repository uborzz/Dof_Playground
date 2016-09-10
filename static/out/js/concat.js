var app=angular.module("dofitarioApp",["ui.router"]);app.config(["$stateProvider","$urlRouterProvider",function(e,t){e.state("app",{url:"/app",templateUrl:"app/home.html"}),e.state("roster",{url:"/app/roster",templateUrl:"app/roster.html"}),e.state("clases",{url:"/app/clases",templateUrl:"app/clases.html"}),e.state("todo",{url:"/app/todo",templateUrl:"app/todo.html"}),e.state("info",{url:"/app/info",templateUrl:"app/info.html"}),e.state("recursos",{url:"/app/recursos",templateUrl:"app/recursos.html"}),e.state("dofitario",{url:"/app/dofitario",templateUrl:"app/dofitario.html"}),e.state("403",{url:"/403",template:"<h1>Not authorized</h1>"}),t.when("","/app")}]),angular.module("dofitarioApp").controller("MainCtrl",["$scope","$http","ApiFactory","$state",function(e,t,a,o){function n(){r.slots=l,r.generateUserList(),r.loadGenTable()}var r=this,l=[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];r.generateUserList=function(){console.log("Generando lista"),a.getUserList().then(function(e){"Error"===e.data.response||(console.log(e),r.userList=e.data.users)})},r.loadTable=function(e){console.log(e),a.getTimetable(e).then(function(e){"Error"===e.data.response||(console.log(e),r.slots=e.data.week)})},r.deleteUser=function(e){console.log(a),a.deleteOne(e).then(function(e){"Error"===e.data.response||(console.log(e),r.generateUserList(),r.loadGenTable(),r.user="")})},r.saveTable=function(e,t){t=t||l,a.putTimetable(e,t).then(function(e){console.log(e),r.newUser="",r.generateUserList(),r.loadGenTable()}).catch(function(e){console.log(e),alert(e.data.message)})},r.createUser=function(){a.createNewUser(r.newUser).then(function(e){console.log(e),r.newUser="",r.generateUserList(),r.loadGenTable()}).catch(function(e){console.log(e),alert(e.data.message)})},r.resetTable=function(e){console.log(a),a.putTimetable(e,l).then(function(t){"Error"===t.data.response||(console.log(t),r.newUser="",r.slots=l,r.loadTable(e),r.loadGenTable())})},r.loadGenTable=function(){console.log(a),a.getGenTimetable().then(function(e){console.log(e),r.slots2=e.data.week}).catch(function(e){alert(e.data.message),r.slots2=l})},n()}]),angular.module("dofitarioApp").directive("genTimetable",function(){return{restrict:"A",templateUrl:"gen-timetable.tpl.html",scope:{slots:"="},link:function(e,t,a){function o(e,t,a){for(var o=[],n=e;n<=t;n+=a)o.push(n);return o}function n(){e.loop=o,e.days=r}var r=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];e.getColor=function(e){return e>=1&&e<3?"range1":e>=3&&e<5?"range2":e>=5&&e<7?"range3":e>=7&&e<9?"range4":e>=9?"range5":""},e.greaterThan=function(e){return e+=12,e>=24?e-24:e},n()}}}),angular.module("dofitarioApp").directive("myTimetable",function(){return{restrict:"A",templateUrl:"my-timetable.tpl.html",scope:{slots:"="},link:function(e,t,a){function o(e,t,a){for(var o=[],n=e;n<=t;n+=a)o.push(n);return o}function n(t,a,o){var n=0;switch(t){case"day":for(i.day[a]=i.day[a]?0:1,n=0;n<=16;n++)e.slots[a][n]=i.day[a];break;case"hour":for(i.hour[o]=i.hour[o]?0:1,n=0;n<7;n++)e.slots[n][o]=i.hour[o];break;case"slot":i.state&&(e.slots[a][o]=e.slots[a][o]?0:1)}}function r(e,t,a){i.state=e,i.state&&n("slot",t,a)}function l(){e.loop=o,e.toggle=n,e.select=r,e.days=s}var s=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],i={state:!1,day:[0,0,0,0,0,0,0],hour:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};e.greaterThan=function(e){return e+=12,e>=24?e-24:e},l()}}}),angular.module("dofitarioApp").directive("ngEnter",function(){return function(e,t,a){t.bind("keydown keypress",function(t){13===t.which&&(e.$apply(function(){e.$eval(a.ngEnter,{event:t})}),t.preventDefault())})}}),angular.module("dofitarioApp").factory("ApiFactory",["$http",function(e){function t(t){return e.get(s+"api/users/"+t+"/week")}function a(t){return e.delete(s+"api/users/"+t+"/week")}function o(){return e.get(s+"api/general/week")}function n(){return e.get(s+"api/users")}function r(t){return console.log(t),e.post(s+"api/users",{nick:t})}function l(t,a){return e.put(s+"api/users/"+t+"/week",{nick:t,week:a})}var s="http://0.0.0.0:9999/";return{getTimetable:t,getGenTimetable:o,putTimetable:l,getUserList:n,deleteOne:a,createNewUser:r}}]);