import { formatIsoDate, formatMongolianDate } from './format-date.util';

describe('formatMongolianDate', () => {
  it('formats a UTC-midnight date correctly', () => {
    expect(formatMongolianDate(new Date(Date.UTC(2026, 8, 18)))).toBe(
      '2026 оны 9 дүгээр сарын 18',
    );
  });

  it('uses "дүгээр" suffix for months 1, 4, 9, 11', () => {
    expect(formatMongolianDate(new Date(Date.UTC(2026, 0, 1)))).toContain(
      '1 дүгээр сарын',
    );
    expect(formatMongolianDate(new Date(Date.UTC(2026, 3, 1)))).toContain(
      '4 дүгээр сарын',
    );
    expect(formatMongolianDate(new Date(Date.UTC(2026, 8, 1)))).toContain(
      '9 дүгээр сарын',
    );
    expect(formatMongolianDate(new Date(Date.UTC(2026, 10, 1)))).toContain(
      '11 дүгээр сарын',
    );
  });

  it('uses "дугаар" suffix for the remaining months', () => {
    expect(formatMongolianDate(new Date(Date.UTC(2026, 1, 1)))).toContain(
      '2 дугаар сарын',
    );
    expect(formatMongolianDate(new Date(Date.UTC(2026, 11, 1)))).toContain(
      '12 дугаар сарын',
    );
  });

  /**
   * Regression test: date-only values are stored/parsed at UTC midnight
   * (`new Date("2026-09-18")` etc). If the formatter reads the process's LOCAL
   * timezone getters instead of the UTC ones, a server running behind UTC
   * (e.g. `TZ=America/New_York`, UTC-4) would roll a UTC-midnight timestamp
   * back to the previous local calendar day, shifting the displayed date by -1.
   */
  it('does not shift the calendar day when the process runs in a negative-offset timezone', () => {
    const originalTz = process.env.TZ;
    process.env.TZ = 'America/New_York'; // UTC-4/-5
    try {
      const utcMidnight = new Date(Date.UTC(2026, 8, 18));
      expect(formatMongolianDate(utcMidnight)).toBe(
        '2026 оны 9 дүгээр сарын 18',
      );
    } finally {
      process.env.TZ = originalTz;
    }
  });

  it('does not shift the calendar day in a positive-offset timezone either', () => {
    const originalTz = process.env.TZ;
    process.env.TZ = 'Asia/Ulaanbaatar'; // UTC+8
    try {
      const utcMidnight = new Date(Date.UTC(2026, 8, 18));
      expect(formatMongolianDate(utcMidnight)).toBe(
        '2026 оны 9 дүгээр сарын 18',
      );
    } finally {
      process.env.TZ = originalTz;
    }
  });
});

describe('formatIsoDate', () => {
  it('formats a UTC-midnight date as yyyy-mm-dd', () => {
    expect(formatIsoDate(new Date(Date.UTC(2026, 8, 18)))).toBe('2026-09-18');
  });
});
