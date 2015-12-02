'use strict';


AuctionApp.controller('AuthController', ['$scope', '$routeParams', '$http',
    '$auth', '$location', '$rootScope', '$route', '$rootScope',
    function ($scope, $routeParams, $http, $auth, $location, $rootScope, $route) {
        /*$scope.user = {
            email: '',
            username: '',
            password: '',
            confirmpassword: ''
        };*/
        $scope.user = $auth.user;
       //$scope.title=$route.current.locals.title;
        if ($scope.user.id && $location.url().match('/register')) {
            $location.url('/my_profile');
            return;
        } else if (!$scope.user.id && $location.url().match('/my_profile')) {
            $location.url('/login');
            return;
        }
       /* else if ($scope.user.id && $location.url().match('/login')) {
            console.log($scope.user);
            $location.url('/');
            return;
        }*/

        $scope.saveUser = function (form, user) {
            if (form.$valid) {
                var func = user.id ? 'updateAccount' : 'submitRegistration',
                    data = angular.extend({}, user);
                delete data.clientId;
                delete data.uid;
                $auth[func](data).then(function(response) {
                    $scope.login(form, user);
                    console.log(response);
                }).catch(function (response) {});
            }
        };

        $scope.login = function (form, user) {
            if (form.$valid) {
                $auth.submitLogin({
                    username: user.username,
                    password: user.password
                }).then(function (response) {
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
        $scope.logout = function () {
            $auth.signOut();
        };
    }]).directive('userMenu', ['$compile', function ($compile) { //user menu items manipulating directive
        //link function
    function link(scope, element, attributes) {
        scope.$watch(attributes.username, function (value) {
            var template = '', el, compiled;
            //select case depending on user authorize status
            if (value) {
                element.children().remove();
                template = "<a class='btn btn-link' ng-href='#/my_profile'>My Profile</a>";
                el = angular.element(template);
                compiled = $compile(el);
                element.append(el);
                compiled(scope);
                template = "<a class='btn btn-link'>My bets</a>";
                el = angular.element(template);
                element.append(el);
                template = "<a class='btn btn-link'>My Lots</a>";
                el = angular.element(template);
                element.append(el);
                template = "<a class='btn btn-link' ng-click='logout()' class='btn-link'>Logout</a>";
                el = angular.element(template);
                compiled = $compile(el);
                element.append(el);
                compiled(scope);

            } else {
                element.children().remove();
                template = "<a class='btn btn-link' href='#/login'>Login</a>";
                el = angular.element(template);
                element.append(el);
                template = "<a class='btn btn-link' href='#/register'>Register</a>";
                el = angular.element(template);
                element.append(el);
            }
        });
    }
    return {
        link: link
    };


}]);
