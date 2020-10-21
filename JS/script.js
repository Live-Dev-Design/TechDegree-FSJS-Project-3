/***********************************************
Treehouse Techdegree: FSJS Project 3 - Interactive Form
***********************************************/

/***************** 
    variables
 *****************/
const inputName = document.querySelector('#name');
const emailInput = document.getElementById('mail');
const title = document.getElementById('title');
const design = document.getElementById('design');
const colors = document.getElementById('shirt-colors');
const otherJob = document.getElementById('other-title');
const activities = document.querySelector('.activities');
const totalDiv = document.createElement('div');
const payment = document.getElementById('payment');
const creditCrdInput = document.getElementById('cc-num');
const zipCodeInput = document.getElementById('zip');
const cvvInput = document.getElementById('cvv');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');
const button = document.querySelector('button');
const shirt = document.querySelector('.shirt');
let total = 0; // total cost to start at $0

/****************** 
    functions 
******************/
function init() {
    // create elements for warnings and total cost
    const nameErrorSpan = document.createElement('span');
    const emailErrorSpan = document.createElement('span');
    const designErrorSpan = document.createElement('span');
    const creditErrorSpan = document.createElement('span');
    const zipErrorSpan = document.createElement('span');
    const cvvErrorSpan = document.createElement('span');
    const OtherErrorSpan = document.createElement('span');
        
    inputName.focus(); // focus on first input name field on load

    // warning messages below as template literals:
    const inputNameMsg = `<p style="color:#ff3838">**Please enter your name using upper or lower case letters only</p>`;
    const inputEmailMsg = `<p style="color:#ff3838">**Please enter a valid email address</p>`;
    const inputCardMsg = `<p style="color:#ff3838">**Please enter a valid card number</p>`;
    const inputZipMsg = `<p style="color:#ff3838">**Please enter valid zip code</p>`;
    const inputCvvMsg = `<p style="color:#ff3838">**Please enter a 3 digit cvv number</p>`;
    const inputOtherMsg = `<p style="color:#ff3838">**Please enter your job role using upper or lower case letters</p>`;
    // call functions to insert messages into span divs but display to none
    warnings(inputName, nameErrorSpan, inputNameMsg); // users name
    warnings(emailInput, emailErrorSpan, inputEmailMsg); // email
    warnings(creditCrdInput, creditErrorSpan, inputCardMsg); // credit card
    warnings(zipCodeInput, zipErrorSpan, inputZipMsg); // zip code
    warnings(cvvInput, cvvErrorSpan, inputCvvMsg); // cvv
    warnings(otherJob, OtherErrorSpan, inputOtherMsg); // Other job role
    // display none, selection index and append elements
    otherJob.style.display = 'none';  // "other" job input field set to display none
    colors.style.display = 'none'; // "color" option for shirts set to display none
    totalDiv.style.display = 'none'; // cost total in checkbox area set to display none
    activities.appendChild(totalDiv); // appending the total div to activities
    payment.selectedIndex = 1; // make the credit card the first visible option on dropwdown payment method
    paypal.style.display = 'none'; // hide the paypal payment option content
    bitcoin.style.display = 'none'; // hide the bitcoin payment option content
    design.parentElement.parentElement.parentElement.appendChild(designErrorSpan);
    designErrorSpan.style.display = 'none';
    designErrorSpan.innerHTML = `<p style="color:#ff3838">**Please choose a shirt size and design</p>`;
}

// function to insert warning messages after input fields but display to none.
function warnings(input, errorSpan, msg) {
    input.insertAdjacentElement('afterend', errorSpan); // insert span element after input field
    input.nextElementSibling.innerHTML = msg; // assign innerHTML to warning message
    input.nextElementSibling.style.display = 'none'; // hide span element
}

///// Validating Input fields //////
// Must be a valid name of upper or lower case letters
function isValidUsername(name) {
    return /^[a-zA-z\s?]+$/.test(name);
}
// Must be a valid email address
function isValidEmail(email) {
    // regex used from https://emailregex.com/
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
// Must be a valid name of upper or lower case letters
function isValidJob(job) {
    return /^[a-zA-z\s?]+$/.test(job);
}
// Must be a valid credit card number between 13 -16 digits
function isValidCard(card) {
  return /^\d{13,16}$/.test(card);  
}
// Must be a valid zip code of 5 digits
function isValidZip(zipNo) {
  return /^\d{5}$/.test(zipNo);  
}
// Must be a valid cvv number of 3 digits
function isValidCvv(digits) {
  return /^\d{3}$/.test(digits);  
}

// use validators to check if input values are correct and if not show warning span message with red input border
function checkValue(event, valid, input) {
    // if input is validated true OR input length is 0 then set warning span display to 'none' and assign no border color
    if (valid(event.target.value) || event.target.value.length == 0) {
        input.nextElementSibling.style.display = 'none';
        input.style.borderColor = '';
    } else { // else span to display and border color to red
        input.nextElementSibling.style.display = '';
        input.style.borderColor = 'red';
    }
}

// if input field values are empty then display warning message for button
function checkValueBtn(input, valid) {
    // if input is not empty AND is validated true then span warning display to none and no border
    if (input.value !== '' && valid(input.value)) {
        input.nextElementSibling.style.display = 'none';
        input.style.borderColor = '';
    } else { // else show warning span and color input border red
        input.nextElementSibling.style.display = '';
        input.style.borderColor = 'red';
    }
    // if 'other' job role is not displayed then keep display to none and no border
    if (input.style.display == 'none' && input.id == 'other-title' ) {
        input.nextElementSibling.style.display = 'none';
        input.style.borderColor = '';
    }
}

// final submit validator of all fields //
function btnValidator() {
    // if all relevant fields are correctly filled in the page will reload
    if (isValidUsername(inputName.value) && isValidEmail(emailInput.value) && total > 0 && design.value !== "Select Theme") {
            if (payment.value == "credit card" && isValidCard(creditCrdInput.value) && isValidZip(zipCodeInput.value) && isValidCvv(cvvInput.value)) {
                window.location.reload(); // reload page
            } else if (payment.value !== "credit card" && payment.value !== "select method") {
                window.location.reload(); // reload page
            }
    } else { // else validation is run on relevant input fields with warning messages for incorrect inputs
        checkValueBtn(inputName, isValidUsername);
        checkValueBtn(emailInput, isValidEmail);
        checkValueBtn(otherJob, isValidJob);
        checkValueBtn(creditCrdInput, isValidCard);
        checkValueBtn(zipCodeInput, isValidZip);
        checkValueBtn(cvvInput, isValidCvv);
        // if design is on default value
        if (design.value == 'Select Theme') {
            shirt.lastElementChild.style.display = ''; // add warning
        } else {
            shirt.lastElementChild.style.display = 'none'; // remove warning if there is one
        }
        // if no 'total' cost then show message to choose an option
        if (totalDiv.firstElementChild == null) {  // if not total div is displayed
            totalDiv.style.display = '' // display total div
            totalDiv.innerHTML = `<p style="color:#ff3838">**Please choose at least one option</p>`; // add paragraph warning message
        } else if (total > 0) { // if 'total' is greater that 0
            totalDiv.style.display = '' // display the total div
            totalDiv.innerHTML = `<h3>TOTAL: $${total}</h3>`; // display amount in div using a template literal
        } else {
            totalDiv.innerHTML = ''; // else hide the message   
        }
    }
}

/*********************
    call functions 
**********************/
init();