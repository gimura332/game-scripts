// ==UserScript==
// @name         Bomb Finder Ultimate
// @match        https://1wqjnb.com/casino/play/1play_1play_mines?p=ur4o*
// @grant        none
// @run-at       document-end
// ==/UserScript==

function cheat() {
    // 1. Находим ВСЕ элементы на странице
    const allElements = document.querySelectorAll('*');
    
    // 2. Помечаем бомбы и сундуки
    allElements.forEach(el => {
        if (el.textContent === 'X' || el.textContent === '☒') {
            el.style.cssText = `
                background: red !important;
                color: white !important;
                border: 2px solid black !important;
            `;
            el.textContent = '💣 БОМБА';
        }
        
        if (el.textContent === '☐' || el.textContent === '*') {
            el.style.cssText = `
                background: green !important;
                color: white !important;
                border: 2px solid black !important;
            `;
            el.textContent = '💰 СУНДУК';
        }
    });
    
    // 3. Статистика в углу экрана
    const bombs = document.querySelectorAll('[style*="background: red"]').length;
    const treasures = document.querySelectorAll('[style*="background: green"]').length;
    
    let hint = document.getElementById('cheat-hint');
    if (!hint) {
        hint = document.createElement('div');
        hint.id = 'cheat-hint';
        hint.style.cssText = `
            position: fixed;
            top: 10px;
            left: 10px;
            background: black;
            color: white;
            padding: 10px;
            z-index: 99999;
            font-family: Arial;
            font-size: 18px;
        `;
        document.body.appendChild(hint);
    }
    hint.textContent = `💣 Бомб: ${bombs} | 💰 Сундуков: ${treasures}`;
}

// Запускаем каждую секунду
setInterval(cheat, 1000);
