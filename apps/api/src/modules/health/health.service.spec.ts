import { healthResponseSchema } from '@nexvian/contracts';
import type { PrismaService } from '../../infrastructure/prisma/prisma.service.js';
import type { RedisService } from '../../infrastructure/redis/redis.service.js';
import { HEALTH_CHECK_TIMEOUT_MS, HealthService } from './health.service.js';

function createService(db: () => Promise<unknown>, redis: () => Promise<string>) {
  const prisma = { $queryRaw: vi.fn(db) } as unknown as PrismaService;
  const redisService = { ping: vi.fn(redis) } as unknown as RedisService;
  return new HealthService(prisma, redisService);
}

describe('HealthService', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('reports ok when all dependencies are up', async () => {
    const service = createService(
      async () => [{ '?column?': 1 }],
      async () => 'PONG',
    );

    const result = await service.check();

    expect(result.status).toBe('ok');
    expect(result.checks).toEqual({ database: 'up', redis: 'up' });
    expect(healthResponseSchema.safeParse(result).success).toBe(true);
  });

  it('reports degraded when the database query fails', async () => {
    const service = createService(
      async () => {
        throw new Error('connection refused');
      },
      async () => 'PONG',
    );

    const result = await service.check();

    expect(result.status).toBe('degraded');
    expect(result.checks).toEqual({ database: 'down', redis: 'up' });
  });

  it('marks a dependency down when it does not answer within the timeout', async () => {
    vi.useFakeTimers();
    const service = createService(
      async () => [],
      () => new Promise<string>(() => {}),
    );

    const pending = service.check();
    await vi.advanceTimersByTimeAsync(HEALTH_CHECK_TIMEOUT_MS);
    const result = await pending;

    expect(result.status).toBe('degraded');
    expect(result.checks).toEqual({ database: 'up', redis: 'down' });
  });
});
