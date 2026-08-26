export function useFormatDate() {
  function formatDate(dateStr, { locale = 'fa', withTime = false } = {}) {
    if (!dateStr) return '';
    try {
      const targetLocale = locale === 'en' ? 'en-US' : 'fa-IR';
      const options = {
        calendar: locale === 'en' ? 'gregory' : 'persian',
        numberingSystem: 'latn',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      };
      if (withTime) {
        options.hour = '2-digit';
        options.minute = '2-digit';
      }

      // به‌جای اعتماد به ترتیب پیش‌فرض locale (که en-US رو MM/DD/YYYY می‌کنه)،
      // اجزا رو جدا می‌گیریم و خودمون به ترتیب YYYY/MM/DD می‌چینیم
      const parts = new Intl.DateTimeFormat(targetLocale, options).formatToParts(new Date(dateStr));
      const get = (type) => parts.find((p) => p.type === type)?.value ?? '';

      let result = `${get('year')}/${get('month')}/${get('day')}`;
      if (withTime) {
        result += ` ${get('hour')}:${get('minute')}`;
      }
      return result;
    } catch {
      return dateStr;
    }
  }
  return { formatDate };
}