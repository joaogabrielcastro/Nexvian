import { healthResponseSchema, type HealthResponse } from '@nexvian/contracts';

/**
 * Fetches API health. The endpoint answers 503 with a valid body when a
 * dependency is down, so the body is parsed regardless of the status code.
 */
export async function fetchHealth(signal?: AbortSignal): Promise<HealthResponse> {
  const response = await fetch('/v1/health', { signal });
  const body: unknown = await response.json();
  return healthResponseSchema.parse(body);
}
