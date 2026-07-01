import { env } from "../config/env";
import type { LoginResponse } from "../types";

class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${env.serverUrl}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
    ...options,
  });

  const data = (await response.json()) as T & { error?: string };

  if (!response.ok) {
    throw new ApiError(data.error ?? "Request failed.");
  }

  return data;
}

export async function login(username: string): Promise<LoginResponse> {
  return request<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ username }),
  });
}
