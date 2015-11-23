AuctionApp.directive('authPassword', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.authPassword = function(modelValue, viewValue) {

                if (!scope.user) {
                    return true;
                }

                if (!modelValue) {
                    return true;
                }

                if (/[^\w\d\-]/.test(modelValue)) {
                    return false;
                }

                if (modelValue.length < 6) {
                    return false;
                }
                return true;
            }

        }
    }
});

AuctionApp.directive('authPasswordConfirm', function() {
    return {
        require: 'ngModel',
        scope: {
            password: '=password'
        },
        link: function(scope, elm, attrs, ctrl) {

            ctrl.$validators.authPasswordConfirm = function(modelValue, viewValue) {
                if (!scope.password) {
                    return true;
                }

                if (scope.password !==modelValue) {
                    return false;
                }

                return true;
            }

        }
    }
});

AuctionApp.directive('authUsername', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {

            ctrl.$validators.username = function(modelValue, viewValue) {
                if (!modelValue) {
                    return true;
                }

                if (/[^\w\d]/.test(modelValue)) {
                    return false;
                }

                return true;
            }

        }
    }
});