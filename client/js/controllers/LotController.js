'use strict';

/* Lot Controller */

/*AuctionApp.controller('LotController', function($scope) {

});
*/

var AuctionControllers = angular.module('AuctionControllers', []);

AuctionControllers.controller('LotController', ['$scope', '$routeParams', '$http',
    function($scope, $routeParams, $http) {
        $scope.auctions = {
            lots: []
        };

        var filter = {
            "limit": 10,
            "order": "id desc",
            where: {
                title: {
                    regexp: '1'
                }
            }
        };

        $http.get('api/Auctions?filter=' + JSON.stringify(filter)).success(function(data) {
            $scope.auctions.lots = data;
        });

    }]);
