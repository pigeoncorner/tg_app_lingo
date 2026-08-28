(function () {
    const p = new URLSearchParams(window.location.search);
    const streak = parseInt(p.get('streak') || '0', 10);
    const best   = parseInt(p.get('best')   || '0', 10);
    const xp     = parseInt(p.get('xp')     || '0', 10);
    const level  = parseInt(p.get('level')  || '2', 10);

    const levelLabel = level === 1 ? 'A (Beginner)' : level === 3 ? 'C (Advanced)' : 'B (Intermediate)';
    const streakEmoji = streak >= 7 ? '🔥' : streak > 0 ? '⚡' : '💤';
    const levelEmoji  = level === 1 ? '🔴' : level === 3 ? '🟢' : '🟡';

    const root = document.getElementById('progress-root');
    if (!root) return;

    root.innerHTML = `
        <h1>📊 My Progress</h1>

        <div class="pg-card">
            <div class="pg-card-title">Streak</div>
            <div class="pg-card-value">${streakEmoji} ${streak} day${streak !== 1 ? 's' : ''}</div>
            <div class="pg-card-sub">Best: ${best} day${best !== 1 ? 's' : ''}</div>
        </div>

        <div class="pg-row">
            <div class="pg-card">
                <div class="pg-card-title">XP</div>
                <div class="pg-card-value">⭐ ${xp}</div>
                <div class="pg-card-sub">experience points</div>
            </div>
            <div class="pg-card">
                <div class="pg-card-title">Level</div>
                <div class="pg-card-value">${levelEmoji}</div>
                <div class="pg-card-sub">${levelLabel}</div>
            </div>
        </div>
    `;
}());
