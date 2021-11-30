import { Router } from 'express';
import { ImageOption } from 'types';
import { openUrls } from '../util/puppeteer';
import { CronJob } from 'cron';
import { timeConvert } from '../util/timeConvert';
import { isDev } from '../util/constant';
import task from '../util/task';
import cronCache from '../util/cron';
import uuid from 'uuid';

const router = Router();

export default router.post<any, any, ImageOption>('/recorder', async (req, res) => {
  const { body, cookies } = req;
  const currentSec = new Date().getSeconds();
  const currentMin = new Date().getMinutes();
  const { startTime, second, key } = body;

  if (startTime && second) {
    console.log(`System run in ${isDev ? 'dev' : 'production'}`);
    const job = new CronJob(
      !isDev
        ? timeConvert(startTime).join(' ')
        : `${currentSec + 3 > 59 ? 5 : currentSec + 3} ${currentSec + 3 > 59 ? currentMin + 1 : currentMin} * * * *`,
      function () {
        openUrls(body, cookies, job, key);
      },
      function () {
        cronCache.deleteCache(key);
        console.log('done');
      }
    );
    console.log('After job instantiation');
    console.log('Create job at', new Date().toISOString());
    cronCache.setCache(key, job);
    job.start();
    try {
      task.setTask(key, { id: uuid.v4() });
      res.json({
        code: 200,
        message: 'SUCCESS',
      });
    } catch (error) {
      res.send(error);
    }
  } else {
    res.json({
      code: 500,
      message: '创建任务时录制系统内部错误',
    });
  }
});
