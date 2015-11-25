'use strict';

/* Lot Controller */


angular.module('AuctionApp').controller('LotListController', ['$scope', '$routeParams', '$http', 'LotsList',
    function($scope, $routeParams, $http, LotsList) {
        $scope.auctions = {
            lots: []
        };
        var filter = {
            "limit": 10,
            "order": "id desc"
        };
        LotsList.loadData(filter, function() {
            $scope.auctions.lots = this.getData();
        });
    }]);
