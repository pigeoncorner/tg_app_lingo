// Runs after index.html injects progress.html into #app-container
(function () {
    const p = new URLSearchParams(window.location.search);
    const streak     = parseInt(p.get('streak') || '0', 10);
    const best       = parseInt(p.get('best')   || '0', 10);
    const xp         = parseInt(p.get('xp')     || '0', 10);
    const level      = parseInt(p.get('level')  || '2', 10);
    const levelLabel = p.get('level_label') || 'B (Intermediate)';

    const streakEmoji = streak >= 7 ? '🔥' : streak > 0 ? '⚡' : '💤';
    const levelEmoji  = level === 1 ? '🔴 A' : level === 3 ? '🟢 C' : '🟡 B';

    const root = document.getElementById('progress-root');
    if (!root) return;

    root.innerHTML = `
        <h1>📊 My Progress</h1>

        <div class="card">
            <div class="card-title">Streak</div>
            <div class="card-value">${streakEmoji} ${streak}</div>
            <div class="card-sub">Best: ${best} day${best !== 1 ? 's' : ''}</div>
        </div>

        <div class="row">
            <div class="card">
                <div class="card-title">XP</div>
                <div class="card-value">⭐ ${xp}</div>
                <div class="card-sub">experience points</div>
            </div>
            <div class="card">
                <div class="card-title">Level</div>
                <div class="card-value">${levelEmoji}</div>
                <div class="card-sub">${levelLabel}</div>
            </div>
        </div>
    `;
}());
