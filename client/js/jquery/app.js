(function ($) {
    "use strict";
    $(document).ready(function () {
        $('.menu .main-menu-item.collapsed a').bind('click', function (event) {
            var $this = $(this),
                div,
                docHandler;
            event.preventDefault();
            event.stopImmediatePropagation();
            div = $(this).parents('.collapsed');

            div.removeClass('collapsed').addClass('expanded');
            alert('ccc');

            docHandler = function (event) {
                alert(event.target);
                if ($(event.target).closest('.expanded') !== div
                        || $(event.target) === $this
                        || $(event.target).closest('a') === $this
                        ) {
                    div.removeClass('expanded').addClass('collapsed');
                    $(document).unbind('click', docHandler);
                }
            };

            $(document).bind('click', docHandler);
        });
    });
}(jQuery));