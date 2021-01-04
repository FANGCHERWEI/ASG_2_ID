class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    equals(other) {
        return (other.name == this.name) && (other.email == this.email);
    }

    toString() {
        return this.name + ', ' + this.email;
    }
}

// Convert user object to and from firestore object
let userConverter = {
    toFirestore: function (user, uid) {
        let userObject = {
            name: user.name,
            email: user.email,
            uid: uid
        };
        return userObject;
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options);
        return new User(data.name, data.email);
    }
};

async function updateName(uid, name) {
    // Update name in firestore
    await firebase.firestore().collection("users").doc(uid).update({
        "name": name
    }).then(function () {
        // Show success message
        $("#success").text("Update is successful");
        $("#success").show();
        localStorage.setItem("name", name);
    }).catch(function () {
        // Show error message
        $("#error").text("An error occurred");
        $("#error").show();
    });
};