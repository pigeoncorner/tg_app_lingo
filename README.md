LingoMojo Telegram MiniApp
Веб-приложение для Telegram-бота LingoMojo, предназначенное для изучения английского языка.

Структура проекта
tg_app_lingo/
├── index.html                      # Главный файл-роутер
├── README.md                       # Документация проекта
├── SCREENSHOTS_GUIDE.md            # Инструкция по созданию скриншотов
├── css/
│   └── styles.css                 # Общие стили для всех страниц
├── js/
│   ├── common.js                  # Общие функции
│   ├── timezone.js                # Логика страницы выбора часового пояса
│   ├── agreement.js               # Логика страницы договора-оферты
│   └── help.js                    # Логика страницы инструкций
├── pages/
│   ├── timezone.html              # Страница выбора часового пояса
│   ├── agreement.html             # Страница договора-оферты
│   ├── help.html                  # Главная страница инструкций с навигацией
│   └── help/                      # Подразделы инструкций
│       ├── help_menu.html         # Раздел "Главное меню"
│       ├── help_daily.html        # Раздел "Ежедневные задания"
│       ├── help_news.html         # Раздел "Чтение статей"
│       └── help_words.html        # Раздел "Изучение слов"
└── images/
    └── help/                      # Скриншоты для инструкций
        ├── menu-main.png          # Скриншот 1
        ├── menu-access.png        # Скриншот 2
        ├── daily-main.png         # Скриншот 3
        ├── daily-monolog.png      # Скриншот 4
        ├── daily-pickout.png      # Скриншот 5
        ├── news-main.png          # Скриншот 6
        ├── news-levels.png        # Скриншот 7
        ├── news-list.png          # Скриншот 8
        ├── news-reading.png       # Скриншот 9
        ├── news-no-translation.png # Скриншот 10
        ├── news-add-words.png     # Скриншот 11
        ├── words-main.png         # Скриншот 12
        ├── words-pickout.png      # Скриншот 13
        ├── words-repeat.png       # Скриншот 14
        ├── words-list.png         # Скриншот 15
        └── words-bas.png          # Скриншот 16
Доступные страницы
1. Выбор часового пояса
URL: https://pigeoncorner.github.io/tg_app_lingo/index.html?page=timezone

Страница для установки часового пояса пользователя с автоматическим определением и ручным выбором.

2. Договор-оферта
URL: https://pigeoncorner.github.io/tg_app_lingo/index.html?page=agreement

Страница с полным текстом договора-оферты оказания информационных услуг.

3. Инструкция пользователя
URL: https://pigeoncorner.github.io/tg_app_lingo/index.html?page=help



