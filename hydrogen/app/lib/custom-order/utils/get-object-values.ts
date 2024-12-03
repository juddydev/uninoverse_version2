export function getObjectValues<T extends Record<string, never>>(
  obj: T,
): string[] {
  let values: string[] = []

  for (const value of Object.values(obj)) {
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      values = values.concat(getObjectValues(value))
      continue
    }
    if (typeof value !== "string") continue
    values.push(value)
  }

  return values
}
