var spendings = [];

const addSpending = function (spending) {
    firebase.firestore().collection("spendings")
        .add(spendingConverter.toFirestore(spending, localStorage.getItem('uid'))).then(function () {
            // Add spending to spendings
            spendings.push(spending);
            localStorage.setItem("spendings", spendings)
            $("#popup-success").text("New spending created. Refresh to view changes.")
        }).catch(function () {
            $("#popup-error").text("An error occurred.")
        });
}

const removeSpending = function (id) {
    firebase.firestore().collection("spendings")
        .doc(id)
        .get()
        .then(function (doc) {
            // Remove spending from spendings
            if (doc.exists) {
                let spendingData = data.data();
                spendings.filter((currentSpending) => currentSpending.equals(spendingData));
                localStorage.setItem("spendings", spendings);
            }
        }).catch(function () {
        });
}

const setSpendingsHtml = function () {
    let html = "";
    firebase.firestore().collection("spendings")
        .where("userid", "==", localStorage.getItem('uid'))
        .get().then(snapshot => {
            // Create spendings list html
            snapshot.docs.forEach(doc => {
                const spendingData = doc.data();
                const spending = new Spending(spendingData.amount, spendingData.category, spendingData.date, spendingData.note, spendingData.type);
                const li = spending.getHtml();
                html += li;
            });

            localStorage.setItem("spendings", spendings);

            // Set up spendings
            $("#spendings").html(html);
        });
}