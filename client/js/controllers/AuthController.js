'use strict';


AuctionApp.controller('AuthController', ['$scope', '$routeParams', '$http',
    '$auth', '$location', '$rootScope', '$route', '$rootScope',
    function($scope, $routeParams, $http, $auth, $location, $rootScope, $route) {
        /*$scope.user = {
            email: '',
            username: '',
            password: '',
            confirmpassword: ''
        };*/

        $scope.user = $auth.user;
        $scope.title=$route.current.locals.title;
        if ($scope.user.id && $location.url().match('/register')) {

            $location.url('/my_profile');

            return;
        }
        else if(!$scope.user.id && $location.url().match('/my_profile')){
            $location.url('/login');
            return;
        }

        $scope.saveUser = function(form, user) {
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
                        $auth.validateToken();
                        $location.url('/');
                    });
            }
        };

    }]);
