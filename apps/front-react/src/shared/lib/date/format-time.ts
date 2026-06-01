export function formatTime(value: string | Date, locale = 'ru-RU') {
    const date = value instanceof Date ? value : new Date(value);

    return new Intl.DateTimeFormat(locale, {
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);
}
