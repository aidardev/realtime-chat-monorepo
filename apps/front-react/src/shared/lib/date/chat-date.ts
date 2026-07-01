export function toDate(value: string | Date) {
    return value instanceof Date ? value : new Date(value);
}

export function isSameDay(a: string | Date, b: string | Date) {
    const dateA = toDate(a);
    const dateB = toDate(b);

    return (
        dateA.getFullYear() === dateB.getFullYear() &&
        dateA.getMonth() === dateB.getMonth() &&
        dateA.getDate() === dateB.getDate()
    );
}

export function isYesterday(value: string | Date, now = new Date()) {
    const date = toDate(value);
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    return isSameDay(date, yesterday);
}

export function formatChatTime(value: string | Date, locale = 'en-GB') {
    const date = toDate(value);

    return new Intl.DateTimeFormat(locale, {
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);
}

export function formatChatListTime(value: string | Date, locale = 'en-GB') {
    const date = toDate(value);
    const now = new Date();

    if (isSameDay(date, now)) {
        return formatChatTime(date, locale);
    }

    if (isYesterday(date, now)) {
        return 'Yesterday';
    }

    const isSameYear = date.getFullYear() === now.getFullYear();

    if (isSameYear) {
        return new Intl.DateTimeFormat(locale, {
            day: 'numeric',
            month: 'short',
        }).format(date);
    }

    return new Intl.DateTimeFormat(locale, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(date);
}

export function formatMessageDayLabel(value: string | Date, locale = 'en-GB') {
    const date = toDate(value);
    const now = new Date();

    if (isSameDay(date, now)) return 'Today';
    if (isYesterday(date, now)) return 'Yesterday';

    const isSameYear = date.getFullYear() === now.getFullYear();

    if (isSameYear) {
        return new Intl.DateTimeFormat(locale, {
            day: 'numeric',
            month: 'long',
        }).format(date);
    }

    return new Intl.DateTimeFormat(locale, {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    }).format(date);
}
