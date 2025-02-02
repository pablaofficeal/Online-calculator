let display = document.getElementById('display');
let historyList = document.getElementById('history-list');

// Load history from LocalStorage
loadHistory();

function clearDisplay() {
    display.innerText = '0';
}

function appendToDisplay(value) {
    if (display.innerText === '0') {
        display.innerText = value;
    } else {
        display.innerText += value;
    }
}

function calculateResult() {
    try {
        let result = eval(display.innerText);
        addToHistory(display.innerText + ' = ' + result);
        display.innerText = result;
    } catch (error) {
        display.innerText = 'Error';
        setTimeout(() => {
            clearDisplay();
        }, 1500);
    }
}

function addToHistory(entry) {
    const timestamp = new Date().getTime();
    let history = JSON.parse(localStorage.getItem('calcHistory')) || [];
    history.push({ entry, timestamp });

    // Keep history for one month
    const oneMonthAgo = timestamp - 30 * 24 * 60 * 60 * 1000;
    history = history.filter(item => item.timestamp > oneMonthAgo);

    localStorage.setItem('calcHistory', JSON.stringify(history));
    displayHistory();
}

function displayHistory() {
    let history = JSON.parse(localStorage.getItem('calcHistory')) || [];
    historyList.innerHTML = '';
    history.forEach(item => {
        let li = document.createElement('li');
        li.innerText = item.entry;
        historyList.appendChild(li);
    });
}

function loadHistory() {
    displayHistory();
}