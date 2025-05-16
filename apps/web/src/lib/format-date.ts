export function formatDate(input: string): string {
  const date = new Date(input);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date).toUpperCase();
}