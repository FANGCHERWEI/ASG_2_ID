$(document).ready(function () {
    // If window resizes, hide/show sidenav
    const resize = function () {
        if ($(window).width() <= 800) {
            $("#sidenav").addClass("sidenav-close");
            $("#sidenav").removeClass("sidenav-open");
        } else {
            $("#sidenav").addClass("sidenav-open");
            $("#sidenav").removeClass("sidenav-close");
        }
    }
    $(window).resize(function () {
        resize();
    });

    // Set up close button
    $("#close-sidenav-btn").click(function () {
        $("#sidenav").addClass("sidenav-close");
        $("#sidenav").removeClass("sidenav-open");
    });

    // Set up toggle button
    $("#sidenav-toggle-btn").click(function () {
        const width = $("#sidenav").css("width");
        console.log(width);
        if ($("#sidenav").hasClass("sidenav-close")) {
            $("#sidenav").addClass("sidenav-open");
            $("#sidenav").removeClass("sidenav-close");
        } else {
            $("#sidenav").addClass("sidenav-close");
            $("#sidenav").removeClass("sidenav-open");
        }
    });
});