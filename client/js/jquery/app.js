(function ($) {
    "use strict";
    $.fn.yDatepicker = function () {};
    $(document).ready(function () {
        $('.menu .main-menu-item.root > a').bind('click', function (event) {
            var $this = $(this),
                div,
                token = true,
                docHandler;

            event.preventDefault();

            div = $(this).parents('.root');

            docHandler = function (event) {
                if (token) {
                    token = false;
                    return;
                }
                div.removeClass('expanded').addClass('collapsed');
                $(document).unbind('click', docHandler);
            };

            if (div.hasClass('collapsed')) {
                div.removeClass('collapsed').addClass('expanded');
                $(document).bind('click', docHandler);
            }
        });

    });
    $('.datepicker').yDatepicker();
}(jQuery));