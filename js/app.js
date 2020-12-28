$(document).ready(function () {
    $(window).on('scroll', function () {
        var scroll = $(window).scrollTop();
        if (scroll >= 50) {
            $('.sticky').addClass('home-nav-sticky');
        } else {
            $('.sticky').removeClass('home-nav-sticky');
        }
    });
});