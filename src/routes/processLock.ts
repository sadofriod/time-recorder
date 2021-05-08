import { Router } from 'express';
import cronCache from '../util/cron';

const route = Router();

export default route.get('/searchCornCount', (req, res) => {
  const cronMap = cronCache.getCacheMap();
  res.json({
    code: 200,
    message: 'success',
    data: Object.keys(cronMap).length,
  });
});
