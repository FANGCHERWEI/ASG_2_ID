const login = function (email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function () {
            window.location = 'spending.html';
        })
        .catch(function () {
            const errorMessage = "Email or password is wrong."
            $("#error").text(errorMessage)
            $("#error").show();
        });
}

const signup = function (email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function (data) {
            const userObject = {
                name: "",
                email: data.user.email
            }
            // Add user data to firestore
            return firebase.firestore().collection("users")
                .doc(data.user.uid)
                .set(userConverter.toFirestore(userObject, data.user.uid));
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
    firebase.auth().signOut().then(function () {
        // Remove details from local storage
        localStorage.removeItem("email");
        localStorage.removeItem("uid");
        localStorage.removeItem("name");
        localStorage.removeItem("spendings");
    });
}

const hasWindowsLocation = (pathname) => {
    return window.location.pathname === ("/itrack" + pathname) || window.location.pathname === pathname
}

firebase.auth().onAuthStateChanged(function (user) {
    let spendings = [];
    if (user) {
        // Save details to local storage
        localStorage.setItem('uid', user.uid);
        localStorage.setItem('email', user.email);
        firebase.firestore().collection("users").doc(user.uid).get().then(function (doc) {
            if (doc.exists) {
                localStorage.setItem('name', doc.data().name);
            }
        }).then(function () {
            return firebase.firestore().collection("spendings").where("userid", "==", user.uid).get();
        }).then(function (snapshot) {
            snapshot.docs.forEach(doc => {
                const spendingData = doc.data();
                const spending = new Spending(spendingData.amount, spendingData.category, spendingData.date, spendingData.note, spendingData.type, doc.id);
                spendings.push(spending);
            });
            localStorage.setItem("spendings", JSON.stringify(spendings));
        });
    } else {
        // Redirect to login if not on login/index/signup for unauthenticated users
        if (!hasWindowsLocation("/index.html") && !hasWindowsLocation("/login.html") && !hasWindowsLocation("/signup.html")) {
            window.location = './login.html';
        }
    }
});