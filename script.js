document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('taxForm');
    const modal = document.getElementById('resultModal');
    const resultText = document.getElementById('resultText');

    // Function to enforce input to accept only numbers
    const numberInputs = document.querySelectorAll('.number-input');
    numberInputs.forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
        });
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        calculateTax();
    });


    // logic we use to calculate the ovreall 
    function calculateTax() {
        const grossIncome = parseFloat(document.getElementById('grossIncome').value);
        const extraIncome = parseFloat(document.getElementById('extraIncome').value) || 0;
        const ageGroup = document.getElementById('ageGroup').value;
        const totalDeductions = parseFloat(document.getElementById('totalDeductions').value) || 0;

        let tax = 0;
        if (ageGroup === '<40') {
            if (grossIncome + extraIncome - totalDeductions > 800000) {
                tax = (grossIncome + extraIncome - totalDeductions - 800000) * 0.3;
            }
        } else if (ageGroup === '40-60') {
            if (grossIncome + extraIncome - totalDeductions > 800000) {
                tax = (grossIncome + extraIncome - totalDeductions - 800000) * 0.4;
            }
        } else if (ageGroup === '>=60') {
            if (grossIncome + extraIncome - totalDeductions > 800000) {
                tax = (grossIncome + extraIncome - totalDeductions - 800000) * 0.1;
            }
        }

        if (tax < 0) {
            tax = 0;
        }

        showModal(tax.toFixed(2));
    }

    function showModal(result) {
        resultText.textContent = `Your overall income will be ₹${result} after tax deductions`;
        modal.style.display = 'block';
    }

    // Close the modal when the user clicks on the close buton
    document.getElementsByClassName('close')[0].addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Close the modal when the user clicks anywhere outside of the modal contant
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Show text on hover for all info icons
    $('.info-icon').hover(function() {
        $(this).append('<span class="tooltip">Gross Annual income is your total salary in a year before any deductions</span>');
    }, function() {
        $(this).find('.tooltip').remove();
    });
});

// <!-- ////////////////////AYUSH_RAJ////////////////// -->