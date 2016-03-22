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

    factory('ingestionServiceNumberTopLevelElementsService', function($http) {
        var numberTopLevelElementsApi = {};

        numberTopLevelElementsApi.getNumberTopLevelElements = function() {
            return $http({
                method: 'GET',
                url: 'http://localhost:8080/numbertoplevelelements'
            })
        }

        return numberTopLevelElementsApi;
    }).

    factory('saveToCassandraService', function($http) {
        var saveToCassandraApi = {};

        saveToCassandraApi.saveToCassandra = function() {
            return $http({
                method: 'POST',
                url: 'http://localhost:8080/savetocassandra'
            })
        }

        return saveToCassandraApi;
    });