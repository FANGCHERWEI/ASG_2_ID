$(document).ready(function () {
    // If window resizes, hide/show sidenav
    const handleSidenavResize = function () {
        if ($(window).width() <= 800) {
            $("#sidenav").addClass("sidenav-close");
            $("#sidenav").removeClass("sidenav-open");
        } else {
            $("#sidenav").addClass("sidenav-open");
            $("#sidenav").removeClass("sidenav-close");
        }
    }
    // Set up sidenav
    handleSidenavResize();
    // If window resizes, handle new spending button ui
    const handleSpendingBtnResize = function () {
        if ($(window).width() <= 600) {
            $("#new-spending-btn").addClass("floating-btn-small")
        } else {
            $("#new-spending-btn").removeClass("floating-btn-small")
        }
    }
    $(window).resize(function () {
        handleSidenavResize();
        handleSpendingBtnResize();
    });

    // Set up close button
    $("#close-sidenav-btn").click(function () {
        $("#sidenav").addClass("sidenav-close");
        $("#sidenav").removeClass("sidenav-open");
    });

    // Set up toggle button
    $("#sidenav-toggle-btn").click(function () {
        const width = $("#sidenav").css("width");
        if ($("#sidenav").hasClass("sidenav-close")) {
            $("#sidenav").addClass("sidenav-open");
            $("#sidenav").removeClass("sidenav-close");
        } else {
            $("#sidenav").addClass("sidenav-close");
            $("#sidenav").removeClass("sidenav-open");
        }
    });

    // Set up logout button
    $("#logout-btn").click(function (e) {
        e.preventDefault();

        // Log user out
        logout();
    });
});