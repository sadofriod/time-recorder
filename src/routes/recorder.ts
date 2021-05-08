import { Router } from 'express';
import { ImageOption } from 'types';
import { openUrls } from '../util/puppeteer';
import { CronJob } from 'cron';
import { timeConvert } from '../util/timeConvert';
import * as uuid from 'uuid';
import { isDev } from '../util/constant';
import { createTask } from '../rpc/api';
import task from '../util/task';
import cronCache from '../util/cron';

const router = Router();
// const tempSourceMap: any = {};

export default router.post<any, any, ImageOption>('/recorder', async (req, res) => {
  const { body, cookies, headers } = req;
  const currentSec = new Date().getSeconds();
  const currentMin = new Date().getMinutes();
  const { startTime, second, key } = body;
  // const date = uuid.v4();
  // console.log(body);
  // const setSourceMap = (key: string, value: { video: string; log: string }) => {
  //   tempSourceMap[key] = value;
  // };
  if (startTime && second) {
    const job = new CronJob(
      !isDev
        ? timeConvert(startTime).join(' ')
        : `${currentSec + 3 > 59 ? 5 : currentSec + 3} ${currentSec + 3 > 59 ? currentMin + 1 : currentMin} * * * *`,
      function () {
        // const d = new Date();
        // console.log('At Ten Minutes:', d.toISOString());
        openUrls(body, cookies, headers.cookie, job, key);
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
      const result = await createTask({
        key: key,
        body: {
          ...body,
        },
        cookie: headers.cookie,
      });
      if (result && result.id !== undefined) {
        task.setTask(key, { id: result.id });
      }
      res.json(result);
    } catch (error) {
      res.send(error);
    }
  } else {
    res.json({
      msg: 'error params',
    });
  }
});
