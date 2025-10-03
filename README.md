LingoMojo Telegram MiniApp
Веб-приложение для Telegram-бота LingoMojo, предназначенное для изучения английского языка.

Структура проекта
tg_app_lingo/
├── index.html                          # Главный файл-роутер
├── README.md                           # Документация проекта
├── SCREENSHOTS_GUIDE.md                # Инструкция по созданию скриншотов
├── css/
│   └── styles.css                     # Общие стили для всех страниц
├── js/
│   ├── common.js                      # Общие функции
│   ├── timezone.js                    # Логика страницы выбора часового пояса
│   ├── agreement.js                   # Логика страницы договора-оферты
│   └── help.js                        # Логика страницы инструкций
├── pages/
│   ├── timezone.html                  # Страница выбора часового пояса
│   ├── agreement.html                 # Страница договора-оферты
│   ├── help.html                      # Главная страница инструкций со сворачиваемым содержанием
│   └── help/                          # Подразделы инструкций
│       ├── help_menu.html             # Раздел "Главное меню"
│       ├── help_daily.html            # Раздел "Ежедневные задания"
│       ├── help_speak.html            # Раздел "Говорение" (главная навигация)
│       ├── help_speak_fs.html         # Подраздел: Free Speech
│       ├── help_speak_listen.html     # Подраздел: Listen and Repeat
│       ├── help_speak_dialog.html     # Подраздел: Dialog
│       ├── help_speak_hr.html         # Подраздел: HR Interview
│       ├── help_speak_monolog.html    # Подраздел: Monolog
│       ├── help_speak_retell.html     # Подраздел: Retelling
│       ├── help_words.html            # Раздел "Изучение слов"
│       ├── help_news.html             # Раздел "Чтение статей"
│       ├── help_native.html           # Раздел "Носитель языка"
│       ├── help_settings.html         # Раздел "Настройки"
│       └── help_subscription.html     # Раздел "Подписка"
└── images/
    └── help/                          # Скриншоты для инструкций
        ├── menu-main.png              # Скриншот 1: Главное меню
        ├── menu-access.png            # Скриншот 2: Доступ к функциям
        ├── daily-main.png             # Скриншот 3: Ежедневные задания
        ├── daily-monolog.png          # Скриншот 4: Монолог в Daily
        ├── daily-pickout.png          # Скриншот 5: Отбор слов в Daily
        ├── news-main.png              # Скриншот 6: Главная новостей
        ├── news-levels.png            # Скриншот 7: Уровни сложности
        ├── news-list.png              # Скриншот 8: Список статей
        ├── news-reading.png           # Скриншот 9: Чтение с переводом
        ├── news-no-translation.png    # Скриншот 10: Без перевода
        ├── news-add-words.png         # Скриншот 11: Добавление слов
        ├── words-main.png             # Скриншот 12: Главная слов
        ├── words-pickout.png          # Скриншот 13: Отбор слов
        ├── words-repeat.png           # Скриншот 14: Повторение
        ├── words-list.png             # Скриншот 15: Список слов
        ├── words-bas.png              # Скриншот 16: BAS функция
        ├── speak-main.png             # Скриншот 17: Главная Говорение
        ├── speak-fs-main.png          # Скриншот 18: Free Speech выбор
        ├── speak-fs-bot-first.png     # Скриншот 19: Бот начинает
        ├── speak-fs-buttons.png       # Скриншот 20: Кнопки управления
        ├── speak-listen-intro.png     # Скриншот 21: Listen intro
        ├── speak-listen-audio.png     # Скриншот 22: Аудио для повтора
        ├── speak-listen-slow.png      # Скриншот 23: Замедление
        ├── speak-listen-result.png    # Скриншот 24: Результат
        ├── speak-dialog-main.png      # Скриншот 25: Темы диалогов
        ├── speak-dialog-wordlimit.png # Скриншот 26: Ограничение слов
        ├── speak-dialog-process.png   # Скриншот 27: Процесс диалога
        ├── speak-dialog-words.png     # Скриншот 28: Изучаемые слова
        ├── speak-dialog-end.png       # Скриншот 29: Анализ диалога
        ├── speak-hr-main.png          # Скриншот 30: HR выбор способа
        ├── speak-hr-custom-job.png    # Скриншот 31: Загрузка вакансии
        ├── speak-hr-custom-cv.png     # Скриншот 32: Загрузка резюме
        ├── speak-hr-choose.png        # Скриншот 33: Список специальностей
        ├── speak-hr-first.png         # Скриншот 34: Первый вопрос
        ├── speak-hr-questions.png     # Скриншот 35: Список вопросов
        ├── speak-hr-analysis.png      # Скриншот 36: Итоговый анализ
        ├── speak-monolog-main.png     # Скриншот 37: Выбор темы
        ├── speak-monolog-question.png # Скриншот 38: Вопрос монолога
        ├── speak-monolog-analysis.png # Скриншот 39: Анализ монолога
        ├── speak-retell-main.png      # Скриншот 40: Текст пересказа
        ├── speak-retell-translation.png # Скриншот 41: С переводом
        ├── speak-retell-analysis.png  # Скриншот 42: Анализ пересказа
        ├── native-main.png            # Скриншот 43: Native главная
        ├── native-phrase-ru.png       # Скриншот 44: Русская фраза
        ├── native-phrase-en.png       # Скриншот 45: Английская фраза
        ├── native-word-en.png         # Скриншот 46: Английское слово
        ├── native-word-ru.png         # Скриншот 47: Русское слово
        ├── settings-main.png          # Скриншот 48: Главная настроек
        ├── settings-level.png         # Скриншот 49: Выбор уровня
        ├── settings-timezone-button.png # Скриншот 50: Кнопка ЧП
        ├── settings-timezone-app.png  # Скриншот 51: Выбор ЧП
        ├── subscription-main.png      # Скриншот 52: Управление подпиской
        ├── subscription-active-auto.png # Скриншот 53: Активна с авто
        ├── subscription-active-manual.png # Скриншот 54: Активна без авто
        ├── subscription-inactive.png  # Скриншот 55: Неактивна
        ├── subscription-discount.png  # Скриншот 56: Со скидкой
        ├── subscription-cancel.png    # Скриншот 57: Подтверждение отмены
        ├── subscription-cancelled.png # Скриншот 58: Отменена
        └── subscription-agreement.png # Скриншот 59: Договор-оферта
Доступные страницы
1. Выбор часового пояса
URL: https://pigeoncorner.github.io/tg_app_lingo/index.html?page=timezone

Страница для установки часового пояса пользователя с автоматическим определением и ручным выбором.

2. Договор-оферта
URL: https://pigeoncorner.github.io/tg_app_lingo/index.html?page=agreement

Страница с полным текстом договора-оферты оказания информационных услуг.

3. Инструкция пользователя
URL: https://pigeoncorner.github.io/tg_app_lingo/index.html?page=help



