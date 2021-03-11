import { Router } from 'express';
import { ImageOption } from 'types';
import { openUrls } from '../util/puppeteer';
import { CronJob } from 'cron';
const router = Router();

export default router.post<any, any, ImageOption>('/recorder', async (req, res) => {
  const { body, cookies } = req;
  const currentMin = new Date().getMinutes();
  const job = new CronJob(
    `0 ${currentMin + 1} * * * *`,
    // `0 58 * * * *`,
    function () {
      const d = new Date();
      console.log('At Ten Minutes:', d.toISOString());
      openUrls(body, cookies, job);
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
  });
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
