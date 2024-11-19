export function FormatNumber(number: number) {
  return number.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
export function getDaysUntil(date: string): number {
  const today: any = new Date();
  const dueDate: any = new Date(date);
  const timeDiff = dueDate - today;
  const daysUntil = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return daysUntil;
}
