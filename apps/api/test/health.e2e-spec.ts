import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { healthResponseSchema } from '@nexvian/contracts';
import request from 'supertest';
import { AppModule } from '../src/app.module.js';
import { configureApp } from '../src/configure-app.js';
import { PrismaService } from '../src/infrastructure/prisma/prisma.service.js';
import { RedisService } from '../src/infrastructure/redis/redis.service.js';

describe('GET /v1/health (e2e)', () => {
  let app: INestApplication;
  const prisma = { $queryRaw: vi.fn(), $disconnect: vi.fn() };
  const redis = { ping: vi.fn(), onModuleDestroy: vi.fn() };

  beforeAll(async () => {
    vi.stubEnv('LOG_LEVEL', 'silent');
    vi.stubEnv('DATABASE_URL', 'postgresql://test:test@localhost:5432/test');
    vi.stubEnv('REDIS_URL', 'redis://localhost:6379');

    const moduleRef = await Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(PrismaService)
      .useValue(prisma)
      .overrideProvider(RedisService)
      .useValue(redis)
      .compile();

    app = moduleRef.createNestApplication();
    configureApp(app);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    vi.unstubAllEnvs();
  });

  beforeEach(() => {
    prisma.$queryRaw.mockResolvedValue([{ '?column?': 1 }]);
    redis.ping.mockResolvedValue('PONG');
  });

  it('returns 200 and a contract-compliant body when dependencies are up', async () => {
    const response = await request(app.getHttpServer()).get('/v1/health').expect(200);

    expect(healthResponseSchema.parse(response.body)).toMatchObject({
      status: 'ok',
      checks: { database: 'up', redis: 'up' },
    });
  });

  it('returns 503 when a dependency is down', async () => {
    prisma.$queryRaw.mockRejectedValue(new Error('connection refused'));

    const response = await request(app.getHttpServer()).get('/v1/health').expect(503);

    expect(response.body).toMatchObject({ status: 'degraded', checks: { database: 'down' } });
  });

  it('echoes a valid x-correlation-id header', async () => {
    const response = await request(app.getHttpServer())
      .get('/v1/health')
      .set('x-correlation-id', 'req-abc-123');

    expect(response.headers['x-correlation-id']).toBe('req-abc-123');
  });

  it('generates a correlation id when none is sent', async () => {
    const response = await request(app.getHttpServer()).get('/v1/health');

    expect(response.headers['x-correlation-id']).toMatch(/^[0-9a-f-]{36}$/);
  });

  it('is not served without the /v1 prefix', async () => {
    await request(app.getHttpServer()).get('/health').expect(404);
  });
});
