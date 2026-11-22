import { Injectable, Logger } from '@nestjs/common';
import type { DependencyStatus, HealthResponse } from '@nexvian/contracts';
import { withTimeout } from '../../common/with-timeout.js';
import { PrismaService } from '../../infrastructure/prisma/prisma.service.js';
import { RedisService } from '../../infrastructure/redis/redis.service.js';

export const HEALTH_CHECK_TIMEOUT_MS = 2000;

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  async check(): Promise<HealthResponse> {
    const [database, redis] = await Promise.all([
      this.probe('database', () => this.prisma.$queryRaw`SELECT 1`),
      this.probe('redis', () => this.redis.ping()),
    ]);

    return {
      status: database === 'up' && redis === 'up' ? 'ok' : 'degraded',
      checks: { database, redis },
      timestamp: new Date().toISOString(),
    };
  }

  private async probe(name: string, fn: () => Promise<unknown>): Promise<DependencyStatus> {
    try {
      await withTimeout(fn(), HEALTH_CHECK_TIMEOUT_MS);
      return 'up';
    } catch (error) {
      const reason = error instanceof Error ? error.name : 'UnknownError';
      this.logger.warn(`Health check failed for ${name}: ${reason}`);
      return 'down';
    }
  }
}
