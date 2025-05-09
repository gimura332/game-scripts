// ==UserScript==
// @name         Mines 1 Win Ultimate Hack
// @namespace    http://tampermonkey.net/
// @version      4.0
// @description  Показывает все мины и призы в реальном времени
// @match        https://1wqjnb.com/casino/play/1play_1play_mines?p=ur4o*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // 1. Создаем стили для подсветки
    const style = document.createElement('style');
    style.innerHTML = `
        .mine-cell {
            background: rgba(255, 0, 0, 0.7) !important;
            box-shadow: 0 0 10px red !important;
        }
        .prize-cell {
            background: rgba(0, 255, 0, 0.7) !important;
            box-shadow: 0 0 10px lime !important;
        }
        #mines-hack-info {
            position: fixed;
            top: 10px;
            left: 10px;
            background: rgba(0,0,0,0.9);
            color: white;
            padding: 10px;
            z-index: 99999;
            font-family: Arial;
            border: 2px solid gold;
            border-radius: 5px;
        }
    `;
    document.head.appendChild(style);

    // 2. Функция для поиска и пометки клеток
    function scanField() {
        // Находим все клетки поля
        const cells = document.querySelectorAll('.cell, .tile, [class*="grid"] > div');
        
        cells.forEach(cell => {
            // Проверяем наличие мины (адаптируйте под ваш случай)
            if (cell.getAttribute('data-type') === 'mine' || 
                cell.textContent === 'X' || 
                cell.innerHTML.includes('mine')) {
                cell.classList.add('mine-cell');
            }
            // Проверяем наличие приза
            else if (cell.getAttribute('data-type') === 'diamond' || 
                     cell.textContent === '💎' || 
                     cell.innerHTML.includes('diamond')) {
                cell.classList.add('prize-cell');
            }
        });

        // Обновляем информационную панель
        updateInfoPanel();
    }

    // 3. Информационная панель
    function updateInfoPanel() {
        let panel = document.getElementById('mines-hack-info');
        if (!panel) {
            panel = document.createElement('div');
            panel.id = 'mines-hack-info';
            document.body.appendChild(panel);
        }
        panel.innerHTML = `
            <div>💣 Мин: ${document.querySelectorAll('.mine-cell').length}</div>
            <div>💎 Призов: ${document.querySelectorAll('.prize-cell').length}</div>
            <div>⏱ ${new Date().toLocaleTimeString()}</div>
        `;
    }

    // 4. Запускаем сканирование
    const observer = new MutationObserver(scanField);
    observer.observe(document.body, { 
        childList: true, 
        subtree: true,
        attributes: true
    });

    // Первое сканирование через 5 секунд
    setTimeout(() => {
        scanField();
        console.log('[Mines Hack] Скрипт активирован!');
    }, 5000);
})();
