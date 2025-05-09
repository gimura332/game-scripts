// ==UserScript==
// @name         Mines 1 Win Hacker
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  Показывает все бомбы и сундуки в Mines 1 Win
// @match        https://1wqjnb.com/casino/play/1play_1play_mines?p=ur4o*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // Ждем полной загрузки игры
    const init = () => {
        // 1. Находим игровое поле
        const gameBoard = document.querySelector('.game-container') || 
                         document.querySelector('.mines-field') ||
                         document.querySelector('main');

        if (!gameBoard) {
            console.log('[Mines Hacker] Игровое поле не найдено, повторная попытка...');
            setTimeout(init, 2000);
            return;
        }

        console.log('[Mines Hacker] Игра обнаружена!');

        // 2. Создаем стили для подсветки
        const style = document.createElement('style');
        style.innerHTML = `
            .mines-bomb {
                background: #ff0000 !important;
                color: white !important;
                font-weight: bold !important;
                border: 3px solid black !important;
            }
            .mines-treasure {
                background: #00ff00 !important;
                color: white !important;
                font-weight: bold !important;
                border: 3px solid black !important;
            }
            #mines-hack-panel {
                position: fixed;
                top: 10px;
                left: 10px;
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 10px;
                z-index: 99999;
                font-family: Arial;
                border: 2px solid gold;
            }
        `;
        document.head.appendChild(style);

        // 3. Функция для поиска и пометки элементов
        const scanField = () => {
            // Ищем все клетки
            const cells = gameBoard.querySelectorAll('div[class*="cell"], div[class*="tile"]');

            cells.forEach(cell => {
                // Проверяем на бомбу
                if (cell.getAttribute('data-bomb') === 'true' || 
                    cell.innerHTML.includes('bomb') || 
                    cell.textContent === 'X') {
                    cell.classList.add('mines-bomb');
                    cell.textContent = '💣';
                }
                // Проверяем на сундук
                else if (cell.getAttribute('data-treasure') === 'true' || 
                         cell.innerHTML.includes('diamond') || 
                         cell.textContent === '💎') {
                    cell.classList.add('mines-treasure');
                    cell.textContent = '💰';
                }
            });

            // Обновляем панель
            updatePanel();
        };

        // 4. Панель информации
        const updatePanel = () => {
            let panel = document.getElementById('mines-hack-panel');
            if (!panel) {
                panel = document.createElement('div');
                panel.id = 'mines-hack-panel';
                document.body.appendChild(panel);
            }
            panel.innerHTML = `
                <div>💣 Бомб: ${document.querySelectorAll('.mines-bomb').length}</div>
                <div>💰 Сундуков: ${document.querySelectorAll('.mines-treasure').length}</div>
                <div>🕒 ${new Date().toLocaleTimeString()}</div>
            `;
        };

        // Запускаем сканирование каждые 2 секунды
        setInterval(scanField, 2000);
        scanField();

        console.log('[Mines Hacker] Скрипт активирован!');
    };

    // Даем игре 10 секунд на загрузку
    setTimeout(init, 10000);
})();
