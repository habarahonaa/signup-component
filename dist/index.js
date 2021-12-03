function main() {

    // DOM elements
    const form = document.querySelector(".signInForm");
    const formElements = form.elements;
    const fnameHelper = document.querySelector(".fname__helper");
    const lnameHelper = document.querySelector(".lname__helper");
    const emailHelper = document.querySelector(".email__helper");
    const passHelper = document.querySelector(".pass__helper");
    let invalidCount = 0;

    // Form validations
    function validateFormElements(form) {
        for (let element = 0; element < form.length; element++) {
            if (form[element].name === "fname" || form[element].name === "lname") {
                checkName(form[element]);
            } else if (form[element].type === "email") {
                isEmail(form[element]);
            } else if(form[element].type == "password") {
                isPassword(form[element]);
            }
        }
        return true;
    };
    
    function checkName(formElement) {
        if (formElement.value && formElement.name === "fname") {
            fnameHelper.classList.add("display__none");
            validElement(formElement);
        } else if(formElement.value && formElement.name === "lname") {
            lnameHelper.classList.add("display__none");
            validElement(formElement);
        } else if(formElement.name === "fname" && !formElement.value) {
            fnameHelper.classList.remove("display__none");
            invalidElement(formElement);
            invalidCount++;
        } else {
            lnameHelper.classList.remove("display__none");
            invalidElement(formElement);
            invalidCount++;
        }
    };

    const isEmail = formEmail => {
        const regex = /^(\w*[@]{1}\w*\.{1}\w{2,5})/;
        let email = formEmail.value.trim();
        if (regex.test(email)) {
            emailHelper.classList.add("display__none");
            validElement(formEmail);
        } else {
            emailHelper.classList.remove("display__none");
            invalidElement(formEmail);
            invalidCount++;
        }
    }
    
    function isPassword(formPassword) {
        if (formPassword.value.length > 7) {
            passHelper.classList.add("display__none");
            validElement(formPassword);
        } else if (formPassword.value.length < 7 && formPassword.value.length > 0) {
            passHelper.textContent = "Password must be at least 8 characters";
            passHelper.classList.remove("display__none");
            invalidElement(formPassword);
            invalidCount++;
        } else {
            passHelper.textContent = "Password cannot be empty";
            passHelper.classList.remove("display__none");
            invalidElement(formPassword);
            invalidCount++;
        }
    };
    
    function validElement(formElement) {
        formElement.classList.add("form__valid");
        formElement.classList.remove("form__error");
        return true;
    };
    function invalidElement(formElement) {
        formElement.classList.add("form__error");
        formElement.classList.remove("form__valid")
        return false;
    };

    // Prevent form submission to validate elements
    function preventSubmit(event) {
        event.preventDefault();
        invalidCount = 0;
        validateFormElements(formElements);
        if (invalidCount === 0) {
            form.submit();
        }
    }

    form.addEventListener("submit", preventSubmit);

}

main();


