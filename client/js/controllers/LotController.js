'use strict';

/* Lot Controller */

/*AuctionApp.controller('LotController', function($scope) {

});
*/

AuctionControllers.controller('LotController', ['$scope', '$routeParams', '$http',
    function($scope, $routeParams, $http) {
        $scope.auctions = {
            lots: []
        };

        var filter = {
            "limit": 10,
            "order": "id desc"
        };

        $http.get('api/Auctions?filter=' + JSON.stringify(filter)).success(function(data) {
            $scope.auctions.lots = data;
        });

    }]);
