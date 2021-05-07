import * as fs from 'fs';
import { Router } from 'express';
import { BASE_PATH } from '../util/constant';
const router = Router();

export default router.get('/delete', (req, res) => {
  const { params } = req;
  const key = params.key;
  fs.rmdir(`${BASE_PATH}${key}`, { recursive: true }, (err) => {
    if (err) {
      res.json({
        code: 500,
        data: err,
        message: 'success',
      });
      throw err;
    }
    res.json({
      code: 200,
      message: 'success',
    });
  });
});
