export function maskName(name: string) {
  return name
    .split(" ")
    .map((word) => word[0] + "*".repeat(word.length - 1))
    .join(" ");
}
