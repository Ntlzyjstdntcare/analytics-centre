angular.module('AnalyticsCentreApp.controllers', []).
    controller('analyticsController', function($scope, $location, ingestionServiceAPIService,
                                                       ingestionServiceEDAService,
                                                       ingestionServiceCleaningService,
                                                       ingestionServiceExplorationService,
                                                       saveToCassandraService) {

        $scope.myResults = '';

        $scope.numberOfTopLevelElements = '';

        $scope.saveToCassandraMessage = '';

        $scope.nullReplacementValue = 'Type...';

        $scope.replacedNulls = 'test';

        $scope.keyToGroupBy = '';

        $scope.valueToGroupBy= 'Type...';

        $scope.groupedValues = '';

        $scope.go = function(path) {
            $location.path(path);
        }

        $scope.saveToCassandra = function() {
            saveToCassandraService.saveToCassandra().success(function(response) {
                $scope.saveToCassandraMessage = response.response;
            })
        }

        $scope.getNumberTopLevelElements = function() {
            ingestionServiceEDAService.getNumberTopLevelElements().success(function(response) {
                $scope.numberOfTopLevelElements = response.results;
            })
        }

        $scope.replaceNullValues = function() {
            ingestionServiceCleaningService.replaceNullValues($scope.nullReplacementValue).success(function(response) {
                $scope.myResults = JSON.parse(response.response);
            })
        }

        $scope.groupByKey = function() {
            ingestionServiceExplorationService.groupByKey($scope.valueToGroupBy).success(function(response) {
                //$scope.groupedValues = JSON.parse(response.GroupedValues);
                $scope.groupedValues = response.GroupedValues;
            })
        }

        ingestionServiceAPIService.getLocations().success(function(response) {
            $scope.myResults = JSON.parse(response.results);
        })

    }).

    controller('visualisation1Controller', function($scope, ingestionServiceAPIService) {

        var theGodfatherMovie = {
            "title": "The Godfather",
            "director": "Francis Ford Coppolla",
            "yearFilmed": 1972,
            "novelWriter": "Mario Puzo",
            "mainCharacters": [
                {
                    "characterName": "Don Vito Corleone",
                    "actorName": "Marlon Brando"
                },
                {
                    "characterName": "Michael Corleone",
                    "actorName": "Al Pacino"
                },
                {
                    "characterName": "Tom Hagen",
                    "actorName": "Robert Duvall"
                },
                {
                    "characterName": "Kay Adams",
                    "actorName": "Diane Keaton"
                }
            ]
        };

        d3.select("body").selectAll("p").data(theGodfatherMovie.mainCharacters).enter().append("p");

        d3.selectAll("p").text(function (d) { return d.characterName });
    }).

    controller('visualisation2Controller', function($scope, ingestionServiceAPIService) {

    });