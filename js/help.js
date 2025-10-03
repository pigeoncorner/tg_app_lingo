let currentSection = 'menu';

function initWhenReady() {
    if (document.getElementById('help-content')) {
        console.log('Help page ready');
        initHelpNavigation();
        loadHelpSection('menu');
    } else {
        setTimeout(initWhenReady, 50);
    }
}

function initHelpNavigation() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            loadHelpSection(section);
        });
    });
}

async function loadHelpSection(section) {
    console.log('Loading section:', section);
    currentSection = section;
    
    // Обновляем активную кнопку
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-section') === section) {
            btn.classList.add('active');
        }
    });
    
    const contentDiv = document.getElementById('help-content');
    contentDiv.innerHTML = '<div class="loading">Загрузка раздела...</div>';
    
    try {
        const response = await fetch(`pages/help/help_${section}.html`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        contentDiv.innerHTML = html;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
        console.error('Error loading section:', error);
        contentDiv.innerHTML = `
            <div style="padding: 20px;">
                <h3>Ошибка загрузки</h3>
                <p>Не удалось загрузить раздел "${section}".</p>
            </div>
        `;
    }
}

function closeHelp() {
    if (window.tg) {
        tg.close();
    }
}

window.loadHelpSection = loadHelpSection;
window.closeHelp = closeHelp;

initWhenReady();

// Функция для навигации между подразделами
window.loadSubsection = function(type) {
    const subsectionMap = {
        'fs': 'speak_fs',
        'listen': 'speak_listen',
        'dialog': 'speak_dialog',
        'hr': 'speak_hr',
        'monolog': 'speak_monolog',
        'retell': 'speak_retell'
    };
    
    if (subsectionMap[type]) {
        loadHelpSection(subsectionMap[type]);
    }
};
