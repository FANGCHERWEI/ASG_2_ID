// Check whether email is in valid format
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


function validatePassword(password) {
    if (password.length < 6) {
        return false;
    }

    return true;
}

function validateDate(date) {
    const tokens = date.split('-');
    if (tokens.length != 3) {
        return false;
    }

    // Check if date is valid
    let newDate;
    const timestamp = Date.parse(date);
    if (isNaN(timestamp) == false) {
        newDate = new Date(timestamp);
    } else {
        return false;
    }

    // Check if date is in the past
    if (newDate > new Date()) {
        return false;
    }

    return true;
}

function validateAmount(amount) {
    if (amount <= 0 || amount >= 10000000) {
        return false;
    }

    return true;
}

function validateName(name) {
    if (name.length > 20 || name == "" || !name.match(/^[0-9a-z]+$/)) {
        return false;
    }

    return true;
}