/********* event handlers **********/ 

inputName.addEventListener('keyup', (e) => {
    checkValue(e,isValidUsername, inputName);
});

emailInput.addEventListener('keyup', (e) => {
     checkValue(e,isValidEmail, emailInput);
});

otherJob.addEventListener('keyup', (e) => {
    checkValue(e,isValidJob, otherJob);
});

creditCrdInput.addEventListener('keyup', (e) => {
    checkValue(e,isValidCard, creditCrdInput);
});

zipCodeInput.addEventListener('keyup', (e) => {
    checkValue(e,isValidZip, zipCodeInput);
});

ccvInput.addEventListener('keyup', (e) => {
    checkValue(e,isValidCvv, ccvInput);
});


activities.addEventListener('change', (e) => {
    
    if (e.target.checked) {
        total = total + +e.target.dataset.cost;
        totalDiv.style.display = '';

        for (let i = 0; i < checkboxes.length; i++) {

            if (e.target.dataset.dayAndTime == checkboxes[i].firstElementChild.attributes[2].textContent) {
                checkboxes[i].firstElementChild.disabled = true;
                e.target.disabled = false;
                
            } 
            if (checkboxes[i].firstElementChild.disabled == true) {
                    checkboxes[i].style = "text-decoration: line-through";
            }
        }        
    } else if (!e.target.checked && total > 0) {
        total = total - +e.target.dataset.cost;
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].firstElementChild.disabled = false;
            checkboxes[i].style = "text-decoration: inherit";   
        }  
    } 

    if (total > 0) {
        totalDiv.innerHTML = `<h3>TOTAL: $${total}</h3>`;
    } else {
        totalDiv.innerHTML = '';
    }
}) 

title.addEventListener('change', () => {
    if (title.value == 'other') {
        otherJob.style.display = '';
        otherJob.focus();
    } else {
        otherJob.style.display = 'none';
    }
});


design.addEventListener('change', () => {
    if (design.value == "Select Theme") {
        colors.style.display = 'none';
    } else if (design.value == "js puns") {
        colors.style.display = '';
        colorOptions.selectedIndex = 0;
        colorOptions[0].style.display = '';
        colorOptions[1].style.display = '';
        colorOptions[2].style.display = '';
        colorOptions[3].style.display = 'none';
        colorOptions[4].style.display = 'none';
        colorOptions[5].style.display = 'none';  
    } else if (design.value == "heart js") {
        colors.style.display = '';
        colorOptions.selectedIndex = 3;
        colorOptions[0].style.display = 'none';
        colorOptions[1].style.display = 'none';
        colorOptions[2].style.display = 'none';
        colorOptions[3].style.display = '';
        colorOptions[4].style.display = '';
        colorOptions[5].style.display = '';
    }
});


payment.addEventListener('change', (e) => {
    
    if (e.target.value == 'credit card') {
        creditCard.style.display = '';
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';
    } else if (e.target.value == 'paypal') {
        paypal.style.display = '';
        creditCard.style.display = 'none';
        bitcoin.style.display = 'none';
    } else if (e.target.value == 'bitcoin') {
        bitcoin.style.display = '';
        creditCard.style.display = 'none';
        paypal.style.display = 'none';
    } else {
        creditCard.style.display = 'none';
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';
    }
});

button.addEventListener('submit', (e) => {
    e.preventDefault();

    checkValueBtn(inputName, isValidUsername);
    checkValueBtn(emailInput, isValidEmail);
    checkValueBtn(otherJob, isValidJob);
    checkValueBtn(creditCrdInput, isValidCard);
    checkValueBtn(zipCodeInput, isValidZip);
    checkValueBtn(ccvInput, isValidCvv);

    if (design.value == 'Select Theme') {
        console.log('no theme');
    } 
    if (totalDiv.firstElementChild == null) {
        console.log('no activities');
        totalDiv.style.display = ''
        totalDiv.innerHTML = `<p style="color:#FF7F50">**Please choose at least one seminar</p>`;
    } else {
        totalDiv.innerHTML = '';
        
    }

});