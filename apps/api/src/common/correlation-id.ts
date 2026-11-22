import { randomUUID } from 'node:crypto';

export const CORRELATION_ID_HEADER = 'x-correlation-id';

const SAFE_CORRELATION_ID = /^[A-Za-z0-9._-]{1,128}$/;

/**
 * Reuses the caller's correlation ID when it is well-formed, otherwise generates
 * a new one. Restricting the charset prevents log injection via this header.
 */
export function resolveCorrelationId(incoming: string | string[] | undefined): string {
  const value = Array.isArray(incoming) ? incoming[0] : incoming;
  return value && SAFE_CORRELATION_ID.test(value) ? value : randomUUID();
}
