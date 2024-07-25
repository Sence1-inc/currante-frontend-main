export const EXCLUDED_WORDS = [
  "contact",
  "number",
  "no",
  "no.",
  "numero",
  "cp",
  "cellphone",
  "selpon",
  "selfon",
  "cellfon",
  "selfone",
  "cellfone",
  "telepono",
  "telephone",
  "tel",
  "tel.",
];

export function hasConsecutiveNumbers(input: string): boolean {
  const cleanedInput = input.replace(/\s+/g, "");
  const regex = /\d{7,50}/;

  return regex.test(cleanedInput);
}
