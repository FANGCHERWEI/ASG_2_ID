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
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function () {
            window.location = 'spending.html';
        })
        .catch(function (error) {
            const errorMessage = "Email or password is wrong."
            $("#error").text(errorMessage)
            $("#error").show();
        });
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
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function () {
            const errorMessage = "User is created."
            $("#success").text(errorMessage)
            $("#success").show();
        })
        .catch(function (error) {
            const errorMessage = "An error occurred."
            $("#error").text(errorMessage)
            $("#error").show();
        });
});

$("#logout-btn").click(function (e) {
    e.preventDefault();

    // Log user out
    firebase.auth().signOut();
});

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        localStorage.setItem('uid', user.uid);
        localStorage.setItem('email', user.email);
    } else {
        if (!hasWindowsLocation("/index.html") && !hasWindowsLocation("/login.html") && !hasWindowsLocation("/signup.html")) {
            window.location = './login.html';
        }
    }
});

const hasWindowsLocation = (pathname) => {
    return window.location.pathname === ("/itrack" + pathname) || window.location.pathname === pathname
}