(function ($) {

    // Fixed menu.
    var header = $('.header-inner-fixed'), headerClassName = 'small-header';
    $(window).scroll(function () {
        if ($(window).scrollTop() > 30) {
            header.addClass('small-header').removeClass('no-backg');
        } else if (header.hasClass('small-header')) {
            header.removeClass('small-header').addClass('no-backg');
        }
    });
    
    $('.open-menu-btn').click(function() {
        $('.mobile-menu').addClass('open');
        $('.menu-overlay').addClass('show');
    });

    $('.close-menu-btn').click(function () {
        $('.mobile-menu').removeClass('open');
        $('.menu-overlay').removeClass('show');
    });

    $('.menu-overlay').on('click', function() {
        $('.close-menu-btn').trigger('click');
    });

    $(window).on('resize', function () {
        if ($(window).scrollTop() > 30) {
            header.addClass(headerClassName);
        } else if (header.hasClass(headerClassName)) {
            header.removeClass(headerClassName);
        }
    });

    // Arrow scroll top.
    var afterScroll = 200,
        upArrow = $('.up-scroll');
    $(window).scroll(function () {
        var condition = $(window).scrollTop() > afterScroll;
        condition ? upArrow.addClass('show') : upArrow.removeClass('show');
    });
    upArrow.click(function () {
        $('html, body').animate({ scrollTop: 0 }, '400');
    });
    
})(jQuery);
