import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  get = (key: string) => this.cacheManager.get(key);
  set = (key: string, value: any, ttl?: number) => this.cacheManager.set(key, value, ttl);
  del = (key: string) => this.cacheManager.del(key);

  async keyExists(key: string): Promise<boolean> {
    const value = await this.cacheManager.get(key);
    return value !== undefined && value !== null;
  }
}
