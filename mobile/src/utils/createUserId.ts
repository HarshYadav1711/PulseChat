export function createUserId(): string {
  if (typeof globalThis.crypto?.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }

  return `user-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
