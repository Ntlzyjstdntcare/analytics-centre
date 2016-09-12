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

        var JSONData = [
            { "id": 3, "created_at": "Sun May 05 2013", "amount": 12000},
            { "id": 1, "created_at": "Mon May 13 2013", "amount": 2000},
            { "id": 2, "created_at": "Thu Jun 06 2013", "amount": 17000},
            { "id": 4, "created_at": "Thu May 09 2013", "amount": 15000},
            { "id": 5, "created_at": "Mon Jul 01 2013", "amount": 16000}
        ];

        var data = JSONData.slice();

        var format = d3.time.format("%a %b %d %Y");

        var amountFn = function(d) { return d.amount };

        var dateFn = function(d) { return format.parse(d.created_at) };

        var x = d3.time.scale()
                       .range([10, 280])
                       .domain(d3.extent(data, dateFn));

        var y = d3.scale.linear()
                        .range([180, 10])
                        .domain(d3.extent(data, amountFn));

        var svg = d3.select("#demo")
            .append("svg:svg")
            .attr("width", 300)
            .attr("height", 200);

        var refreshGraph = function() {
            x.domain(d3.extent(data, dateFn));
            y.domain(d3.extent(data, amountFn));

            var circles = svg.selectAll("circle").data(data, dateFn)

            circles.transition()
                .attr("cx", function(d) { return x(dateFn(d)) })
                .attr("cy", function(d) { return y(amountFn(d)) })

            circles.enter()
                .append("svg:circle")
                .attr("r", 10)
                .attr("cx", function(d) { return x(dateFn(d)) })
                .attr("cy", function(d) { return y(amountFn(d)) })
                .attr("style", "cursor: pointer;")
                .on("click", function(d) {
                    d3.select("#demo .value").text("Date is: " + d.created_at + " Amount is: " + d.amount)
                })

            circles.exit().remove();
        }

        var start = d3.min(data, dateFn)
        var end = d3.max(data, dateFn)

        d3.selectAll("#demo .add-data")
            .on("click", function() {

                var time = start.getTime() + Math.random() * (end.getTime() - start.getTime())
                var date = new Date(time)

                var obj = {
                    'id': Math.floor(Math.random() * 70),
                    'amount': Math.floor(1000 + Math.random() * 20001),
                    'created_at': date.toDateString()
                }
                data.push(obj);
                refreshGraph();
            })

        d3.selectAll("#demo .remove-data")
            .on("click", function() {
                var idx = Math.floor(Math.random() * data.length)
                data.splice(idx, 1)
                refreshGraph()
            })

        refreshGraph();

    }).

    controller('visualisation2Controller', function($scope, ingestionServiceAPIService) {

    var margin = {top: 20, right: 120, bottom: 20, left: 120},
        width = 960 - margin.right - margin.left,
        height = 560 - margin.top - margin.bottom;

    var i = 0;

    var tree = d3.layout.tree()
        .size([height, width]);

    var diagonal = d3.svg.diagonal()
        .projection(function(d) { return [d.y, d.x]; });

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// load the external data
//    d3.json("treeData.json", function(error, treeData) {
    d3.json("test.json", function(error, test) {
        if (error) throw error;
        //var root = treeData[0];
        var x = JSON.parse(test.results);
        var topLevelElements = x;
        //var treeObjectWithRoot = {root: topLevelElements};
        //root.forEachChildTopLevelObject.update(a function which creates a new circle a certain depth down the page)
        //var i = 0;
        //for (var key in topLevelElements) {
        //    if (topLevelElements.hasOwnProperty(key)) {
        //        update(root);
                //update(treeObjectWithRoot);
                //update(key, topLevelElements[key], i++);
                update(topLevelElements)
            //}
        //}
        });

    function update(source) {
    //function update(sourceKey, sourceValue, i) {

        // Compute the new tree layout.
        //var nodes = tree.nodes(source).reverse(),
        //var nodes = tree.nodes(sourceValue).reverse(),
        //    links = tree.links(nodes);
        //console.log("nodes is: " + nodes);

        // Normalize for fixed-depth.
        //So depth is depth in the tree hierarchy?
        //console.log(nodes);
        //nodes.forEach(function(d) { console.log("d.depth is: " + d.depth); d.y = d.depth * 180; /*d.x = 180 * i */});

        // Declare the nodes…
        var node = svg.selectAll("g.node")
            .data(nodes, function(d) { return d.id || (d.id = ++i);  });

        // Enter the nodes.
        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", function(d) {
                return "translate(" + d.y + "," + d.x + ")"; });

        nodeEnter.append("circle")
            .attr("r", 10)
            .style("fill", "#fff");

        nodeEnter.append("text")
            .attr("x", function(d) {
                return d.children || d._children ? -13 : 13; })
            .attr("dy", ".35em")
            .attr("text-anchor", function(d) {
                return d.children || d._children ? "end" : "start"; })
            .text(function(d) { console.log("d keys are: " + Object.keys(d));return /*sourceKey*/d.name; })
            .style("fill-opacity", 1);

        // Declare the links…
        var link = svg.selectAll("path.link")
            .data(links, function(d) { return d.target.id; });

        // Enter the links.
        link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("d", diagonal);

    }

    });