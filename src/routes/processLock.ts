import { Router } from 'express';
import cronCache from '../util/cron';

const route = Router();

export default route.get('/searchCornCount', (req, res) => {
  res.json({
    code: 200,
    message: 'SUCCESS',
    data: cronCache.getCacheCount(),
  });
});
