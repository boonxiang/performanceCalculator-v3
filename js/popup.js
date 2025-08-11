//validtation of popup 
let popup = document.getElementById("popup");

//use to popup form
function openPopup() {
    popup.classList.add("open-popup");
}

//use to remove form
function closePopup() {
    popup.classList.remove("open-popup")
}

// JavaScript for the Monthly Yield Calculator Popup
function openMonthlyYieldCalculatorPopup() {
    const popup = document.getElementById('monthlyYieldCalculatorPopup');
    popup.classList.add('active');
}

function closeMonthlyYieldCalculatorPopup() {
    const popup = document.getElementById('monthlyYieldCalculatorPopup');
    popup.classList.remove('active');
}

// Optional: Close popup when clicking outside of it
document.addEventListener('click', function (event) {
    const popupOverlay = document.getElementById('monthlyYieldCalculatorPopup');
    const popupContainer = popupOverlay.querySelector('.popup-container');
    if (popupOverlay.classList.contains('active') && !popupContainer.contains(event.target) && event.target !== document.querySelector('.btnCalculate')) {
        closeMonthlyYieldCalculatorPopup();
    }
});