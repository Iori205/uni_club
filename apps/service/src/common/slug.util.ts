/** Монгол кирилл үсгийг латин үсэг рүү орчуулах хялбар хүснэгт (slug зориулалттай). */
const CYRILLIC_TO_LATIN: Record<string, string> = {
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'g',
  д: 'd',
  е: 'e',
  ё: 'yo',
  ж: 'j',
  з: 'z',
  и: 'i',
  й: 'i',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  ө: 'u',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ү: 'u',
  ф: 'f',
  х: 'h',
  ц: 'ts',
  ч: 'ch',
  ш: 'sh',
  щ: 'sh',
  ъ: '',
  ы: 'i',
  ь: '',
  э: 'e',
  ю: 'yu',
  я: 'ya',
};

function transliterate(input: string): string {
  return input
    .toLowerCase()
    .split('')
    .map((char) => CYRILLIC_TO_LATIN[char] ?? char)
    .join('');
}

/** Гарчгаас kebab-case slug үүсгэнэ (жишээ нь "Мэдээ 1" -> "medee-1"). */
export function slugify(title: string): string {
  return transliterate(title)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

/**
 * Slug давхцсан тохиолдолд давхцахгүй болтол `-2`, `-3` гэх мэт дугаар нэмнэ.
 * `exists` нь тухайн slug DB-д байгаа эсэхийг шалгах async callback (Prisma-гаас тусад нь, тест хийхэд хялбар байлгах үүднээс).
 */
export async function generateUniqueSlug(
  title: string,
  exists: (slug: string) => Promise<boolean>,
): Promise<string> {
  const base = slugify(title) || 'untitled';
  let candidate = base;
  let attempt = 1;
  while (await exists(candidate)) {
    attempt += 1;
    candidate = `${base}-${attempt}`;
  }
  return candidate;
}
