firebase.firestore().settings({ timestampInSnapshots: true });

const setUpSpendings = (data) => {
    let html = "";
    const expenses = ['Food', 'Entertainment', 'Home', 'Transport', 'Others', 'Bills'];

    // Create spendings list html
    data.forEach(doc => {
        const spending = doc.data();

        // Get icon and text colour for expense or income
        let icon, textColour;
        if (expenses.includes(spending.category)) {
            icon = '<i class="material-icons red-text">arrow_drop_down</i>';
            textColour = 'red-text';
        } else {
            icon = '<i class="material-icons green-text">arrow_drop_up</i>';
            textColour = 'green-text';
        }

        const li = `
            <li class="white-card w-100">
                <div class="d-flex justify-content-between">
                    <div>
                        <h4>${spending.category}</h4>
                        <p class="date-text">${spending.date.toDate().toDateString()}</p>
                    </div>
                    <div>
                        <i class="material-icons spendings-icon">create</i>
                        <i class="material-icons spendings-icon">delete</i>
                    </div>
                </div>
                <div class="d-flex justify-content-between">
                    <p class="my-0">${spending.note}</p>
                    <div class="d-flex align-items-center">
                        ${icon}
                        <p class="price-text ${textColour} my-0">${spending.amount}</p>
                    </div>
                </div>
            </li>
        `;
        html += li;
    });

    $("#spendings").html(html);
}

// Set up spendings
firebase.firestore().collection("spendings")
    .where("userid", "==", localStorage.getItem('uid'))
    .get().then(snapshot => {
        setUpSpendings(snapshot.docs);
    });

// Create a spending
$("#create-spending-form").submit(function (e) {
    e.preventDefault();
    const date = $("#create-spending-form").find("input[name='date']").val();
    const amount = $("#create-spending-form").find("input[name='amount']").val();
    const category = $("#create-spending-form").find("select[name='category']").val();
    const note = $("#create-spending-form").find("input[name='note']").val();
    const spending = new Spending(amount, category, date, note);

    // Validate date
    if (!validateDate(date)) {
        $("#error").text("Date should be in the correct format and in the future.")
        $("#error").show();
        return;
    }

    // Validate amount
    if (!validateAmount(amount)) {
        $("#error").text("Amount should be between 0 and 10000000")
        $("#error").show();
        return;
    }

    // Insert spending into transactions
    console.log(spendingConverter.toFirestore(spending, localStorage.getItem('uid')))
    firebase.firestore().collection("spendings").add(spendingConverter.toFirestore(spending, localStorage.getItem('uid')));
});

// Set up categories
firebase.firestore().collection("categories").get().then(snapshot => {
    let html = '';
    snapshot.docs.forEach(data => {
        let category = data.data();
        html += `<option value="${category.value}">${category.name}</option>`;
    });
    console.log(html)
    // $("#categories").html(categories);
});


