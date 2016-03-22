angular.module('AnalyticsCentreApp.controllers', []).
    controller('socialCareLocationsController', function($scope, ingestionServiceAPIService,
                                                         ingestionServiceNumberTopLevelElementsService, saveToCassandraService) {

        $scope.myResults = [];

        //$scope.buttonTest = "";

        $scope.numberOfTopLevelElements = '';

        $scope.saveToCassandraMessage = '';

        $scope.saveToCassandra = function() {
            //$scope.testValue = saveToCassandraService.saveToCassandra();
            saveToCassandraService.saveToCassandra();
            $scope.saveToCassandraMessage = 'Saved successfully!';
        }

        ingestionServiceNumberTopLevelElementsService.getNumberTopLevelElements().success(function(response) {
            $scope.numberOfTopLevelElements = response.results
        })
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