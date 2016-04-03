angular.module('AnalyticsCentreApp.controllers', []).
    controller('analyticsController', function($scope, ingestionServiceAPIService,
                                                         ingestionServiceEDAService, ingestionServiceCleaningService, saveToCassandraService) {

        $scope.myResults = [];

        //$scope.buttonTest = "";

        $scope.numberOfTopLevelElements = '';

        $scope.saveToCassandraMessage = '';

        $scope.nullReplacementValue = 'Type...';

        $scope.replacedNulls = '';

        //$scope.saveToCassandra = function() {
        //    //$scope.testValue = saveToCassandraService.saveToCassandra();
        //    saveToCassandraService.saveToCassandra();
        //    $scope.saveToCassandraMessage = 'Saved successfully!';
        //}

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
        //$scope.buttonTestFunction = function() {
        //    $scope.buttonTest = "TestingWha";
        //}

        //$scope.count = 0;
        //$scope.socialCareLocations = myResults.social_care_locations;

//               {county: 'Dublin', city: 'Dublin'}, {county: 'Tipp', city: 'Cahir'}
//
//];
        ingestionServiceAPIService.getLocations().success(function(response) {
            $scope.myResults = JSON.parse(response.results);
        })

        //firstEDAService.myFunction($scope.count);
    });