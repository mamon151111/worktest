angular.module('AuctionApp').filter('ProfileTitleFilter', function () {

    return function (value) {
        if (value === 'Guest') {
            console.log('register '+value);
            return 'Register';
        } else {
            console.log(value);
            return 'My Profile';
        }
    };

});