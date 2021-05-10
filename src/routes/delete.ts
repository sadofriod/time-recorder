import * as fs from 'fs';
import { Router } from 'express';
import { BASE_PATH } from '../util/constant';
import cron from '../util/cron';
const router = Router();

export default router.get('/delete', (req, res) => {
  const { params } = req;
  const key = params.key;
  fs.rmdir(`${BASE_PATH}${key}`, { recursive: true }, (err) => {
    cron.deleteCache(key);
    if (err) {
      res.json({
        code: 500,
        data: err,
        message: '删除失败',
      });
      throw err;
    }
    res.json({
      code: 200,
      message: 'success',
    });
  });
});
