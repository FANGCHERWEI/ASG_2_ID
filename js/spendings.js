const addSpending = async function (spending) {
    var spendings = await getSpendings();
    firebase.firestore().collection("spendings")
        .add(spendingConverter.toFirestore(spending, localStorage.getItem('uid'))).then(function () {
            // Add spending to spendings
            spendings.push(spending);
            localStorage.setItem("spendings", JSON.stringify(spendings));
            $("#popup-success").text("New spending created. Refresh to view changes.")
        }).catch(function () {
            $("#popup-error").text("An error occurred.")
        });
}

const removeSpending = async function (id) {
    var spendings = await getSpendings();
    firebase.firestore().collection("spendings")
        .doc(id)
        .get()
        .then(function (doc) {
            // Remove spending from spendings
            if (doc.exists) {
                let spendingData = doc.data();
                spendings = spendings.filter((currentSpending) => !currentSpending.equals(spendingData));
                localStorage.setItem("spendings", JSON.stringify(spendings));
            }
        }).catch(function () {
        });
}

const getSpendings = async function () {
    const spendingsData = localStorage.getItem("spendings");
    // If spendings data is available, return it else get spendings from firebase
    if (spendingsData != null && spendingsData != "") {
        const spendings = JSON.parse(spendingsData).map(function (spending) {
            const newDate = new Date(spending.date.seconds * 1000 + spending.date.nanoseconds / 1000000);
            return new Spending(spending.amount, spending.category, newDate, spending.note, spending.type);
        });
        return spendings;
    } else {
        const spendings = await getSpendingsFromFirebase(localStorage.getItem("uid"));
        localStorage.setItem("spendings", JSON.stringify(spendings));
        return spendings;
    }
}

const getSpendingsFromFirebase = async function (uid) {
    var spendings = [];
    // Get spendings from firebase
    await firebase.firestore().collection("spendings")
        .where("userid", "==", uid)
        .get().then(snapshot => {
            // Create spendings list
            snapshot.docs.forEach(doc => {
                const spendingData = doc.data();
                const spending = new Spending(spendingData.amount, spendingData.category, spendingData.date.toDate(), spendingData.note, spendingData.type);
                spendings.push(spending);
            });
        });
    return spendings;

}

const setSpendingsHtml = async function () {
    let html = "";
    var spendings = await getSpendings();
    spendings.forEach(spending => {
        const li = spending.getHtml();
        html += li;
    });

    // Set up spendings
    $("#spendings").html(html);
}

const getOverallStats = async function () {
    var spendings = await getSpendings();
    var income = 0;
    var expense = 0;
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