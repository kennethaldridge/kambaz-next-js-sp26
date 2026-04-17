export function formatDate(isoString: string | undefined): string {
  if (!isoString) return "No date";
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return "No date";
  const month = d.toLocaleString("en-US", { month: "short" });
  const day = d.getDate();
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  const minuteStr =
    minutes === 0 ? "" : `:${String(minutes).padStart(2, "0")}`;
  return `${month} ${day} at ${hour12}${minuteStr}${ampm}`;
}

export function getAvailabilityStatus(quiz: any): string {
  const now = new Date();
  const until = quiz.untilDate ? new Date(quiz.untilDate) : null;
  const available = quiz.availableDate ? new Date(quiz.availableDate) : null;
  if (until && now > until) return "Closed";
  if (available && until && now >= available && now <= until) return "Available";
  if (available && now < available)
    return `Not available until ${formatDate(quiz.availableDate)}`;
  return "Available";
}
