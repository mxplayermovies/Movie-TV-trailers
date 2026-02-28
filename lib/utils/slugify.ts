export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')          // remove special chars
    .replace(/\s+/g, '-')              // spaces to hyphens
    .replace(/--+/g, '-')              // collapse multiple hyphens
    .replace(/^-+|-+$/g, '')           // remove leading/trailing hyphens
    .trim();
}