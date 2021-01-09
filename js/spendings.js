// Add a spending
async function addSpending(spending) {
    let spendings = await getSpendings();
    await firebase.firestore().collection("spendings")
        .add(spendingConverter.toFirestore(spending, localStorage.getItem('uid')))
        .then(function (doc) {
            // Add spending to spendings
            spending.id = doc.id;
            spendings.push(spending);
            // Store spendings in local storage
            localStorage.setItem("spendings", JSON.stringify(spendings));
        }).catch(function (error) {
            console.log(error)
            throw "Unable to add spending.";
        });
};

function dateFormat(date) {
    const tokens = date.split('-');
    // Change date into DD-MM-YYYY format
    const rightDate = tokens[1] + '-' + tokens[0] + '-' + tokens[2];
    return rightDate;
}

// Edit a spending
async function editSpending(spending) {
    console.log(spending)
    let spendings = await getSpendings();
    await firebase.firestore().collection("spendings")
        .doc(spending.id)
        .update({
            amount: spending.amount,
            category: spending.category,
            date: firebase.firestore.Timestamp.fromDate(spending.date),
            type: spending.type,
            note: spending.note,
        })
        .then(function () {
            // Edit the spending in spendings
            let newSpendings = spendings.filter(function (currentSpending) {
                return currentSpending.id != spending.id;
            });
            newSpendings.push(spending);
            // Store spendings in local storage
            localStorage.setItem("spendings", JSON.stringify(newSpendings));
        })
        .catch(function (error) {
            console.log(error)
            throw "Unable to edit spending.";
        });
};

// Remove a spending
async function removeSpending(id) {
    let spendings = await getSpendings();
    await firebase.firestore().collection("spendings")
        .doc(id)
        .delete()
        .then(function (doc) {
            // Remove spending from spendings
            spendings = spendings.filter(function (currentSpending) {
                return currentSpending.id != id;
            });
            // Store spendings in local storage
            localStorage.setItem("spendings", JSON.stringify(spendings));
        }).catch(function (error) {
            console.log(error)
            throw "Unable to delete spending.";
        });
};

// Get all spendings of user
async function getSpendings() {
    const spendingsData = localStorage.getItem("spendings");
    // If spendings data is available, return it else get spendings from firebase
    if (spendingsData != null && spendingsData != "") {
        const spendings = JSON.parse(spendingsData).map(function (spending) {
            let newDate = new Date(spending.date);
            return new Spending(spending.amount, spending.category, newDate, spending.note, spending.type, spending.id);
        });
        return spendings;
    } else {
        const spendings = await getSpendingsFromFirebase(localStorage.getItem("uid"));
        // Store spendings in local storage
        localStorage.setItem("spendings", JSON.stringify(spendings));
        return spendings;
    }
};

// Get all spendings of user from firebase
async function getSpendingsFromFirebase(uid) {
    let spendings = [];
    // Get spendings from firebase
    await firebase.firestore().collection("spendings")
        .where("userid", "==", uid)
        .get().then(function (snapshot) {
            // Create spendings list
            snapshot.docs.forEach(function (doc) {
                const spendingData = doc.data();
                const spending = new Spending(spendingData.amount, spendingData.category, spendingData.date.toDate(), spendingData.note, spendingData.type, doc.id);
                spendings.push(spending);
            });
        });
    return spendings;

};

// Get spendings html code
async function getSpendingsHtml() {
    let html = "";
    let spendings = await getSpendings();
    // Iterate through spendings list
    spendings.forEach(function (spending) {
        const li = spending.getHtml();
        html += li;
    });
    return html;
};

// Get income, expense and balance stats
async function getOverallStats() {
    let spendings = await getSpendings();
    let income = 0;
    let expense = 0;
    // Iterate through spendings list
    spendings.forEach(function (spending) {
        if (spending.type === "expense") {
            expense += spending.amount;
        } else {
            income += spending.amount;
        }
    });
    return {
        income,
        expense
    }
};

// Get monthly spending breakdown
async function getMonthlySpending(month) {
    let spendings = await getSpendings();
    let monthlySpending = {};
    const expenses = ["entertainment", "transport", "bills", "home", "food"];

    // Iterate through spendings list
    spendings.forEach(function (spending) {
        const date = spending.date;
        // If spending is in the correct month
        if (new Date(spending.date).getMonth() == month && expenses.includes(spending.category)) {
            let amount = monthlySpending[spending.category];
            if (typeof amount == "undefined") {
                amount = 0;
            }
            // Add spending amount for category
            amount += spending.amount;
            monthlySpending[spending.category] = amount;
        }
    });
    return monthlySpending;
};

// Get monthly income breakdown
async function getMonthlyIncome(month) {
    let spendings = await getSpendings();
    let monthlySpending = {};
    const income = ["gift", "salary", "sales"];

    // Iterate through spendings list
    spendings.forEach(function (spending) {
        const date = spending.date;
        // If spending is in the correct month
        if (new Date(spending.date).getMonth() == month && income.includes(spending.category)) {
            let amount = monthlySpending[spending.category];
            if (typeof amount == "undefined") {
                amount = 0;
            }
            // Add spending amount for category
            amount += spending.amount;
            monthlySpending[spending.category] = amount;
        }
    });
    return monthlySpending;
};