LingoMojo Telegram MiniApp
Веб-приложение для Telegram-бота LingoMojo, предназначенное для изучения английского языка.

Структура проекта
tg_app_lingo/
├── index.html                 # Главный файл-роутер
├── css/
│   └── styles.css            # Общие стили для всех страниц
├── js/
│   ├── common.js             # Общие функции (опционально)
│   ├── timezone.js           # Логика страницы выбора часового пояса
│   ├── agreement.js          # Логика страницы договора-оферты
│   └── help.js               # Логика страницы инструкций
├── pages/
│   ├── timezone.html         # Страница выбора часового пояса
│   ├── agreement.html        # Страница договора-оферты
│   └── help.html             # Страница инструкций пользователя
└── images/
    └── help/                 # Скриншоты для инструкций
        ├── menu-main.png
        ├── menu-access.png
        ├── daily-main.png
        ├── daily-monolog.png
        ├── daily-pickout.png
        ├── news-main.png
        ├── news-levels.png
        ├── news-list.png
        ├── news-reading.png
        ├── news-no-translation.png
        └── news-add-words.png
Доступные страницы
1. Выбор часового пояса
URL: https://pigeoncorner.github.io/tg_app_lingo/index.html?page=timezone

Страница для установки часового пояса пользователя с автоматическим определением и ручным выбором.

2. Договор-оферта
URL: https://pigeoncorner.github.io/tg_app_lingo/index.html?page=agreement

Страница с полным текстом договора-оферты оказания информационных услуг.

3. Инструкция пользователя
URL: https://pigeoncorner.github.io/tg_app_lingo/index.html?page=help

Подробная инструкция по использованию функционала бота с навигацией по разделам:

Главное меню
Ежедневные задания
Чтение статей
Принцип работы
Маршрутизация
Файл index.html работает как роутер:

Считывает параметр ?page= из URL
Загружает соответствующий HTML-файл из папки pages/
Подключает соответствующий JS-файл из папки js/
Добавление новой страницы
Для добавления новой страницы выполните следующие шаги:

Создайте HTML-файл в папке pages/:
html
   <!-- pages/newpage.html -->
   <div class="container">
       <h1>Новая страница</h1>
       <!-- Ваш контент -->
   </div>
Создайте JS-файл в папке js/:
javascript
   // js/newpage.js
   const tg = window.Telegram.WebApp;
   
   document.addEventListener('DOMContentLoaded', function() {
       // Ваша логика
   });
Добавьте маршрут в index.html:
javascript
   const pages = {
       'timezone': 'pages/timezone.html',
       'agreement': 'pages/agreement.html',
       'help': 'pages/help.html',
       'newpage': 'pages/newpage.html'  // Новая страница
   };
Используйте URL:
   https://pigeoncorner.github.io/tg_app_lingo/index.html?page=newpage
Стилизация
Общие стили
Файл css/styles.css содержит общие стили, которые применяются ко всем страницам:

Базовые стили для body, контейнеров
Стили кнопок (.btn-primary, .btn-secondary)
Стили заголовков (.header)
Стили секций (.section)
Стили сообщений (.message-error, .message-success, .message-info)
Специфичные стили
Каждая страница может иметь свои специфичные стили, определенные внутри тега <style> в соответствующем HTML-файле.

Интеграция с Telegram
Все страницы используют Telegram WebApp API:

javascript
const tg = window.Telegram.WebApp;

// Инициализация
tg.ready();
tg.expand();

// Отправка данных боту
tg.sendData(JSON.stringify(data));

// Закрытие WebApp
tg.close();

// Кнопка "Назад"
tg.BackButton.show();
tg.BackButton.onClick(() => {
    tg.close();
});
Разработка
Локальное тестирование
Запустите локальный сервер:
bash
   python -m http.server 8000
Откройте в браузере:
   http://localhost:8000/index.html?page=help
Деплой на GitHub Pages
Закоммитьте изменения в репозиторий
GitHub Pages автоматически обновит сайт
Проверьте работоспособность по ссылкам выше
Особенности
Преимущества модульной структуры:
✅ Легко добавлять новые страницы без изменения существующих
✅ Код разделен по функциональности
✅ Удобно поддерживать и обновлять отдельные модули
✅ Общие стили в одном месте
✅ Каждая страница может иметь свою логику и стили
Ограничения:
⚠️ Требуется веб-сервер для корректной работы (из-за CORS)
⚠️ Не работает при открытии файлов напрямую (file://)
Telegram WebApp API
Документация: https://core.telegram.org/bots/webapps

Основные методы:
javascript
// Инициализация
tg.ready()              // Сообщить, что приложение готово
tg.expand()             // Развернуть на весь экран

// Отправка данных
tg.sendData(string)     // Отправить данные боту

// Закрытие
tg.close()              // Закрыть WebApp

// Кнопки
tg.MainButton           // Главная кнопка внизу
tg.BackButton           // Кнопка "Назад"

// Информация о пользователе
tg.initDataUnsafe       // Данные пользователя
tg.initData             // Строка инициализации
Обновление инструкций
При добавлении новых разделов в бот:

Обновите Python-код: Добавьте новые callback-функции
Подготовьте скриншоты: Следуйте инструкции в SCREENSHOTS_GUIDE.md
Обновите help.html: Добавьте новый раздел с описанием
Добавьте навигацию: Создайте новую кнопку в .help-nav
Проверьте: Убедитесь, что все работает корректно
Шаблон нового раздела в help.html:
html
<!-- Добавить кнопку в навигацию -->
<button class="nav-btn" data-section="newsection">Новый раздел</button>

<!-- Добавить секцию контента -->
<div class="help-section" id="section-newsection">
    <h2>📌 Новый раздел</h2>
    
    <div class="help-card">
        <h3>Назначение раздела</h3>
        <p>Описание раздела...</p>
        <div class="screenshot-placeholder">
            <img src="images/help/newsection-main.png" alt="Описание">
            <p class="img-caption">Скриншот X: Описание</p>
        </div>
    </div>
    
    <!-- Дополнительные карточки с информацией -->
</div>
Поддержка
При возникновении проблем:

Проверьте консоль браузера на наличие ошибок
Убедитесь, что все файлы загружены на GitHub
Проверьте правильность путей к файлам
Убедитесь, что GitHub Pages включен в настройках репозитория
Контакты
Email: lingomojo@gmail.com Telegram Bot: @LingoMojo_bot

Лицензия
© 2025 ИП Голубев Александр Павлович

