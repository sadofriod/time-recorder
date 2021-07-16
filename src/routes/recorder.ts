import { Router } from 'express';
import { ImageOption } from 'types';
import { openUrls } from '../util/puppeteer';
import { CronJob } from 'cron';
import { timeConvert } from '../util/timeConvert';
// import * as uuid from 'uuid';
import { isDev } from '../util/constant';
import { createTask } from '../rpc/api';
import task from '../util/task';
import cronCache from '../util/cron';
import uuid from 'uuid';

const router = Router();
// const tempSourceMap: any = {};

export default router.post<any, any, ImageOption>('/recorder', async (req, res) => {
  const { body, cookies, headers } = req;
  const currentSec = new Date().getSeconds();
  const currentMin = new Date().getMinutes();
  const { startTime, second, key } = body;

  if (startTime && second) {
    console.log(`系统运行环境为 ${isDev ? '测试' : '开发'}`);
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
