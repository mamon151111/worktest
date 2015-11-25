AuctionApp.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/lotslist.html',
        controller: 'LotController'
    }).when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthController'
    }).when('/register', {
            templateUrl: 'views/register.html',
            controller: 'AuthController',
        resolve:{
            title: function(){return 'Register'}
        }
    }).when('/my_profile', {
        templateUrl: 'views/register.html',
        controller: 'AuthController',
        resolve:{
            title: function(){return 'My Profile'}
        }
    }).otherwise({
            redirectTo: '/'
        });

    $httpProvider.interceptors.push([
        '$injector', function($injector) {
            return {
                request: function(req) {
                    $injector.invoke([
                        '$http', '$auth', function($http, $auth) {
                            var key, val, _ref, _results;
                            _ref = $auth.retrieveData('auth_headers');
                            if (_ref) {
                                if ( _ref.token) {
                                    req.url = URI(req.url).removeSearch('access_token').addSearch('access_token', _ref.token) + '';
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
        '$injector', function($injector) {
            return {
                request: function(req) {
                    $injector.invoke([
                        '$http', '$auth', function($http, $auth) {
                            var key, val, _ref, _results;
                            _ref = $auth.retrieveData('auth_headers');
                            if (_ref) {
                                if ( _ref.token) {
                                    req.url = URI(req.url).removeSearch('access_token').addSearch('access_token', _ref.token) + '';
                                } else {
                                    req.url = URI(req.url).removeSearch('access_token') + '';
                                }
                                var tokenValidationPath = $auth.apiUrl() + $auth.getConfig().tokenValidationPath;
                                //alert(tokenValidationPath);
                                if (req.url.match(tokenValidationPath)) {
                                    req.url = req.url.replace('{id}', _ref.token);
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