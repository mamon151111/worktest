AuctionApp.directive('datepicker', function() {
    return {
        restrict: 'A',
        require : 'ngModel',
        link : function (scope, element, attrs, ngModelCtrl) {
            (function($) {
                var dateFormat = 'mm/dd/yy';
                $(element).datepicker({
                    dateFormat:dateFormat,
                    onSelect:function (date) {
                        scope.$apply(function () {
                            ngModelCtrl.$setViewValue(new Date(date));
                        });
                    }
                });
            })(jQuery);

        }
    }
});