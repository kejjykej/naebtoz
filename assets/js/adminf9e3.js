$(function () {

    // Convert from base64 to svg path.
    new SvgDataUri();

    // Add date into sidebar.
    addDate($('.time__date'));

    // Add clock into sidebar and run every 1sec.
    var timeClock = $('.time__clock');
    setInterval(function () {
        runClock(timeClock)
    }, 1000);

    //customize select
    $('.form__select').select2({
        placeholder: 'Выберите платежную систему',
        minimumResultsForSearch: 5,
        width: '100%'
    });

    if ($('.bloger-video__link').length) {
        $('.bloger-video__link').magnificPopup({
            type: 'iframe',
            fixedContentPos: false,
            tLoading: ''
        });
    }


    // Validate passwords.
    if ($('#pass1').length) {
        var password = document.getElementById("pass1"),
        confirm_password = document.getElementById("rep-pass1");
        
        function validatePassword() {
            if (password.value != confirm_password.value) {
                confirm_password.setCustomValidity("Пароли не совпадают");
            } else {
                confirm_password.setCustomValidity('');
            }
        }
        
        password.onchange = validatePassword;
        confirm_password.onkeyup = validatePassword;
    }

	// автовыплата, проверка суммы, для рф фикс
	if ($('#pay-system').length) {
		var selectObj = $('#pay-system');
		selectObj.on('change', function(){
			var optionSel = selectObj.find('option:selected'),
				name = optionSel.data('name'),
				reg = optionSel.data('reg'),
				example = optionSel.data('example'),
				min = optionSel.data('min'),
				max = optionSel.data('max');
			// Sum in tip
			$('.tip-min-sum').html(min);
			$('.tip-max-sum').html(max);
			// Min and max sum in input
			$(".form__input--amount").attr('min', min);
			$(".form__input--amount").attr('max', max);
			// Account num title
			$('.account-num-title').html(name);
			$('#acc-num').attr('placeholder', example);
			$('#acc-num').attr('pattern', reg.slice(1, -1));
			// Trigger sum input
			$(".form__input--amount").trigger('blur');
		});
	}
    
    // Validate amount input.
    if ($(".form__input--amount").length) {
        var amountInput = $(".form__input--amount");
        amountInput.on("blur", function() {
            var $this = $(this),
                inputVal = $this.val(),
                form = $this.closest(".form"),
                submitBtn = form.find(".green-btn.form-btn"),
                message = $(".tip-block--right"),				
				min = parseInt(amountInput.attr('min')),
				max = parseInt(amountInput.attr('max'));
				
            if( inputVal >= min && inputVal <= max ) {
                message.removeClass("active");
                submitBtn.attr("disabled", false);
            } else {
                message.addClass("active");
                submitBtn.attr("disabled", true);
            }
        });
    }
    
    // Mobile sidebar.
    var openSidebarBtn = $(".sidebar__btn"),
        sidebar = $(".admin__sidebar"),
        menuLink = $(".nav__link");

    openSidebarBtn.on("click", function() {
        sidebar.toggleClass("open-sidebar");
    });
    
    if($(window).outerWidth() <= "767") {
        menuLink.on("click", function() {
            openSidebarBtn.trigger("click");
        });
    };
    

});


function addDate(elem) {
    var date = new Date();

    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    var yy = date.getFullYear();
    if (yy < 10) yy = '0' + yy;

    var finalDate = dd + '.' + mm + '.' + yy;
    elem.text(finalDate);
};

function runClock(elem) {
    var date = new Date();

    var hh = date.getHours();
    if (hh < 10) hh = '0' + dd;

    var min = date.getMinutes();
    if (min < 10) min = '0' + min;

    var sec = date.getSeconds();
    if (sec < 10) sec = '0' + sec;

    var finalTime = hh + ':' + min + ':' + sec;
    elem.text(finalTime);
}


function CalcTimePercent(i, lastpayment, nextpayment, t, p) {

    perc = (t - lastpayment) * 100 / (nextpayment - lastpayment);
    document.getElementById('percentline' + i).style.width = perc + '%';

    var time = nextpayment - t;
    var hour = parseInt(time / 3600);
    if (hour < 1) hour = 0;
    time = parseInt(time - hour * 3600);
    if (hour < 10) hour = '0' + hour;



    var minutes = parseInt(time / 60);
    if (minutes < 1) minutes = 0;
    time = parseInt(time - minutes * 60);
    if (minutes < 10) minutes = '0' + minutes;
    var seconds = time;
    if (seconds < 10) seconds = '0' + seconds;

    timer = hour + ':' + minutes + ':' + seconds;
    document.getElementById('deptimer' + i).innerHTML = timer;

    if (timer == "00:00:00") {
        top.location.href = '/deposits/';
    }

    t = t + 1;
    setTimeout("CalcTimePercent(" + i + ", " + lastpayment + ", " + nextpayment + ", " + t + ", " + p + ")", 1000);
}
