import { Global, Module } from '@nestjs/common';

import { CacheModule } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import type { RedisClientOptions } from 'redis';
import { RedisService } from './redis.service';
import { redisDefaultTtl } from './../../../utility/constants';
import { redisStore } from 'cache-manager-redis-store';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync<RedisClientOptions>({
      //@ts-expect-error redisStore type issue
      useFactory: (config: ConfigService) => ({
        store: redisStore,
        url: config.get<string>('REDIS_URL'),
        ttl: redisDefaultTtl,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [RedisService],
  exports: [CacheModule, RedisService],
})
export class RedisModule {}
