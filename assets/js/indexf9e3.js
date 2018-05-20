(function ($) {

    // Convert from base64 to svg path.
    new SvgDataUri();


    // Tabs.
    var tabLink = $('.tabs__controls-link');
    tabLink.on('click', function (e) {
        e.preventDefault();
        var item = $(this).closest('.tabs__controls-item'),
            contentItem = $('.tabs__item'),
            itemPosition = item.data('tab');

        contentItem.filter('.tabs__item_' + itemPosition)
            .add(item) // добавляем в набор для одновременного выполнения
            .addClass('active')
            .siblings()
            .removeClass('active');
    });
	
	$('.gray-popup-btn').click(function () {
		if ($(this).hasClass('register-gray-btn')) $('#register-link').trigger('click');
		else $('#login-link').trigger('click');
	});


    if (device.desktop()) {
        new WOW().init();
    }

    $('.popup-trigger').magnificPopup({
        type: 'inline',
        items: {src: '.popup'},
        tLoading: ''
    })

    $('.bloger-video__link').magnificPopup({
        type: 'iframe',
        fixedContentPos: false,
        tLoading: ''
    });


    // Pupup.
    /*if($(".popup").length) {
        $('.popup-trigger').colorbox(getDefaultOpts({
            href: '.popup',
            onComplete: function () {
                $('#cboxClose').addClass('show');
            },
            onClosed: function () {
                $('#cboxClose').removeClass('show');
            }
        }));
    };

    function getDefaultOpts(customOpts) {
        var defaultOpts = $.extend({
            inline: true,
            closeButton: true,
            width: '100%',
            maxWidth: $(customOpts.href).css('maxWidth'),
            minWidth: '320px'
        },
            customOpts
        );
    
       return defaultOpts;
    };

   
*/
    $("#register-link").on("click", function () {
        if ($(window).outerWidth() <= "831") {
            $.colorbox.resize();
        };
    });

    $(window).resize(function () {
        var popupElMaxWidth = $('#cboxLoadedContent > div').css('maxWidth');
        $.colorbox.resize({
            width: window.innerWidth > parseInt(popupElMaxWidth) ? popupElMaxWidth : '100%'
        });
    });



    // Custom validation via html5 pattern.
    /* if ($("#logIn-pass").length ) {
        var loginPass = document.getElementById("logIn-pass");
        loginPass.oninvalid = function(event) {
            event.target.setCustomValidity("Пароль должен состоять из: верхний регистр, нижний регистр, цифры.");
        }
    } */

    // Profit calculator.
    var stepSlider = document.getElementById('area-range'),
        stepSliderValueElement = $('.general-range-value-wrap');

    var min = $('.profit-calculator__buttons input.first').data('min');
    var max = $('.profit-calculator__buttons input.first').data('max');
    noUiSlider.create(stepSlider, {
        start: [min],
        range: {
            'min': [min],
            'max': [max]
        },
        step: 1
    });

    stepSlider.noUiSlider.on('update', function (values, handle) {
        setRangeValue(Math.floor(values[0]));
    });

    stepSlider.noUiSlider.on('set', function (values, handle) {
        setTimeout(function () { setRangeValue(Math.floor(values[0])); }, 300);
    });

    setTimeout(setPositionValueBlock);
    $(window).resize(setPositionValueBlock);

    function setRangeValue(value) {
        value = parseInt(value);
        stepSliderValueElement.find('.general-range-value-target').text(value);
        stepSliderValueElement.find('.general-range-value-target-input').val(value);
        setPositionValueBlock();

        var count_per = $('input.profit-calculator__radio-btn:checked').data('per');

        var count = value + ((value * count_per) / 100);
        $('.profit-calculator__result-value-cost').text(Math.floor(count));
    }

    function setPositionValueBlock() {
        var left = ($('.noUi-origin').css('left'));

        stepSliderValueElement.css({
            // transform: 'translateX(' + left + ')'
            left: left
        });
    }

    $('input.profit-calculator__radio-btn + label').on('click', function() {
        setTimeout(function() {

            setRangeValue($('.general-range-value-target').text());
    
            var count_day = $('input.profit-calculator__radio-btn:checked').data('day');
    
            $('.profit-calculator__result-title-day').text(count_day);
            
            
            var min = $('input.profit-calculator__radio-btn:checked').data('min');
            var max = $('input.profit-calculator__radio-btn:checked').data('max');

            stepSlider.noUiSlider.updateOptions({
                start: [min],
                range: {
                    min: min,
                    max: max,
                },
            });

        });
    });

    $('.profit-calculator__buttons input.first').prop('checked', true).change();

    setRangeValue($('.general-range-value-target').text());

    var count_day = $('input.profit-calculator__radio-btn:checked').data('day');

    $('.profit-calculator__result-title-day').text(count_day);
    // END Profit calculator.

    // Animate numbers.
    var show = true;
    var countbox = ".our-results";

    $(window).on("scroll load resize", function () {

        if (!show) return false;

        var w_top = $(window).scrollTop();
        var e_top = $(countbox).offset().top;

        var w_height = $(window).height();
        var d_height = $(document).height();

        var e_height = $(countbox).outerHeight();

        if (w_top + 200 >= e_top || w_height + w_top == d_height || e_height + e_top < w_height) {
            $(".spincrement").spincrement({
                thousandSeparator: "",
                duration: 2000
            });

            show = false;
        }
    });
    // END Animate numbers.

    // Toggle anchors.
    $('.menu .menu__item a').click(function (e) {
        e.preventDefault();

        $('.menu .menu__item').removeClass('active');
        $(this).parent().addClass('active');
    });

    var anchors = $('.main-container').find('[data-anchor]');

    $(window).scroll(function () {
        if (!lockScroll) {
            anchors.each(function (i, item) {
                if (($(item).offset().top - 300) <= $(window).scrollTop()) {
                    $('.menu .menu__item').removeClass('active');
                    $('a[href="#' + $(item).data('anchor') + '"]').parents('.menu__item').addClass('active');
                }
            });
        }
    });

    // Scroll to the anchor.
    var elementClick, destination, lockScroll = false;

    $('a[href^="#"]').click(function (e) {
        e.preventDefault();
        elementClick = $(this).attr("href");
        destination = $(elementClick).offset().top;

        lockScroll = true;
        $('body, html').animate({ scrollTop: destination - 65}, 400, function() {
            lockScroll = false;
        });

        if($(window).innerWidth() < 500) {
            $('.close-menu-btn').trigger('click');
        }
    });


    // Scroll down
    $('.scroll-down').on('click', function () {
        var destination = $(window).innerHeight();
        $('body, html').animate({ scrollTop: destination - 65 }, 400);

        return false;
    });

})(jQuery);
