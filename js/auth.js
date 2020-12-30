const login = function (email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function () {
            window.location = 'spending.html';
        })
        .catch(function (error) {
            const errorMessage = "Email or password is wrong."
            $("#error").text(errorMessage)
            $("#error").show();
        });
}

const signup = function (email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function () {
            return firebase.firestore().collection("users")
                .add(userConverter.toFirestore(user));
        })
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
}

const logout = function () {
    firebase.auth().signOut();
}

const hasWindowsLocation = (pathname) => {
    return window.location.pathname === ("/itrack" + pathname) || window.location.pathname === pathname
}

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