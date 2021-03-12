import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import { BASE_PATH } from './constant';

interface NewWindow extends Window {
  recorderVedio?(stream: any): any;
  _autoScroderIsDone?: string;
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
        fs.writeFileSync(
          `${BASE_PATH}/${date}/test.webm`,
          Buffer.from(vedioSteam.split(';base64,').pop(), 'base64')
          // vedioSteam,
        );
        console.log('save done');
        resolve('done');
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

  return await page.evaluate(() => {
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
      title.innerHTML = 'recorder-page';
    }
    // console.log(second);
    (navigator.mediaDevices as { getDisplayMedia: any } & typeof navigator.mediaDevices)
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
      })
      .catch((err: any) => {
        console.error('Error:' + err);
        return null;
      });
  });
};

export default getUserMedia;
