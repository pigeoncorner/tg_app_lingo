// wordselector.js
// Используем глобальную переменную tg из index.html
// const tg уже объявлен в index.html, не объявляем снова!

let words = [];
let selectedWords = new Set();
let limitReached = false;
const MAX_WORDS = 10;

// Дополнительная инициализация Telegram WebApp
if (window.Telegram && window.Telegram.WebApp) {
    tg.ready();
    tg.expand();
    
    if (tg.BackButton) {
        tg.BackButton.show();
        tg.BackButton.onClick(() => {
            tg.close();
        });
    }
}

// Загрузка данных из URL
function loadWordsFromURL() {
    try {
        console.log('=== Word Selector Debug ===');
        console.log('Full URL:', window.location.href);
        console.log('Search params:', window.location.search);
        
        const params = new URLSearchParams(window.location.search);
        console.log('All params:', Array.from(params.entries()));
        
        const wordsData = params.get('words');
        console.log('Words data (raw):', wordsData ? wordsData.substring(0, 100) + '...' : 'NULL');
        
        if (!wordsData) {
            showError('Данные не найдены в URL');
            return;
        }

        // Декодируем base64 и парсим JSON
        console.log('Decoding base64...');
        const decodedData = atob(wordsData);
        console.log('Decoded data length:', decodedData.length);
        
        console.log('Parsing JSON...');
        words = JSON.parse(decodedData);
        
        console.log('✅ Loaded words:', words.length);
        console.log('First word:', words[0]);
        
        renderWords();
        
    } catch (e) {
        console.error('❌ Error loading words:', e);
        showError('Ошибка загрузки данных: ' + e.message);
    }
}

// Рендеринг списка слов
function renderWords() {
    const container = document.getElementById('wordsList');
    
    if (words.length === 0) {
        container.innerHTML = '<div class="loading">Нет слов для отображения</div>';
        return;
    }

    container.innerHTML = words.map((word, index) => {
        const transcription = word.ipa ? `[${word.ipa}]` : '';
        const altTranslation = word.rus_alt ? ` (${word.rus_alt})` : '';
        const rank = word.rank ? `• #${word.rank}` : '';
        
        return `
            <div class="word-item" data-index="${index}" onclick="toggleWord(${index})">
                <div class="word-checkbox"></div>
                <div class="word-content">
                    <div class="word-main">${word.eng}</div>
                    ${transcription ? `<div class="word-transcription">${transcription}</div>` : ''}
                    <div class="word-translation">
                        ${word.rus}${altTranslation ? `<span class="word-translation-alt">${altTranslation}</span>` : ''}
                    </div>
                    ${rank ? `<div class="word-rank">${rank}</div>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

// Переключение выбора слова
function toggleWord(index) {
    if (limitReached) {
        return; // Блокируем выбор после достижения лимита
    }

    const wordElement = document.querySelector(`[data-index="${index}"]`);
    
    if (selectedWords.has(index)) {
        // Снять выбор
        selectedWords.delete(index);
        wordElement.classList.remove('selected');
    } else {
        // Добавить выбор
        if (selectedWords.size >= MAX_WORDS) {
            // Достигнут лимит
            showLimitModal();
            return;
        }
        
        selectedWords.add(index);
        wordElement.classList.add('selected');
    }
    
    updateUI();
}

// Обновление UI
function updateUI() {
    const count = selectedWords.size;
    
    // Обновляем счетчик
    document.getElementById('selectedCount').textContent = count;
    
    // Обновляем прогресс-бар
    const progress = (count / MAX_WORDS) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    
    // Обновляем кнопку
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = count === 0;
    submitBtn.textContent = count > 0 ? `Добавить ${count} слов` : 'Добавить к изучению';
}

// Показать модальное окно лимита
function showLimitModal() {
    limitReached = true;
    const modal = document.getElementById('limitModal');
    modal.classList.add('active');
    
    // Блокируем основную кнопку
    document.getElementById('submitBtn').style.display = 'none';
}

// Отправка данных
function submitWords() {
    if (selectedWords.size === 0) {
        return;
    }

    // Получаем индекс последнего выбранного слова
    const lastSelectedIndex = Math.max(...Array.from(selectedWords));
    
    // Формируем списки
    const selected = [];
    const rejected = [];
    
    words.forEach((word, index) => {
        if (selectedWords.has(index)) {
            // Выбранные слова
            selected.push(word.obj_id);
        } else if (index < lastSelectedIndex) {
            // Слова выше последнего выбранного = отклоненные
            rejected.push(word.obj_id);
        }
        // Слова ниже последнего выбранного игнорируются
    });

    // Формируем данные для отправки
    const data = {
        selected: selected,
        rejected: rejected,
        timestamp: new Date().toISOString()
    };

    console.log('Sending data:', data);
    
    // Отправляем через Telegram WebApp API
    tg.sendData(JSON.stringify(data));
    
    // Закрываем через небольшую задержку
    setTimeout(() => {
        tg.close();
    }, 500);
}

// Показать ошибку
function showError(message) {
    const container = document.getElementById('wordsList');
    container.innerHTML = `<div class="error">${message}</div>`;
}

// Обработчики событий
document.getElementById('submitBtn').addEventListener('click', submitWords);
document.getElementById('modalSubmitBtn').addEventListener('click', submitWords);

// Экспорт функций в глобальную область
window.toggleWord = toggleWord;

// Инициализация при загрузке DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadWordsFromURL);
} else {
    // DOM уже загружен
    loadWordsFromURL();
}
