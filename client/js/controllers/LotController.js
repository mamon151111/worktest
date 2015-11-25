'use strict';

/* Lot Controller */


angular.module('AuctionApp').controller('LotController', ['$scope', '$routeParams', '$http', '$location', 'LotsList',
    function($scope, $routeParams, $http, $location, LotsList) {
        var id = $routeParams.id || '';
        LotsList.configure({
            lotConfig: {
                addModelSuccessCallback: (function($location) {
                    return function(response) {
                        $location.url('/edit-lot/' + this.values.id);
                    };

                })($location)
            }
        });
        var lotItem = $scope.lotItem = LotsList.createLot(id ? {id: id} : {}, LotsList.config.lotConfig);
        if (id) {
            lotItem.getModel(id, null, function (response) {
                $scope.lotItem = lotItem;
            });
        }

        $scope.saveLot = function(form, lot) {
            if (form.$valid) {
                $scope.lotItem.set(lot);
                if (id && $scope.lotItem.values.id) {
                    $scope.lotItem.updateModel();
                } else {
                    $scope.lotItem.addModel();
                }
            }

        }
    }]);
