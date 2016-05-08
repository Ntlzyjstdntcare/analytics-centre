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

    factory('ingestionServiceEDAService', function($http) {
        var numberTopLevelElementsApi = {};

        numberTopLevelElementsApi.getNumberTopLevelElements = function() {
            return $http({
                method: 'GET',
                url: 'http://localhost:8080/numbertoplevelelements'
            })
        }

        return numberTopLevelElementsApi;
    }).

    factory('ingestionServiceCleaningService', function($http) {
        var replaceNullValuesApi = {};

        replaceNullValuesApi.replaceNullValues = function(replacementValue) {
            return $http({
                method: 'POST',
                url: 'http://localhost:8080/replacenullvalues?replacementValue=' + replacementValue
            });
        }

        return replaceNullValuesApi;
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
    }).

    factory('ingestionServiceExplorationService', function($http) {
        var groupByKeyApi = {};

        groupByKeyApi.groupByKey = function(keyToGroupBy) {
            return $http({
                method: 'POST',
                url: 'http://localhost:8080/groupbykey?keyToGroupBy=' + keyToGroupBy
            });
        }

        return groupByKeyApi;
    });