import { formatDate } from './format-date';
import { formatTime } from './format-time';

export function formatChatListTime(value: string | Date, locale = 'ru-RU') {
    const date = value instanceof Date ? value : new Date(value);
    const now = new Date();

    const isSameYear = date.getFullYear() === now.getFullYear();
    const isSameDay =
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        isSameYear;

    if (isSameDay) {
        return formatTime(date, locale);
    }

    if (isSameYear) {
        return new Intl.DateTimeFormat(locale, {
            day: 'numeric',
            month: 'short',
        }).format(date);
    }

    return formatDate(date, locale);
}
