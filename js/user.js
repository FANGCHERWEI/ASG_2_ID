class User {
    constructor(name, email, password) {
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

var userConverter = {
    toFirestore: function (user) {
        let userObject = {
            name: user.name,
            email: user.email,
        }
        return userObject;
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options);
        return new User(data.name, data.email);
    }
};