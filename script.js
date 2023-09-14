const cardNameInput = document.querySelector("form #cardName"),
    cardNumberInput = document.querySelector("form #cardNumber"),
    cardMonthInput = document.querySelector("form #cardMonth"),
    cardYearInput = document.querySelector("form #cardYear"),
    cardCvcInput = document.querySelector("form #cardCvc");

const cardName = document.querySelector(".front-card .name"),
    cardNumber = document.querySelector(".front-card .card-number"),
    cardMonth = document.querySelector(".front-card .exp-date .month"),
    cardYear = document.querySelector(".front-card .exp-date .year"),
    cardCvc = document.querySelector(".back-card .cvc");

let nameValid = false,
    numberValid = false,
    dateValid = false,
    cvcValid = false;

cardNameInput.addEventListener("input", () => {
    const name = cardNameInput.value.replace(/[0-9]/g, "");
    cardNameInput.value = name;
    cardName.textContent = cardNameInput.value;

    function validateVisaName(name) {
        let pattern = /^[A-Za-z\s']+ [A-Za-z\s']+$/;
        return pattern.test(name);
    }

    if (validateVisaName(cardNameInput.value.trim())) {
        document.querySelector("form .name-error-span").textContent = "";
        return (nameValid = true);
    } else if (cardNameInput.value.trim() === "") {
        document.querySelector("form .name-error-span").textContent =
            "can't be blank";
        cardName.textContent = "ahmed elshahat";
        return (nameValid = false);
    } else {
        document.querySelector("form .name-error-span").textContent =
            "name must be contain frist and last name";
        return (nameValid = false);
    }
});

cardNumberInput.addEventListener("input", () => {
    const numericInput = cardNumberInput.value.replace(/\D/g, "");
    cardNumberInput.value = numericInput;

    function validateVisaCardNumber(cardNumber) {
        const pattern = /^4\d{15}$/;
        if (numericInput.length === 16) {
            if (pattern.test(cardNumber)) {
                document.querySelector("form .number-error-span").textContent =
                    "";
                let formattedCardNumber = cardNumber.replace(/(\d{4})/g, "$1 ");
                return (numberValid = true), formattedCardNumber.trim();
            } else {
                document.querySelector("form .number-error-span").textContent =
                    "card number must start with 4 and 15 digits";
                return (numberValid = false);
            }
        } else if (cardNumberInput.value.trim() === "") {
            document.querySelector("form .number-error-span").textContent =
                "can't be blank";
            return (numberValid = false);
        } else {
            document.querySelector("form .number-error-span").textContent = "";
            let formattedCardNumber = cardNumber.replace(/(\d{4})/g, "$1 ");
            return formattedCardNumber.trim();
        }
    }

    let formattedCardNumber = validateVisaCardNumber(cardNumberInput.value);

    if (!formattedCardNumber) {
        cardNumber.innerHTML = "4xxx xxxx xxxx xxxx";
    } else {
        cardNumber.innerHTML = formattedCardNumber;
    }
});

cardMonthInput.addEventListener("input", () => {
    const month = cardMonthInput.value.replace(/\D/g, "");
    cardMonthInput.value = month;
    if (cardMonthInput.value.length === 1) {
        cardMonth.textContent = `0${cardMonthInput.value}`;
    } else {
        cardMonth.textContent = cardMonthInput.value;
    }
    document.querySelector("form .date-error-span").textContent = "";

    if (/^([1-12])$/.test(month)) {
        const currentDate = new Date();
        if (parseInt(month, 10) >= currentDate.getMonth() + 1) {
            document.querySelector("form .date-error-span").textContent = "";
            // cardMonth.textContent = cardMonthInput.value;
        }
    } else if (month > 12) {
        cardMonth.textContent = "xx";
        document.querySelector("form .date-error-span").textContent =
            "wrong month";
    } else if (cardMonthInput.value.trim() === "") {
        document.querySelector("form .date-error-span").textContent =
            "can't be blank";
        cardMonth.textContent = "00";
        return (dateValid = false);
    }
});

cardYearInput.addEventListener("input", () => {
    const month = cardMonthInput.value.replace(/\D/g, "");
    const year = cardYearInput.value.replace(/\D/g, "");
    cardYearInput.value = year;
    if (cardYearInput.value.length === 1) {
        cardYear.textContent = `${cardYearInput.value}x`;
    } else {
        cardYear.textContent = cardYearInput.value;
    }
    document.querySelector("form .date-error-span").textContent = "";

    if (
        /^(0[1-9]|1[0-2])$/.test(month) &&
        /^(00|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])$/.test(
            year
        )
    ) {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;

        if (
            parseInt(year, 10) > currentYear ||
            (parseInt(year, 10) === currentYear &&
                parseInt(month, 10) >= currentDate.getMonth() + 1)
        ) {
            document.querySelector("form .date-error-span").textContent = "";
            return (dateValid = true);
        } else {
            document.querySelector("form .date-error-span").textContent =
                "expired date";
            return (dateValid = false);
        }
    } else if (cardYearInput.value.trim() === "") {
        document.querySelector("form .date-error-span").textContent =
            "can't be blank";
        cardYear.textContent = "00";
        return (dateValid = false);
    } else {
        document.querySelector("form .date-error-span").textContent =
            "invalid date";
        return (dateValid = false);
    }
});

cardCvcInput.addEventListener("input", () => {
    const cvc = cardCvcInput.value.replace(/\D/g, "");
    cardCvcInput.value = cvc;
    if (cardCvcInput.value.length === 1) {
        cardCvc.textContent = `${cardCvcInput.value}XX`;
    } else if (cardCvcInput.value.length === 2) {
        cardCvc.textContent = `${cardCvcInput.value}X`;
    } else {
        cardCvc.textContent = cardCvcInput.value;
    }

    if (/^\d{3}$/.test(cvc)) {
        document.querySelector("form .cvc-error-span").textContent = "";
        return (cvcValid = true);
    } else {
        document.querySelector("form .cvc-error-span").textContent =
            "must contain 3 digits";
        return (cvcValid = false);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const paymentForm = document.querySelector("form");

    paymentForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const form = document.querySelector("form");
        const successMessage = document.querySelector(".success-message");
        const validationMessage = document.getElementById("validationMessage");

        if (nameValid && numberValid && dateValid && cvcValid) {
            form.style.display = "none";
            successMessage.style.display = "flex";
            validationMessage.textContent = "";
        } else {
            validationMessage.textContent = "please check your information !!!";
        }
    });
});

const successContinueBtn = document.getElementById("successContinueBtn");

successContinueBtn.addEventListener("click", () => {
    const form = document.querySelector("form");
    const formInputs = document.querySelectorAll("form input");
    const successMessage = document.querySelector(".success-message");

    form.style.display = "flex";
    successMessage.style.display = "none";
    formInputs.forEach((input) => {
        input.value = "";
        nameValid = false;
        numberValid = false;
        dateValid = false;
        cvcValid = false;
    });
    cardName.textContent = "ahmed elshahat";
    cardNumber.textContent = "0000 0000 0000 0000";
    cardMonth.textContent = "00";
    cardYear.textContent = "00";
    cardCvc.textContent = "000";
});
