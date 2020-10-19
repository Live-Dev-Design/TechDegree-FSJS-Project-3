/********* event handlers **********/ 
// event listener for input fields that calls the 'checkValue' function depending on the target element
document.addEventListener('keyup', (e) => {
    if (e.target == inputName) {
        checkValue(e,isValidUsername, inputName); 
    } else if (e.target == emailInput) {
        checkValue(e,isValidEmail, emailInput);
    } else if (e.target == otherJob) {
        checkValue(e,isValidJob, otherJob);
    } else if (e.target == creditCrdInput) {
        checkValue(e,isValidCard, creditCrdInput);
    } else if (e.target == zipCodeInput) {
        checkValue(e,isValidZip, zipCodeInput);
    } else if (e.target == ccvInput) {
        checkValue(e,isValidCvv, ccvInput);
    } 
});

// checkboxes event listener
activities.addEventListener('change', (e) => {
    const checkboxes = document.querySelectorAll('.activities label')
    // if checkbox is checked
    if (e.target.checked) {
        total = total + +e.target.dataset.cost; // total = total + the checkbox cost
        totalDiv.style.display = '';    // show the total amount once first checkbox is checked

        for (let i = 0; i < checkboxes.length; i++) {
            // if targets date and time match any other date and time
            if (e.target.dataset.dayAndTime == checkboxes[i].firstElementChild.attributes[2].textContent) {
                checkboxes[i].firstElementChild.disabled = true; // disable all those checkboxes
                e.target.disabled = false; // ensure target checkbox is not disabled
            } 
            // if checkboxes are disabled
            if (checkboxes[i].firstElementChild.disabled == true) {
                    checkboxes[i].style = "text-decoration: line-through"; // create a line through the option
            }
        }        
    } else if (!e.target.checked && total > 0) { // if checkbox is not checked AND total is greater than 0
        total = total - +e.target.dataset.cost; // let total = total subtract the cost
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].firstElementChild.disabled = false; // enable all checkboxes
            checkboxes[i].style = "text-decoration: inherit";    // revert line through text if there is one
        }  
    } 
    // if the total is greater than 0
    if (total > 0) {
        totalDiv.innerHTML = `<h3>TOTAL: $${total}</h3>`; // display amount in div using a template literal
    } else {
        totalDiv.innerHTML = ''; // remove div html if total is 0
    }
}) 

// listening for changes to the job title selection
title.addEventListener('change', () => {
    if (title.value == 'other') {   // if "other" is chosen display the input for 'other' job role and focus on input field
        otherJob.style.display = '';
        otherJob.focus();
    } else {
        otherJob.style.display = 'none';    // else hide the other input field
    }
});

// listening for changes to the t-shirt design
design.addEventListener('change', () => {
    const colorOptions = document.getElementById('color'); 
    // if design selection is default 'select theme' don't display color options
    if (design.value == "Select Theme") {
        colors.style.display = 'none';
    } else if (design.value == "js puns") { // if design selection is "js puns"
        colors.style.display = ''; // show color options
        colorOptions.selectedIndex = 0; // show default text as first option for this design
        colorOptions[0].style.display = ''; // show first 3 options that would match and hide rest
        colorOptions[1].style.display = '';
        colorOptions[2].style.display = '';
        colorOptions[3].style.display = 'none';
        colorOptions[4].style.display = 'none';
        colorOptions[5].style.display = 'none';  
    } else if (design.value == "heart js") { // if design selection is "heart js"
        colors.style.display = ''; // show color options
        colorOptions.selectedIndex = 3; // show default text as first option for this design
        colorOptions[0].style.display = 'none'; // show first 3 options that would match and hide rest
        colorOptions[1].style.display = 'none';
        colorOptions[2].style.display = 'none';
        colorOptions[3].style.display = '';
        colorOptions[4].style.display = '';
        colorOptions[5].style.display = '';
    }
});

// listening for changes to payment options
payment.addEventListener('change', (e) => {
    const creditCard = document.getElementById('credit-card');
    // if selected the credit card
    if (e.target.value == 'credit card') {
        creditCard.style.display = ''; // show credit card options and hide rest
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';
    } else if (e.target.value == 'paypal') { // if selected paypal
        paypal.style.display = '';  // show paypal options and hide rest
        creditCard.style.display = 'none';
        bitcoin.style.display = 'none';
    } else if (e.target.value == 'bitcoin') { // if selected bitcoin
        bitcoin.style.display = ''; // show bitcoin options and hide rest
        creditCard.style.display = 'none';
        paypal.style.display = 'none';
    } else {  // else hide all options if select payment method is chosen
        creditCard.style.display = 'none';
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';
    }
});

// button listener for submission 
button.addEventListener('click', (e) => {
    e.preventDefault(); // prevent default behaviour when used
    // checking to see if all necessary fields have a valid value
    checkValueBtn(inputName, isValidUsername);
    checkValueBtn(emailInput, isValidEmail);
    checkValueBtn(otherJob, isValidJob);
    checkValueBtn(creditCrdInput, isValidCard);
    checkValueBtn(zipCodeInput, isValidZip);
    checkValueBtn(ccvInput, isValidCvv);
    // if design is on default value
    if (design.value == 'Select Theme') {
        console.log('no theme');
    } 
    // if no total the show message to choose an option
    if (totalDiv.firstElementChild == null) { 
        totalDiv.style.display = ''
        totalDiv.innerHTML = `<p style="color:#FF7F50">**Please choose at least one option</p>`;
    } else {
        totalDiv.innerHTML = ''; // else hide the message
        
    }

});