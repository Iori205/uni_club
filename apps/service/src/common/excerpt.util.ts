/**
 * Dash-ийн одоогийн News/Event modal-д тусдаа "excerpt" талбар байхгүй тул
 * admin `excerpt` дамжуулаагүй үед `body`-ээс автоматаар товч агуулга гаргана.
 */
export function deriveExcerpt(body: string, maxLength = 160): string {
  const trimmed = body.trim().replace(/\s+/g, ' ');
  if (trimmed.length <= maxLength) return trimmed;
  return `${trimmed.slice(0, maxLength).trimEnd()}…`;
}
