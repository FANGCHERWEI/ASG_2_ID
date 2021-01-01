class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    equals(other) {
        return other.name == this.name
            && other.email == this.email;
    }

    toString() {
        return this.name + ', ' + this.email;
    }
}

let userConverter = {
    toFirestore: function (user, uid) {
        let userObject = {
            name: user.name,
            email: user.email,
            uid
        }
        return userObject;
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options);
        return new User(data.name, data.email);
    }
};

const updateName = function (uid, name) {
    firebase.firestore().collection("users").doc(uid).update({
        "name": name
    }).then(function () {
        $("#success").text("Update is successful");
        $("#success").show();
        localStorage.setItem("name", name);
    }).catch(function () {
        $("#error").text("An error occurred");
        $("#error").show();
    });
}