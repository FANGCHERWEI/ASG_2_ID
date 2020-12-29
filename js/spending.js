class Spending {
    constructor(amount, category, date, note) {
        this.amount = amount;
        this.category = category;
        this.date = date;
        this.note = note
    }
    toString() {
        return this.amount + ', ' + this.category + ', ' + this.date + ', ' + this.note;
    }
}

var spendingConverter = {
    toFirestore: function (spending, uid) {
        let spendingObject = {
            amount: spending.amount,
            category: spending.category,
            date: firebase.firestore.Timestamp.fromDate(new Date(spending.date)),
            userid: uid
        }
        if (typeof spending.note !== "undefined" && spending.note != null) {
            spendingObject.note = spending.note;
        }
        return spendingObject;
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options);
        return new Spending(data.amount, data.category, data.date, data.note);
    }
};
