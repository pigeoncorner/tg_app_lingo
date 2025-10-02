// timezone.js - Весь код из оригинального файла для работы с таймзоной

const tg = window.Telegram.WebApp;
let selectedTimezone = null;
let allTimezones = [];

// Список популярных таймзон
const popularTimezones = [
    'Pacific/Kiritimati', 'Pacific/Auckland', 'Australia/Sydney',
    'Australia/Melbourne', 'Asia/Tokyo', 'Asia/Seoul', 'Asia/Shanghai',
    'Asia/Hong_Kong', 'Asia/Singapore', 'Asia/Bangkok', 'Asia/Jakarta',
    'Asia/Mumbai', 'Asia/Kolkata', 'Asia/Dubai', 'Europe/Moscow',
    'Europe/Istanbul', 'Africa/Cairo', 'Europe/Berlin', 'Europe/Paris',
    'Europe/Rome', 'Europe/Madrid', 'Europe/London', 'Africa/Lagos',
    'Africa/Johannesburg', 'America/Sao_Paulo', 'America/New_York',
    'America/Chicago', 'America/Denver', 'America/Phoenix',
    'America/Los_Angeles', 'America/Las_Vegas', 'America/Vancouver',
    'America/Anchorage', 'Pacific/Honolulu', 'Pacific/Midway'
];

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    loadTimezones();
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
    setTimeout(autoDetectTimezone, 1000);
});

function getCityName(timezone) {
    const parts = timezone.split('/');
    return parts[parts.length - 1].replace(/_/g, ' ');
}

function getCountryName(timezone) {
    const countryMap = {
        'Pacific/Kiritimati': 'Kiribati',
        'Pacific/Auckland': 'New Zealand',
        'Australia/Sydney': 'Australia',
        'Australia/Melbourne': 'Australia',
        'Asia/Tokyo': 'Japan',
        'Asia/Seoul': 'South Korea',
        'Asia/Shanghai': 'China',
        'Asia/Hong_Kong': 'Hong Kong',
        'Asia/Singapore': 'Singapore',
        'Asia/Bangkok': 'Thailand',
        'Asia/Jakarta': 'Indonesia',
        'Asia/Mumbai': 'India',
        'Asia/Kolkata': 'India',
        'Asia/Dubai': 'UAE',
        'Europe/Moscow': 'Russia',
        'Europe/Istanbul': 'Turkey',
        'Africa/Cairo': 'Egypt',
        'Europe/Berlin': 'Germany',
        'Europe/Paris': 'France',
        'Europe/Rome': 'Italy',
        'Europe/Madrid': 'Spain',
        'Europe/London': 'United Kingdom',
        'Africa/Lagos': 'Nigeria',
        'Africa/Johannesburg': 'South Africa',
        'America/Sao_Paulo': 'Brazil',
        'America/New_York': 'United States',
        'America/Chicago': 'United States',
        'America/Denver': 'United States',
        'America/Phoenix': 'United States',
        'America/Los_Angeles': 'United States',
        'America/Las_Vegas': 'United States',
        'America/Vancouver': 'Canada',
        'America/Anchorage': 'United States',
        'Pacific/Honolulu': 'United States',
        'Pacific/Midway': 'United States',
        'Asia/Tbilisi': 'Georgia',
        'Asia/Yerevan': 'Armenia',
        'Asia/Baku': 'Azerbaijan',
        'Europe/Helsinki': 'Finland',
        'Europe/Stockholm': 'Sweden',
        'Europe/Warsaw': 'Poland',
        'Europe/Prague': 'Czech Republic',
        'Europe/Vienna': 'Austria',
        'Europe/Zurich': 'Switzerland',
        'Europe/Amsterdam': 'Netherlands',
        'Europe/Kiev': 'Ukraine',
        'America/Toronto': 'Canada',
        'America/Montreal': 'Canada',
        'America/Mexico_City': 'Mexico',
        'Asia/Karachi': 'Pakistan',
        'Asia/Tashkent': 'Uzbekistan',
        'Asia/Almaty': 'Kazakhstan',
        'Europe/Sofia': 'Bulgaria',
        'Europe/Belgrade': 'Serbia',
        'Europe/Bucharest': 'Romania',
        'Europe/Athens': 'Greece',
        'Asia/Tehran': 'Iran',
        'Asia/Ashgabat': 'Turkmenistan',
        'Asia/Dushanbe': 'Tajikistan',
        'Asia/Bishkek': 'Kyrgyzstan',
        'Europe/Kaliningrad': 'Russia',
        'Europe/Samara': 'Russia',
        'Asia/Yekaterinburg': 'Russia',
        'Asia/Omsk': 'Russia',
        'Asia/Krasnoyarsk': 'Russia',
        'Asia/Irkutsk': 'Russia',
        'Asia/Yakutsk': 'Russia',
        'Asia/Vladivostok': 'Russia',
        'Asia/Magadan': 'Russia',
        'Asia/Kamchatka': 'Russia',
        'Asia/Barnaul': 'Russia',
        'Asia/Novosibirsk': 'Russia',
        'Pacific/Samoa': 'Samoa',
        'Pacific/Niue': 'Niue',
        'Pacific/Marquesas': 'French Polynesia',
        'Pacific/Gambier': 'French Polynesia',
        'Pacific/Pitcairn': 'Pitcairn Islands',
        'Pacific/Easter': 'Chile',
        'America/St_Johns': 'Canada',
        'Atlantic/Cape_Verde': 'Cape Verde',
        'Pacific/Chatham': 'New Zealand',
        'Pacific/Tongatapu': 'Tonga',
        'Pacific/Fakaofo': 'Tokelau'
    };
    
    return countryMap[timezone] || timezone.split('/')[0].replace('_', ' ');
}

