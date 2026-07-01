import { ValidationError } from "@/utils/errors";

export function requireNonEmptyString(value: unknown, fieldName: string): string {
  if (typeof value !== "string") {
    throw new ValidationError(`${fieldName} must be a string.`);
  }

  const trimmed = value.trim();

  if (!trimmed) {
    throw new ValidationError(`${fieldName} cannot be empty.`);
  }

  return trimmed;
}

export function requireStringLength(
  value: string,
  fieldName: string,
  min: number,
  max: number,
): string {
  if (value.length < min) {
    throw new ValidationError(`${fieldName} must be at least ${min} characters.`);
  }

  if (value.length > max) {
    throw new ValidationError(`${fieldName} must be at most ${max} characters.`);
  }

  return value;
}
