async function login(email, password) {
    await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function () {
            // Redirect to spending page
            window.location = 'spending.html';
        })
        .catch(function () {
            // Show error message
            const errorMessage = "Email or password is wrong.";
            $("#error").text(errorMessage);
            $("#error").show();
        });
};

async function signup(email, password) {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function (data) {
            // Create user object
            const userObject = {
                name: "",
                email: data.user.email
            };
            // Add user data to firestore
            return firebase.firestore().collection("users")
                .doc(data.user.uid)
                .set(userConverter.toFirestore(userObject, data.user.uid));
        })
        .then(function () {
            // Show success message
            const errorMessage = "User is created.";
            $("#success").text(errorMessage);
            $("#success").show();
        })
        .catch(function (error) {
            // Show error message
            const errorMessage = "An error occurred.";
            $("#error").text(errorMessage);
            $("#error").show();
        });
};

async function logout() {
    await firebase.auth().signOut().then(function () {
        // Remove data from local storage
        localStorage.removeItem("email");
        localStorage.removeItem("uid");
        localStorage.removeItem("name");
        localStorage.removeItem("spendings");
    }).then(function () {
        // Redirect to login
        window.location = './login.html';
    });
};

function hasWindowsLocation(pathname) {
    return window.location.pathname === ("/itrack" + pathname) || window.location.pathname === pathname || window.location.pathname === ("/ASG_2_ID/" + pathname);
};

firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
        // Save details to local storage
        localStorage.setItem('uid', user.uid);
        localStorage.setItem('email', user.email);
        await firebase.firestore().collection("users").doc(user.uid).get().then(function (doc) {
            if (doc.exists) {
                localStorage.setItem('name', doc.data().name);
            }
        }).then(function () {
            // Get user spendings
            return firebase.firestore().collection("spendings").where("userid", "==", user.uid).get();
        }).then(async function (snapshot) {
            // Get spendings from firestore and store in local storage
            const spendings = await getSpendingsFromFirebase(user.uid);
            localStorage.setItem("spendings", JSON.stringify(spendings));
        });
    } 
});