function getTimezoneOffsetMinutes(timezone) {
    try {
        const date = new Date('2023-07-15T00:00:00.000Z');
        const utc = new Intl.DateTimeFormat('sv-SE', {
            timeZone: 'UTC',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        }).formatToParts(date);
        
        const local = new Intl.DateTimeFormat('sv-SE', {
            timeZone: timezone,
            year: 'numeric', 
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        }).formatToParts(date);
        
        const utcDate = new Date(
            parseInt(utc.find(p => p.type === 'year').value),
            parseInt(utc.find(p => p.type === 'month').value) - 1,
            parseInt(utc.find(p => p.type === 'day').value),
            parseInt(utc.find(p => p.type === 'hour').value),
            parseInt(utc.find(p => p.type === 'minute').value)
        );
        
        const localDate = new Date(
            parseInt(local.find(p => p.type === 'year').value),
            parseInt(local.find(p => p.type === 'month').value) - 1,
            parseInt(local.find(p => p.type === 'day').value),
            parseInt(local.find(p => p.type === 'hour').value),
            parseInt(local.find(p => p.type === 'minute').value)
        );
        
        const diffMs = localDate.getTime() - utcDate.getTime();
        return Math.round(diffMs / (1000 * 60));
        
    } catch (e) {
        console.error(`Error with ${timezone}:`, e);
        const offsetMap = {
            'America/Las_Vegas': -420,
            'America/Los_Angeles': -420,  
            'America/Phoenix': -420,
            'Asia/Mumbai': 330,
            'Asia/Kolkata': 330,
            'Asia/Dubai': 240,
            'Europe/London': 60,
            'America/New_York': -240,
            'America/Chicago': -300,
        };
        return offsetMap[timezone] || 0;
    }
}

function getTimezoneOffset(timezone) {
    try {
        const offsetMinutes = getTimezoneOffsetMinutes(timezone);
        const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
        const offsetMins = Math.abs(offsetMinutes) % 60;
        const sign = offsetMinutes >= 0 ? '+' : '-';
        
        if (offsetMins === 0) {
            return `UTC${sign}${offsetHours}`;
        } else {
            return `UTC${sign}${offsetHours}:${offsetMins.toString().padStart(2, '0')}`;
        }
    } catch (e) {
        return 'UTC+0';
    }
}

