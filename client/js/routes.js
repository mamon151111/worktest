angular.module('AuctionApp').config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
    'use strict';
    $routeProvider.when('/', {
        templateUrl: 'views/lotslist.html',
        controller: 'LotListController'
    }).when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthController'
    }).when('/register', {
        templateUrl: 'views/register.html',
        controller: 'AuthController'
    }).when('/edit-lot/:id', {
        templateUrl: 'views/edit-lot.html',
        controller: 'LotController'
    }).when('/add-lot', {
        templateUrl: 'views/edit-lot.html',
        controller: 'LotController'
    }).when('/lot-view/:id', {
        templateUrl: 'views/lot-view.html',
        controller: 'LotController'
    }).otherwise({
        redirectTo: '/'
    });

    $httpProvider.interceptors.push([
        '$injector', function ($injector) {
            return {
                request: function (req) {
                    $injector.invoke([
                        '$http', '$auth', function ($http, $auth) {
                            var key, val, ref, results;
                            ref = $auth.retrieveData('auth_headers');
                            if (ref) {
                                if (ref.token) {
                                    req.url = URI(req.url).removeSearch('access_token').addSearch('access_token', ref.token) + '';
                                } else {
                                    req.url = URI(req.url).removeSearch('access_token') + '';
                                }
                            }

                        }
                    ]);
                    return req;
                }
            };
        }
    ]);

    $httpProvider.interceptors.push([
        '$injector', function ($injector) {
            return {
                request: function (req) {
                    $injector.invoke([
                        '$http', '$auth', function ($http, $auth) {
                            var key, val, ref, results, tokenValidationPath, updateProfilePath;
                            ref = $auth.retrieveData('auth_headers');
                            if (ref) {
                                if (ref.token) {
                                    req.url = URI(req.url).removeSearch('access_token').addSearch('access_token', ref.token) + '';
                                } else {
                                    req.url = URI(req.url).removeSearch('access_token') + '';
                                }
                                tokenValidationPath = $auth.apiUrl() + $auth.getConfig().tokenValidationPath;
                                updateProfilePath = $auth.apiUrl() + $auth.getConfig().accountUpdatePath;
                                //alert(tokenValidationPath);
                                if (req.url.match(tokenValidationPath)) {
                                    req.url = req.url.replace('{id}', ref.token);
                                } else if (req.method.toLowerCase() === "put" && req.url.match(updateProfilePath)) {
                                    req.url = req.url.replace('{id}', ref.uid);
                                }
                            }

                        }
                    ]);
                    return req;
                }
            };
        }
    ]);
}]);

