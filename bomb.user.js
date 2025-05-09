// ==UserScript==
// @name         Treasure Hunt Helper
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Показывает бомбы (X) и сундуки (☐) в реальном времени
// @match        https://1wqjnb.com/casino/play/1play_1play_mines?p=ur4o*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // Стиль для подсветки элементов
    const style = document.createElement('style');
    style.innerHTML = `
        .bomb-cell { background: rgba(255, 0, 0, 0.5) !important; }
        .treasure-cell { background: rgba(0, 255, 0, 0.5) !important; }
        .hint-label {
            position: fixed;
            top: 10px;
            left: 10px;
            background: black;
            color: white;
            padding: 10px;
            z-index: 9999;
            font-family: Arial;
        }
    `;
    document.head.appendChild(style);

    // Функция поиска элементов
    function scanField() {
        // Ищем все ячейки поля (адаптируйте под ваш HTML)
        const cells = document.querySelectorAll('div.cell, td.cell, span.cell');

        cells.forEach(cell => {
            // Проверяем содержимое ячейки
            if (cell.textContent.includes('X') || cell.textContent.includes('☒')) {
                cell.classList.add('bomb-cell');
            } else if (cell.textContent.includes('☐') || cell.textContent.includes('*')) {
                cell.classList.add('treasure-cell');
            }
        });

        // Показываем статистику
        const bombsFound = document.querySelectorAll('.bomb-cell').length;
        const treasuresFound = document.querySelectorAll('.treasure-cell').length;

        // Обновляем подсказку
        let hint = document.querySelector('.hint-label');
        if (!hint) {
            hint = document.createElement('div');
            hint.className = 'hint-label';
            document.body.appendChild(hint);
        }
        hint.textContent = `💣 Бомб: ${bombsFound} | 💰 Сундуков: ${treasuresFound}`;
    }

    // Запускаем сканирование каждую секунду
    setInterval(scanField, 1000);

    // Первый запуск
    scanField();
})();
