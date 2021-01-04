firebase.firestore().settings({ timestampInSnapshots: true });

// When browser html is ready
$(document).ready(function () {
    function handleSidenavResize() {
        // If window resizes
        if ($(window).width() <= 800) {
            // Hide side nav
            $("#sidenav").addClass("sidenav-close");
            $("#sidenav").removeClass("sidenav-open");
        } else {
            // Show side nav
            $("#sidenav").addClass("sidenav-open");
            $("#sidenav").removeClass("sidenav-close");
        }
    };

    function handleSpendingBtnResize() {
        // If window resizes
        if ($(window).width() <= 600) {
            // Shrink spending button
            $("#new-spending-btn").addClass("floating-btn-small");
        } else {
            // Expand spending button
            $("#new-spending-btn").removeClass("floating-btn-small");
        }
    };

    // Set up sidenav
    handleSidenavResize();

    // Set up window resize functions
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
            // If sidenav is closed, open sidenav
            $("#sidenav").addClass("sidenav-open");
            $("#sidenav").removeClass("sidenav-close");
        } else {
            // If sidenav is open, close sidenav
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