AuctionApp.directive('datepicker', function() {
    return {
        restrict: 'A',
        require : 'ngModel',
        link : function (scope, element, attrs, ngModelCtrl) {
            var dateFormat = 'mm/dd/yy';
            ngModelCtrl.$formatters.push(function(data) {
                if (data) {
                    return $.datepicker.formatDate(dateFormat, new Date(data));
                }
            });
            (function($) {

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