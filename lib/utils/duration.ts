// lib/utils/duration.ts
export function formatDurationToISO(duration: string): string {
  if (!duration) return '';
  const hoursMatch = duration.match(/(\d+)h/);
  const minutesMatch = duration.match(/(\d+)m/);
  let iso = 'PT';
  if (hoursMatch) iso += `${hoursMatch[1]}H`;
  if (minutesMatch) iso += `${minutesMatch[1]}M`;
  return iso;
}