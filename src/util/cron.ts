import { CronJob } from 'cron';

interface CacheType {
  [key: string]: CronJob;
}

class CronCache {
  private cache: CacheType = {};
  private cacheCount = 0;
  setCache = (key: string, value: CronJob) => {
    this.cache[key] = value;
    this.cacheCount++;
    return;
  };

  getCache = (key: string) => {
    return this.cache[key];
  };

  deleteCache = (key: string) => {
    if (this.cache[key]) {
      delete this.cache[key];
    }

    this.cacheCount = this.cacheCount > 0 ? this.cacheCount - 1 : 0;
  };

  getCacheCount = () => this.cacheCount;
  getCacheMap = () => this.cache;
}

export default new CronCache();
