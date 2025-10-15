// grammar.js - Логика для грамматических страниц

// Функция для безопасного закрытия WebApp
function safeClose() {
    if (window.tg && typeof window.tg.close === 'function') {
        window.tg.close();
    } else {
        console.warn('Telegram WebApp API недоступен');
        window.close();
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('Grammar page loaded');
    
    // Добавляем обработчики для всех кнопок закрытия
    const closeButtons = document.querySelectorAll('.btn-primary');
    closeButtons.forEach(button => {
        if (button.textContent.includes('Закрыть') || button.textContent.includes('Завершить')) {
            button.addEventListener('click', safeClose);
        }
    });
});

// Экспорт функций для глобального использования
window.safeClose = safeClose;
