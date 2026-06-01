export function formatDate(value: string | Date, locale = 'ru-RU') {
    const date = value instanceof Date ? value : new Date(value);

    return new Intl.DateTimeFormat(locale, {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    }).format(date);
}
