'use strict';


AuctionApp.controller('AuthController', ['$scope', '$routeParams', '$http',
    '$auth', '$location', '$rootScope',
    function($scope, $routeParams, $http, $auth, $location, $rootScope) {

        $scope.user = $auth.user;

        $scope.registerUser = function(form, user) {
            if (form.$valid) {
                var func = user.id ? 'updateAccount' : 'submitRegistration';
                var data = angular.extend({}, user);
                delete data.clientId;
                delete data.uid;
                $auth[func](data).then(function(response) {
                    $scope.login(form, user);

                }).catch(function(response) {});
            }
        };

        $scope.login = function(form, user) {
            if (form.$valid) {
                $auth.submitLogin({
                    username: user.username,
                    password: user.password
                }).then(function(response) {
                        $auth.setAuthHeaders({
                            token: response.id,
                            clientId: response.userId,
                            uid: response.userId
                        }, true);
                        $auth.validateToken()
                        $location.url('/');
                    });
            }
        }
    }]);
