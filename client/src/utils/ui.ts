export function getTime(time: number): string {
  if (time < 60) {
    return `${time} minute${time === 1 ? "" : "s"}`;
  } else {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    const hoursString = `${hours} hour${hours === 1 ? "" : "s"}`;
    const minutesString =
      minutes > 0 ? ` ${minutes} minute${minutes === 1 ? "" : "s"}` : "";
    return `${hoursString}${minutesString}`;
  }
}

export function paragraphToList(paragraph: string): string[] {
  const sentences = paragraph.split(".");
  const trimmedSentences = sentences
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 0);
  return trimmedSentences;
}
