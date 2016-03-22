angular.module('AnalyticsCentreApp.services', []).
    factory('ingestionServiceAPIService', function($http) {
        var ingestionServiceAPI = {};

        ingestionServiceAPI.getLocations = function() {
            return $http({
                method: 'GET',
                url: 'http://localhost:8080/datagovuk'
            });
        }

        return ingestionServiceAPI;
    }).

    factory('ingestionServiceFirstEDAService', function($http) {
        var firstEDAApi = {};

        firstEDAApi.getEDAResults = function() {
            return $http({
                method: 'GET',
                url: 'http://localhost:8080/firsteda'
            })
        }

        return firstEDAApi;
    });