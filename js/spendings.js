const addSpending = async function (spending) {
    let spendings = await getSpendings();
    await firebase.firestore().collection("spendings")
        .add(spendingConverter.toFirestore(spending, localStorage.getItem('uid'))).then(function (doc) {
            // Add spending to spendings
            spending.id = doc.id;
            spendings.push(spending);
            localStorage.setItem("spendings", JSON.stringify(spendings));
        }).catch(function (error) {
            throw "Unable to add spending."
        });
}

const removeSpending = async function (id) {
    let spendings = await getSpendings();
    await firebase.firestore().collection("spendings")
        .doc(id)
        .delete()
        .then(function (doc) {
            // Remove spending from spendings
            spendings = spendings.filter((currentSpending) => currentSpending.id != id);
            localStorage.setItem("spendings", JSON.stringify(spendings));
        }).catch(function (error) {
            throw "Unable to delete spending."
        });
}

const getSpendings = async function () {
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
}

const getSpendingsFromFirebase = async function (uid) {
    let spendings = [];
    // Get spendings from firebase
    await firebase.firestore().collection("spendings")
        .where("userid", "==", uid)
        .get().then(snapshot => {
            // Create spendings list
            snapshot.docs.forEach(doc => {
                const spendingData = doc.data();
                const spending = new Spending(spendingData.amount, spendingData.category, spendingData.date.toDate(), spendingData.note, spendingData.type, doc.id);
                spendings.push(spending);
            });
        });
    return spendings;

}

const getSpendingsHtml = async function () {
    let html = "";
    let spendings = await getSpendings();
    spendings.forEach(spending => {
        const li = spending.getHtml();
        html += li;
    });
    return html;
}

const getOverallStats = async function () {
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
}