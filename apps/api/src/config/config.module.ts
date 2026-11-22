import { Global, Module } from '@nestjs/common';
import { APP_ENV, parseEnv } from './env.js';

@Global()
@Module({
  providers: [{ provide: APP_ENV, useFactory: () => parseEnv(process.env) }],
  exports: [APP_ENV],
})
export class ConfigModule {}
