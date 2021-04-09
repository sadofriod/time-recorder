import { Router } from 'express';
import { ImageOption } from 'types';
import { openUrls } from '../util/puppeteer';
import { CronJob } from 'cron';
import { timeConvert } from '../util/timeConvert';
import * as uuid from 'uuid';
const router = Router();
const tempSourceMap: any = {};

export default router.post<any, any, ImageOption>('/recorder', async (req, res) => {
  const { body, cookies } = req;
  const currentSec = new Date().getSeconds();
  const currentMin = new Date().getMinutes();
  const { startTime, second } = body;
  const date = uuid.v4();
  console.log(body);
  const setSourceMap = (key: string, value: { video: string; log: string }) => {
    tempSourceMap[key] = value;
  };
  if (startTime && second) {
    const job = new CronJob(
      // timeConvert(startTime, second).join(' '),
      `${currentSec + 10 > 59 ? 5 : currentSec + 10} ${currentSec + 10 > 59 ? currentMin + 1 : currentMin} * * * *`,
      function () {
        const d = new Date();
        console.log('At Ten Minutes:', d.toISOString());
        openUrls(body, cookies, job, date);
      },
      function () {
        console.log('done');
      }
    );
    console.log('After job instantiation');
    console.log('Create job at', new Date().toISOString());
    job.start();
    res.json({
      msg: 'Job created',
      key: date,
    });
  } else {
    res.json({
      msg: 'error params',
    });
  }

  try {
    // const queueUrl =
  } catch (error) {
    console.log(error);
    res.json({
      msg: 'error',
      detail: error,
    });
  }

  // openUrls(body);
});
