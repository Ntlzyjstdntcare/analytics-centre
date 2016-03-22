angular.module('AnalyticsCentreApp.controllers', []).
    controller('socialCareLocationsController', function($scope, ingestionServiceAPIService, ingestionServiceFirstEDAService) {

        $scope.myResults = [];

        //$scope.buttonTest = "";

        $scope.firstEDAResults = [];

        ingestionServiceFirstEDAService.getEDAResults().success(function(response) {
            $scope.firstEDAResults = response.results
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