export function getTime(time: string) {
  const [hours, minutes, _] = time.split(':').map(Number);
  const hoursPart = hours > 0 ? `${hours} hr ` : '';
  const minutesPart = `${minutes} min`;
  return hoursPart + minutesPart;
}
