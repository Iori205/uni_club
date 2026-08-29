/**
 * Public API-ийн хариу дотор `apps/web`-ийн одоо байгаа mock өгөгдөлтэй ижил Монгол
 * display формат ("2026 оны 9 дүгээр сарын 18") гаргахад ашиглана. Admin API бол ISO
 * (`toISOString().slice(0, 10)`) хэвээр буцаана — dash-ийн native `<input type="date">`-тай
 * шууд нийцнэ.
 */
const MONTH_ORDINAL_SUFFIX = [
  'дүгээр', // 1
  'дугаар', // 2
  'дугаар', // 3
  'дүгээр', // 4
  'дугаар', // 5
  'дугаар', // 6
  'дугаар', // 7
  'дугаар', // 8
  'дүгээр', // 9
  'дугаар', // 10
  'дүгээр', // 11
  'дугаар', // 12
];

export function formatMongolianDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const suffix = MONTH_ORDINAL_SUFFIX[month - 1];
  return `${year} оны ${month} ${suffix} сарын ${day}`;
}

export function formatIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function formatEventTime(startTime: string, endTime: string): string {
  return `${startTime} – ${endTime}`;
}
