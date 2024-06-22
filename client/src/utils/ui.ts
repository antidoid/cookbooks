export function getTime(time: string) {
  const [hours, minutes, _] = time.split(":").map(Number);
  const hoursPart = hours > 0 ? `${hours} hr ` : "";
  const minutesPart = `${minutes} min`;
  return hoursPart + minutesPart;
}

export function paragraphToList(paragraph: string): string[] {
  const sentences = paragraph.split(".");
  const trimmedSentences = sentences
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 0);
  return trimmedSentences;
}
