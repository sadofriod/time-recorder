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
    delete this.cache[key];
    this.cacheCount--;
  };

  getCacheCount = () => this.cacheCount;
  getCacheMap = () => this.cache;
}

export default new CronCache();
