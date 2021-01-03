class Spending {
    constructor(amount, category, date, note, type, id) {
        this.amount = parseInt(amount);
        this.category = category;
        this.date = date;
        this.note = note;
        this.type = type;
        this.id = id;
    }

    equals(other) {
        return other.id == this.id;
    }

    toString() {
        return '(' + this.id + ', ' + this.amount + ', ' + this.category + ', ' + this.date + ', ' + this.note + ', ' + this.type + ')';
    }

    getHtml() {
        // Get icon and text colour for expense or income
        let icon, textColour;
        if (this.type == "expense") {
            icon = '<i class="material-icons red-text">arrow_drop_down</i>';
            textColour = 'red-text';
        } else {
            icon = '<i class="material-icons green-text">arrow_drop_up</i>';
            textColour = 'green-text';
        }

        // Set note to empty string if undefined
        let note;
        if (typeof this.note === 'undefined') {
            note = "";
        } else {
            note = this.note;
        }

        const li = `
            <li class="white-card w-100" id=${this.id}>
                <div class="d-flex justify-content-between">
                    <div>
                        <h4 class="spendings-title">${this.category}</h4>
                        <p class="date-text">${new Date(this.date).toDateString()}</p>
                    </div>
                    <div>
                        <i class="material-icons spendings-icon edit-spending-btn">create</i>
                        <i class="material-icons spendings-icon delete-spending-btn">delete</i>
                    </div>
                </div>
                <div class="d-flex justify-content-between">
                    <p class="my-0 spendings-note">${note}</p>
                    <div class="d-flex align-items-center">
                        ${icon}
                        <p class="price-text ${textColour} my-0">${this.amount}</p>
                    </div>
                </div>
            </li>
        `;
        return li;
    }
}

let spendingConverter = {
    toFirestore: function (spending, uid) {
        // Extra field userid to tag spending to a particular user
        let spendingObject = {
            amount: spending.amount,
            category: spending.category,
            date: firebase.firestore.Timestamp.fromDate(spending.date),
            type: spending.type,
            note: spending.note,
            userid: uid
        };

        return spendingObject;
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options);
        return new Spending(data.amount, data.category, data.date, data.note, data.type, data.id);
    }
};