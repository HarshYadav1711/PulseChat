export function logInfo(message: string, meta?: Record<string, unknown>): void {
  if (meta) {
    console.log(`[pulsechat] ${message}`, meta);
    return;
  }

  console.log(`[pulsechat] ${message}`);
}

export function logError(message: string, error?: unknown): void {
  console.error(`[pulsechat] ${message}`, error ?? "");
}
