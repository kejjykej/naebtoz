if (device.desktop()) {
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/player_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    var tv;
    var playerDefaults = { autoplay: 0, autohide: 1, modestbranding: 0, rel: 0, showinfo: 0, controls: 0, disablekb: 1, enablejsapi: 0, iv_load_policy: 3 };
    var videoId = $('#tv').data('video-id');

    $(window).on('load resize', function () {
        vidRescale();
    });
}


function onYouTubePlayerAPIReady() {
    tv = new YT.Player('tv', { events: { 'onReady': onPlayerReady, 'onStateChange': onPlayerStateChange }, playerVars: playerDefaults });
}

function onPlayerReady(event) {
    tv.loadVideoById(videoId);
    tv.setPlaybackQuality("highres");
    tv.mute();
}

function onPlayerStateChange(e) {
    if (e.data === 1) {
        $('#tv').addClass('active');
        parent.postMessage("playing", window.location.origin);
    } else if (e.data === 0) {
        tv.playVideo();
    }
}

function vidRescale() {

    var w = $(window).width(),
        h = $(window).height();

    if (w / h > 16 / 9) {
        tv.setSize(w, w / 16 * 9);
        $('.tv .screen').css({ 'left': '0px' });
    } else {
        tv.setSize(h / 9 * 16, h);
        $('.tv .screen').css({ 'left': -($('.tv .screen').outerWidth() - w) / 2 });
    }
}
// window.addEventListener("message", function (event) {

//     if (event.origin !== window.location.origin) {
//         return;
//     }

//     if (event.data === "pause") {
//         tv.pauseVideo();
//     } else if (event.data === "play") {
//         tv.playVideo();
//     }

// }, false);