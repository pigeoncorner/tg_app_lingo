// help.js - Логика для страницы инструкций

// Получаем экземпляр Telegram WebApp
//const tg = window.Telegram.WebApp;

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initHelpPage();
});

function initHelpPage() {
    // Настройка кнопки "Назад" в Telegram
    tg.BackButton.show();
    tg.BackButton.onClick(closeHelp);
    
    // Инициализация навигации между разделами
    initNavigation();
    
    // Добавляем плавную прокрутку для ссылок
    setupSmoothScroll();
}

function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.help-section');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            
            // Убираем активный класс со всех кнопок и секций
            navButtons.forEach(btn => btn.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Добавляем активный класс к выбранным элементам
            this.classList.add('active');
            document.getElementById(`section-${sectionId}`).classList.add('active');
            
            // Прокручиваем наверх при переключении раздела
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

function setupSmoothScroll() {
    // Плавная прокрутка для всех внутренних ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function closeHelp() {
    // Закрываем WebApp
    tg.close();
}

// Экспорт функций для использования в HTML
window.closeHelp = closeHelp;
