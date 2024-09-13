import { CacheModule } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';

import { redisDefaultTtl } from './../../../utility/constants';
import { RedisService } from './redis.service';

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
