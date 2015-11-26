

/* Lot Controller */


angular.module('AuctionApp').controller('LotController', ['$scope', '$routeParams', '$http', '$location', 'LotsList',
    function ($scope, $routeParams, $http, $location, LotsList) {
        'use strict';
        var id = $routeParams.id || '',
            lotItem;
        LotsList.configure({
            lotConfig: {
                addModelSuccessCallback: function (response) {
                    $location.url('/edit-lot/' + this.values.id);
                }
            }
        });
        lotItem = $scope.lotItem = LotsList.createLot(id ? {id: id} : {}, LotsList.config.lotConfig);
        if (id) {
            lotItem.getModel(id, null, function (response) {
                $scope.lotItem = lotItem;
            });
        }

        $scope.saveLot = function (form, lot) {
            if (form.$valid) {
                $scope.lotItem.set(lot);
                if (id && $scope.lotItem.values.id) {
                    $scope.lotItem.updateModel();
                } else {
                    $scope.lotItem.addModel();
                }
            }

        };
    }]);
