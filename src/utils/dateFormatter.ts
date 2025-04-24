export function formatDate(date: Date): string {
  const jstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000); // JST補正
  return jstDate.toISOString().split('T')[0];
}

export function formatMMDD(date: Date): string {
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${mm}/${dd}`;
}
