// common.js - Общие функции для всех страниц

// Глобальная ссылка на Telegram WebApp
window.tg = window.Telegram?.WebApp;

// Универсальная функция для показа сообщений
function showMessage(text, type = 'info', duration = 3000) {
    // Создаем или находим контейнер для сообщений
    let messagesDiv = document.getElementById('messages');
    
    if (!messagesDiv) {
        messagesDiv = document.createElement('div');
        messagesDiv.id = 'messages';
        document.body.insertBefore(messagesDiv, document.body.firstChild);
    }
    
    // Создаем сообщение
    const messageEl = document.createElement('div');
    messageEl.className = `message message-${type}`;
    messageEl.textContent = text;
    
    messagesDiv.appendChild(messageEl);
    
    // Автоматическое удаление через duration миллисекунд
    if (duration > 0) {
        setTimeout(() => {
            messageEl.remove();
        }, duration);
    }
    
    return messageEl;
}

// Функция для безопасного закрытия WebApp
function safeClose() {
    if (window.tg && typeof window.tg.close === 'function') {
        window.tg.close();
    } else {
        console.warn('Telegram WebApp API недоступен');
        window.close();
    }
}

// Функция для отправки данных боту
function sendDataToBot(data) {
    if (window.tg && typeof window.tg.sendData === 'function') {
        window.tg.sendData(JSON.stringify(data));
        return true;
    } else {
        console.error('Невозможно отправить данные: Telegram WebApp API недоступен');
        return false;
    }
}

// Функция для получения данных пользователя
function getUserData() {
    if (window.tg && window.tg.initDataUnsafe) {
        return {
            userId: window.tg.initDataUnsafe.user?.id,
            username: window.tg.initDataUnsafe.user?.username,
            firstName: window.tg.initDataUnsafe.user?.first_name,
            lastName: window.tg.initDataUnsafe.user?.last_name,
            languageCode: window.tg.initDataUnsafe.user?.language_code
        };
    }
    return null;
}

// Инициализация Telegram WebApp при загрузке любой страницы
if (window.tg) {
    window.tg.ready();
    window.tg.expand();
}

// Экспорт функций для использования в других модулях
window.showMessage = showMessage;
window.safeClose = safeClose;
window.sendDataToBot = sendDataToBot;
window.getUserData = getUserData;
