import { CronJob } from 'cron';

interface CacheType {
  [key: string]: CronJob;
}

class CronCache {
  private cache: CacheType = {};

  setCache = (key: string, value: CronJob) => {
    this.cache[key] = value;
    return;
  };

  getCache = (key: string) => {
    return this.cache[key];
  };

  deleteCache = (key: string) => {
    delete this.cache[key];
  };

  getCacheMap = () => this.cache;
}

export default new CronCache();
