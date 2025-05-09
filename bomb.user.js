// ==UserScript==
// @name         CAVEMINES Hack
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Показывает бомбы и сундуки в реальном времени
// @match        https://1wqjnb.com/casino/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // Ждем полной загрузки игры
    setTimeout(() => {
        const highlightElements = () => {
            // 1. Находим игровое поле (адаптируйте под ваш случай)
            const gameField = document.querySelector('.game-field') || 
                             document.querySelector('.game-board') ||
                             document.querySelector('main');

            // 2. Ищем все кликабельные элементы внутри поля
            const clickableItems = gameField.querySelectorAll('div, button, a');

            // 3. Помечаем элементы
            clickableItems.forEach(item => {
                // Если элемент содержит изображение бомбы
                if (item.innerHTML.includes('bomb') || 
                    item.innerHTML.includes('ловушка') || 
                    item.getAttribute('onclick')?.includes('bomb')) {
                    item.style.cssText = `
                        background: red !important;
                        border: 3px solid black !important;
                        color: white !important;
                    `;
                    item.innerHTML = '💣 БОМБА';
                }
                
                // Если элемент содержит изображение сундука
                if (item.innerHTML.includes('treasure') || 
                    item.innerHTML.includes('сундук') || 
                    item.getAttribute('onclick')?.includes('win')) {
                    item.style.cssText = `
                        background: green !important;
                        border: 3px solid black !important;
                        color: white !important;
                    `;
                    item.innerHTML = '💰 СУНДУК';
                }
            });

            // 4. Создаем информационную панель
            let panel = document.getElementById('hack-panel');
            if (!panel) {
                panel = document.createElement('div');
                panel.id = 'hack-panel';
                panel.style.cssText = `
                    position: fixed;
                    top: 10px;
                    left: 10px;
                    background: rgba(0,0,0,0.8);
                    color: white;
                    padding: 10px;
                    z-index: 99999;
                    font-family: Arial;
                    border: 2px solid gold;
                `;
                document.body.appendChild(panel);
            }
            panel.innerHTML = `
                <div>💣 Бомб: ${document.querySelectorAll('[style*="background: red"]').length}</div>
                <div>💰 Сундуков: ${document.querySelectorAll('[style*="background: green"]').length}</div>
                <div>🔄 Обновлено: ${new Date().toLocaleTimeString()}</div>
            `;
        };

        // Запускаем проверку каждые 2 секунды
        setInterval(highlightElements, 2000);
        
        // Первый запуск
        highlightElements();
    }, 5000); // Даем игре 5 секунд на загрузку
})();
