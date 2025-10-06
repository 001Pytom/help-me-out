export function formatTime(totalSeconds: number): string {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = Math.floor(totalSeconds % 60);
  const p = (n: number) => n.toString().padStart(2, '0');
  return `${p(hrs)}:${p(mins)}:${p(secs)}`;
}