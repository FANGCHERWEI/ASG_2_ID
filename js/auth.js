// Attach a submit handler to the login form
$("#login-form").submit(function (event) {
    $("#error").hide();
    // Prevent form submission
    event.preventDefault();

    var $form = $(this);
    const email = $form.find("input[name='email']").val();
    const password = $form.find("input[name='password']").val();

    // Check if all fields are filled
    if (email == "" || password == "") {
        $("#error").text("Please fill in all fields.")
        $("#error").show();
        return;
    }

    // Check if email is valid
    if (!validateEmail(email)) {
        $("#error").text("Please enter a valid email.")
        $("#error").show();
        return;
    }

    // Log user in
});

// Attach a submit handler to the signup form
$("#signup-form").submit(function (event) {
    $("#success").hide();
    $("#error").hide();

    // Prevent form submission
    event.preventDefault();

    var $form = $(this);
    const email = $form.find("input[name='email']").val();
    const password = $form.find("input[name='password']").val();
    const confirmPassword = $form.find("input[name='confirm-password']").val();

    // Check if all fields are filled
    if (email == "" || password == "") {
        $("#error").text("Please fill in all fields.")
        $("#error").show();
        return;
    }

    // Check if email is valid
    if (!validateEmail(email)) {
        $("#error").text("Please enter a valid email.")
        $("#error").show();
        return;
    }

    // Check if password length >= 6
    if (!validatePassword(password)) {
        $("#error").text("Password must be at least 6 characters.")
        $("#error").show();
        return;
    }

    // Check if both passwords are equal
    if (password != confirmPassword) {
        $("#error").text("Both passwords must match.")
        $("#error").show();
        return;
    }

    // Sign up user

});

$("#logout-btn").click(function (e) {
    e.preventDefault();

    // Log user out
})