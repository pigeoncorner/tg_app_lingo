// agreement.js - Логика для страницы договора-оферты

const tg = window.Telegram.WebApp;

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initAgreementPage();
});

function initAgreementPage() {
    // Настройка кнопки "Назад" в Telegram
    tg.BackButton.show();
    tg.BackButton.onClick(closeAgreement);
}

function closeAgreement() {
    // Закрываем WebApp
    tg.close();
}

// Экспорт функции для использования в HTML
window.closeAgreement = closeAgreement;
