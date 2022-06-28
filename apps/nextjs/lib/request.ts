import { config } from "./config";

const RequestFailedError = new Error("request failed.");

type MutateMethod = "POST" | "PUT" | "PATCH" | "DELETE";

export async function command<T extends Record<string, unknown>>(
  path: string,
  method: MutateMethod,
  data?: T,
): Promise<{ error?: Error }> {
  const init: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data) {
    init.body = JSON.stringify(data);
  }

  const res = await fetch(`${config.host}${path}`, init);
  if (res.ok) {
    return {};
  }

  return {
    error: RequestFailedError,
  };
}
