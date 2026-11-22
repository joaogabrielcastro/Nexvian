import { Inject, Injectable, type OnModuleDestroy } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { APP_ENV, type Env } from '../../config/env.js';
import { PrismaClient } from '../../generated/prisma/client.js';

/**
 * Prisma client shared by all modules. Connections are opened lazily on the
 * first query, so the API can boot (and report "degraded") while PostgreSQL is down.
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
  constructor(@Inject(APP_ENV) env: Env) {
    super({ adapter: new PrismaPg({ connectionString: env.DATABASE_URL }) });
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
