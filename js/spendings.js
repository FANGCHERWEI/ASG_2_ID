async function addSpending(spending) {
    let spendings = await getSpendings();
    await firebase.firestore().collection("spendings")
        .add(spendingConverter.toFirestore(spending, localStorage.getItem('uid')))
        .then(function (doc) {
            // Add spending to spendings
            spending.id = doc.id;
            spendings.push(spending);
            localStorage.setItem("spendings", JSON.stringify(spendings));
        }).catch(function (error) {
            throw "Unable to add spending.";
        });
};


function dateFormat(date) {
    const tokens = date.split('-');
    const rightDate = tokens[1] + '-' + tokens[0] + '-' + tokens[2];
    return rightDate;
}

async function editSpending(spending) {
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
            let newSpendings = spendings.filter(function (currentSpending) {
                return currentSpending.id != spending.id;
            });
            newSpendings.push(spending);
            localStorage.setItem("spendings", JSON.stringify(newSpendings));
        })
        .catch(function (error) {
            throw "Unable to edit spending.";
        });
};

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
            localStorage.setItem("spendings", JSON.stringify(spendings));
        }).catch(function (error) {
            throw "Unable to delete spending.";
        });
};

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
        localStorage.setItem("spendings", JSON.stringify(spendings));
        return spendings;
    }
};

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

async function getSpendingsHtml() {
    let html = "";
    let spendings = await getSpendings();
    spendings.forEach(function (spending) {
        const li = spending.getHtml();
        html += li;
    });
    return html;
};

async function getOverallStats() {
    let spendings = await getSpendings();
    let income = 0;
    let expense = 0;
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

async function getMonthlySpending(month) {
    let spendings = await getSpendings();
    let monthlySpending = {};
    spendings.forEach(function (spending) {
        const date = spending.date;
        if (new Date(spending.date).getMonth() == month) {
            let amount = monthlySpending[spending.category];
            if (typeof amount == "undefined") {
                amount = 0;
            }
            amount += spending.amount;
            monthlySpending[spending.category] = amount;
        }
    });
    return monthlySpending;
};