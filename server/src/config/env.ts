const PORT = Number(process.env.PORT) || 3001;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "*";

export const env = {
  port: PORT,
  clientOrigin: CLIENT_ORIGIN,
  isDev: process.env.NODE_ENV !== "production",
} as const;
