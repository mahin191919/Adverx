export type ValidationResult<T> = { ok: true; data: T } | { ok: false; error: string };

export function requireString(value: unknown, label: string, min = 1): ValidationResult<string> {
  if (typeof value !== "string" || value.trim().length < min) {
    return { ok: false, error: `${label} is required` };
  }
  return { ok: true, data: value.trim() };
}

export function requireEmail(value: unknown): ValidationResult<string> {
  const parsed = requireString(value, "Email");
  if (!parsed.ok) return parsed;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(parsed.data)) {
    return { ok: false, error: "Enter a valid email address" };
  }
  return parsed;
}

export function requirePrice(value: unknown): ValidationResult<number> {
  const numberValue = Number(value);
  if (!Number.isFinite(numberValue) || numberValue < 0) {
    return { ok: false, error: "Price must be a positive number" };
  }
  return { ok: true, data: Math.round(numberValue * 100) / 100 };
}
