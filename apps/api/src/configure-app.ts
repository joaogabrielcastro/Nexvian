import type { INestApplication } from '@nestjs/common';

export const API_PREFIX = 'v1';

/** HTTP setup shared by the real bootstrap and the e2e tests. */
export function configureApp(app: INestApplication): void {
  app.setGlobalPrefix(API_PREFIX);
}
