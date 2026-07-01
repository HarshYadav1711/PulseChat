export const GENERIC_SERVER_ERROR = "Something went wrong. Please try again.";

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return GENERIC_SERVER_ERROR;
}

export function getClientErrorMessage(error: unknown): string {
  if (error instanceof ValidationError) {
    return error.message;
  }

  return GENERIC_SERVER_ERROR;
}
