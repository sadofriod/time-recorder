import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import { BASE_PATH } from './constant';
import request from 'request';

interface NewWindow extends Window {
  recorderVedio?(stream: any): any;
  _autoScroderIsDone?: string;
  _autoScroderStart?: boolean;
  mediaRecorder?: MediaRecorder;
}

// const delayQueuePromise = (fn: Promise<any>, delay: number, len: number) => {
//   if (len === 0) {
//     return Promise.resolve();
//   } else {
//     return new Promise((res, rej) => {
//       setTimeout(() => {
//         fn.then(() => {
//           res(delayQueuePromise(fn, delay, len--));
//         }).catch((err) => {
//           rej(err);
//         });
//       }, delay);
//     });
//   }
// };

const getUserMedia = async (page: puppeteer.Page, second: number, date: number | string) => {
  console.log('trigger exposeFunction');
  await page.exposeFunction('recorderVedio', (vedioSteam: any) => {
    console.log('will save file');

    return new Promise((resolve, reject) => {
      try {
        // fs.writeFileSync(
        //   `${BASE_PATH}/${date}/test.webm`,
        //   Buffer.from(vedioSteam.split(';base64,').pop(), 'base64')
        //   // vedioSteam,
        // );
        // console.log('save done');
        // resolve('done');
        var decodedFile = Buffer.from(vedioSteam, 'base64');
        var r = request.post('http://localhost:8888/upload', function (err, httpResponse, body) {
          if (err) {
            resolve('error');
          }
          console.log(body);

          resolve('done');
        });
        var form = r.form();
        form.append('file', decodedFile, { filename: 'test.webm' });
      } catch (error) {
        console.log('error - ', error);
        reject(error);
      }
      // const write =
    });
  });
  console.log('trigger getUserMedia');

  // delayQueuePromise(queueItem(), 1000, 10);
  setTimeout(async () => {
    await page.evaluate(() => {
      const newWindow: NewWindow = window;
      const mediaRecorder = newWindow.mediaRecorder;
      if (mediaRecorder) {
        const showDate = new Date();
        mediaRecorder.stop();
        mediaRecorder.ondataavailable = (event) => {
          console.log('trigger recorder end', event.data);
          const reader = new window.FileReader();
          reader.readAsDataURL(event.data);
          reader.onloadend = function () {
            console.log(typeof newWindow.recorderVedio);

            newWindow.recorderVedio &&
              newWindow.recorderVedio(reader.result).then((data: any) => {
                console.log('end time: ' + showDate.getMinutes() + ':' + showDate.getSeconds());
                newWindow._autoScroderIsDone = data;
              });
          };
        };
      }
    });
  }, second);

  await page.waitForSelector('body');
  await page.click('body');
  await page.evaluate(() => {
    console.log('trigger evaluate');
    const displayCap = {
      video: {
        cursor: 'always',
      },
      audio: false,
    };
    const newWindow: NewWindow = window;
    const title = document.querySelector('title');
    if (title) {
      console.log(title);
      title.innerHTML = 'recorder-page';
    }
    (newWindow.navigator.mediaDevices as { getDisplayMedia: any } & typeof navigator.mediaDevices)
      .getDisplayMedia(displayCap)
      .then((data: any) => {
        // console.log(data);

        const mediaRecorder = new MediaRecorder(data, {
          mimeType: 'video/webm',
          audioBitsPerSecond: 128000,
          videoBitsPerSecond: 2500000,
        });
        const showDate = new Date();
        console.log('start time: ' + showDate.getMinutes() + ':' + showDate.getSeconds());
        newWindow.mediaRecorder = mediaRecorder;
        mediaRecorder.start();
        newWindow._autoScroderStart = true;
      })
      .catch((err: any) => {
        console.error('Error:' + err);
        newWindow._autoScroderStart = true;
        return null;
      });
  });
  return await page.waitForFunction(
    () => {
      const newWindow: NewWindow = window;
      return !!newWindow._autoScroderStart;
    },
    {
      timeout: 0,
    }
  );
};

export default getUserMedia;
