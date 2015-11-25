angular.module('AuctionApp').filter('username', function() {

    return function(value) {
        if (value) {
            return value;
        } else {
            return 'Guest';
        }
    }

})