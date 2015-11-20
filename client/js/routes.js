AuctionApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LotController'
    }).when('/', {
            templateUrl: 'views/lotslist.html',
            controller: 'LotController'
        }).otherwise({
            redirectTo: '/'
        })
}]);