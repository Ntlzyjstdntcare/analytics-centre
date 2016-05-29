angular.module('AnalyticsCentreApp', [
    'AnalyticsCentreApp.controllers',
    'AnalyticsCentreApp.services',
    'ngRoute'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when("/home", {templateUrl: "partials/home.html", controller: "analyticsController"}).
        when("/visualisation1", {templateUrl: "partials/visualisation1.html", controller: "visualisation1Controller"}).
        when("/visualisation2", {templateUrl: "partials/visualisation2.html", controller: "visualisation2Controller"}).
        otherwise({redirectTo: "/home"})
}]);