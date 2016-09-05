var app = angular.module('myApp', ['ui.router']);


app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $stateProvider.state('app', {
        url:'/app',
        //controller:'AppCtrl as appCtrl',
        templateUrl: 'app/home.html'
    });

    $stateProvider.state('roster', {
        url:'/app/roster',
        //controller:'AppCtrl as appCtrl',
        templateUrl: 'app/roster.html'
    });

    $stateProvider.state('clases', {
        url:'/app/clases',
        //controller:'AppCtrl as appCtrl',
        templateUrl: 'app/clases.html'
    });

    $stateProvider.state('todo', {
        url:'/app/todo',
        //controller:'AppCtrl as appCtrl',
        templateUrl: 'app/todo.html'
    });

    $stateProvider.state('info', {
        url:'/app/info',
        //controller:'AppCtrl as appCtrl',
        templateUrl: 'app/info.html'
    });


    $stateProvider.state('recursos', {
        url:'/app/recursos',
        //controller:'AppCtrl as appCtrl',
        templateUrl: 'app/recursos.html'
    });

    $stateProvider.state('dofitario', {
        url:'/app/dofitario',
        //controller:'AppCtrl as appCtrl',
        templateUrl: 'app/dofitario.html'
    });

    $stateProvider.state('403', {
        url:'/403',
        template: '<h1>Not authorized</h1>'
    });

    $urlRouterProvider.when('', '/app');

}]);