function loadTimezones() {
    allTimezones = popularTimezones.map(tz => ({
        id: tz,
        name: getCityName(tz),
        country: getCountryName(tz),
        offset: getTimezoneOffset(tz),
        offsetMinutes: getTimezoneOffsetMinutes(tz),
        popular: true
    }));

    const additionalTimezones = [
        'Asia/Tbilisi', 'Asia/Yerevan', 'Asia/Baku', 
        'Europe/Helsinki', 'Europe/Stockholm', 'Europe/Warsaw', 
        'Europe/Prague', 'Europe/Vienna', 'Europe/Zurich', 'Europe/Amsterdam',
        'Europe/Kiev', 'America/Toronto', 'America/Montreal', 'America/Mexico_City',
        'Asia/Karachi', 'Asia/Tashkent', 'Asia/Almaty',
        'Europe/Sofia', 'Europe/Belgrade', 'Europe/Bucharest', 'Europe/Athens',
        'Asia/Tehran', 'Asia/Ashgabat', 'Asia/Dushanbe', 'Asia/Bishkek',
        'Europe/Kaliningrad', 'Europe/Samara', 'Asia/Yekaterinburg', 'Asia/Omsk',
        'Asia/Krasnoyarsk', 'Asia/Irkutsk', 'Asia/Yakutsk', 'Asia/Vladivostok',
        'Asia/Magadan', 'Asia/Kamchatka', 'Asia/Barnaul', 'Asia/Novosibirsk',
        'Pacific/Samoa', 'Pacific/Niue', 'Pacific/Marquesas', 'Pacific/Gambier',
        'Pacific/Pitcairn', 'Pacific/Easter', 'America/St_Johns', 'Atlantic/Cape_Verde',
        'Pacific/Chatham', 'Pacific/Tongatapu', 'Pacific/Fakaofo'
    ];

    additionalTimezones.forEach(tz => {
        if (!allTimezones.find(t => t.id === tz)) {
            allTimezones.push({
                id: tz,
                name: getCityName(tz),
                country: getCountryName(tz),
                offset: getTimezoneOffset(tz),
                offsetMinutes: getTimezoneOffsetMinutes(tz),
                popular: false
            });
        }
    });

    allTimezones.sort((a, b) => {
        if (a.offsetMinutes !== b.offsetMinutes) {
            return a.offsetMinutes - b.offsetMinutes;
        }
        return a.name.localeCompare(b.name);
    });

    displayTimezones(allTimezones);
}

function displayTimezones(timezones) {
    const list = document.getElementById('timezoneList');
    
    if (timezones.length === 0) {
        list.innerHTML = '<div class="loading">Часовые пояса не найдены</div>';
        return;
    }

    list.innerHTML = timezones.map(tz => `
        <div class="timezone-item" onclick="selectTimezone('${tz.id}', false)">
            <div class="timezone-name">${tz.name} (${tz.country})</div>
            <div class="timezone-offset">${tz.offset}</div>
        </div>
    `).join('');
}

function filterTimezones() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = allTimezones.filter(tz => {
        const matchesName = tz.name.toLowerCase().includes(query);
        const matchesId = tz.id.toLowerCase().includes(query);
        const matchesCountry = tz.country.toLowerCase().includes(query);
        const matchesOffset = tz.offset.toLowerCase().includes(query);
        
        let matchesUtcOffset = false;
        if (query.match(/^[+\-]?\d+(:?\d{2})?$/)) {
            let searchOffset = query;
            if (!searchOffset.startsWith('+') && !searchOffset.startsWith('-')) {
                searchOffset = '+' + searchOffset;
            }
            let normalizedTzOffset = tz.offset.replace('UTC', '');
            matchesUtcOffset = normalizedTzOffset === searchOffset;
        } else if (query.startsWith('utc')) {
            const utcQuery = query.replace('utc', '');
            if (utcQuery.match(/^[+\-]?\d+(:?\d{2})?$/)) {
                let searchOffset = utcQuery;
                if (!searchOffset.startsWith('+') && !searchOffset.startsWith('-')) {
                    searchOffset = '+' + searchOffset;
                }
                let normalizedTzOffset = tz.offset.replace('UTC', '');
                matchesUtcOffset = normalizedTzOffset === searchOffset;
            }
        }
        
        return matchesName || matchesId || matchesCountry || matchesOffset || matchesUtcOffset;
    });
    displayTimezones(filtered);
}

