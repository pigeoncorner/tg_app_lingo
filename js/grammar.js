// grammar.js - Логика для грамматических страниц

function safeClose() {
    if (window.tg && typeof window.tg.close === 'function') {
        window.tg.close();
    } else {
        window.close();
    }
}

// Inject brand header into grammar pages (runs immediately after content injection)
(function injectBrandHeader() {
    const header = document.querySelector('.grammar-header');
    if (header) {
        header.insertAdjacentHTML('afterbegin', `
            <div class="lm-header">
                <img src="icons/icon48.png" class="lm-logo" alt="LingoMojo">
                <span class="lm-brand"><span class="lm-lingo">Lingo</span><span class="lm-mojo">Mojo</span></span>
            </div>
        `);
    }
})();

// Bind close buttons (DOM already ready since content is injected before script loads)
document.querySelectorAll('.btn-primary').forEach(button => {
    if (button.textContent.includes('Закрыть') || button.textContent.includes('Завершить')) {
        button.addEventListener('click', safeClose);
    }
});

window.safeClose = safeClose;
