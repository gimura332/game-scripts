// ==UserScript==
// @name         Bomb Finder (CORS Bypass)
// @match        https://1wqjnb.com/casino/play/1play_1play_mines?p=ur4o*
// @grant        GM_xmlhttpRequest
// @connect      1wqjnb.com
// @connect      service-worker.best
// ==/UserScript==

(function() {
    'use strict';

    // 1. Спрячем скрипт в DOM, чтобы Service Worker его не блокировал
    const script = document.createElement('script');
    script.innerHTML = `
        // Ваш код для поиска бомб
        function findBombs() {
            // Пример: ищем бомбы в глобальной переменной
            if (window.gameData?.bombs) {
                console.log("💣 Бомбы:", window.gameData.bombs);
                return window.gameData.bombs;
            }
            return [];
        }

        // Выводим координаты каждые 3 секунды
        setInterval(() => {
            const bombs = findBombs();
            if (bombs.length > 0) {
                alert("Найдены бомбы: " + JSON.stringify(bombs));
            }
        }, 3000);
    `;
    document.body.appendChild(script);

    // 2. Обход CORS для API (если нужно)
    GM_xmlhttpRequest({
        method: "GET",
        url: "https://1wqjnb.com/api/game-data",
        onload: function(response) {
            console.log("Данные игры:", JSON.parse(response.responseText));
        }
    });
})();