function selectTimezone(timezoneId, autoSubmit = false) {
    selectedTimezone = timezoneId;
    
    document.querySelectorAll('.timezone-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    const timezoneItems = document.querySelectorAll('.timezone-item');
    const cityName = getCityName(timezoneId);
    timezoneItems.forEach(item => {
        const itemText = item.textContent;
        if (itemText.includes(cityName)) {
            item.classList.add('selected');
        }
    });
    
    updateCurrentTime();
    enableSubmitButton();
    
    if (autoSubmit) {
        sendTimezoneToBot(timezoneId);
    }
}

function enableSubmitButton() {
    const submitButton = document.getElementById('submitButton');
    submitButton.disabled = false;
    const cityName = selectedTimezone ? getCityName(selectedTimezone) : '';
    submitButton.textContent = `✅ Подтвердить ${cityName}`;
}

function submitTimezone() {
    if (selectedTimezone) {
        sendTimezoneToBot(selectedTimezone);
    } else {
        showMessage('❌ Пожалуйста, выберите часовой пояс', 'error');
    }
}

function autoDetectTimezone() {
    try {
        const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        
        if (detectedTimezone) {
            const foundTimezone = allTimezones.find(tz => tz.id === detectedTimezone);
            
            if (foundTimezone) {
                selectTimezone(detectedTimezone, false);
                showMessage('✅ Часовой пояс определен автоматически: ' + getCityName(detectedTimezone), 'success');
                
                setTimeout(() => {
                    const selectedItem = document.querySelector('.selected');
                    if (selectedItem) {
                        selectedItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 100);
            } else {
                selectedTimezone = detectedTimezone;
                updateCurrentTime();
                enableSubmitButton();
                showMessage('✅ Часовой пояс определен: ' + getCityName(detectedTimezone), 'success');
            }
        } else {
            showMessage('❌ Не удалось определить часовой пояс автоматически', 'error');
        }
    } catch (error) {
        console.error('Auto-detect error:', error);
        showMessage('❌ Ошибка при определении часового пояса: ' + error.message, 'error');
    }
}

function updateCurrentTime() {
    const now = new Date();
    const timezone = selectedTimezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    try {
        const timeString = now.toLocaleTimeString('ru-RU', {
            timeZone: timezone,
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        const cityName = getCityName(timezone);
        const offset = getTimezoneOffset(timezone);
        
        document.getElementById('currentTime').textContent = timeString;
        document.getElementById('currentTimezone').textContent = `${cityName} (${offset})`;
    } catch (error) {
        document.getElementById('currentTime').textContent = now.toLocaleTimeString();
        document.getElementById('currentTimezone').textContent = 'Местное время';
    }
}

function showMessage(text, type) {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = `<div class="message message-${type}">${text}</div>`;
    setTimeout(() => {
        messagesDiv.innerHTML = '';
    }, 3000);
}

function sendTimezoneToBot(timezone) {
    const data = {
        timezone: timezone,
        cityName: getCityName(timezone),
        offset: getTimezoneOffset(timezone),
        timestamp: new Date().toISOString()
    };
    
    tg.sendData(JSON.stringify(data));
    showMessage('✅ Часовой пояс сохранен!', 'success');
    
    setTimeout(() => {
        tg.close();
    }, 1500);
}

// Обработка кнопки "Назад"
tg.BackButton.onClick(() => {
    tg.close();
});
