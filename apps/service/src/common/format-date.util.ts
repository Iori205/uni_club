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

/**
 * `date` талбар нь огноо-цагийн mark биш, зөвхөн "огноо" (`new Date("2026-09-18")` маягаар
 * UTC-midnight-ээр parse хийгддэг) утга хадгалдаг тул үргэлж UTC-ийн getter-үүдээр унших
 * ёстой. Local (сервэрийн) timezone-ий getter ашиглавал сервэр UTC-ээс өмнөх timezone-д
 * ажиллаж байх үед огноо ±1 хоногоор буруу шилждэг байсан — эндээс сэргийлнэ.
 */
export function formatMongolianDate(date: Date): string {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const suffix = MONTH_ORDINAL_SUFFIX[month - 1];
  return `${year} оны ${month} ${suffix} сарын ${day}`;
}

export function formatIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function formatEventTime(startTime: string, endTime: string): string {
  return `${startTime} – ${endTime}`;
}
