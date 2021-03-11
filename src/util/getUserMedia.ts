import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
const getUserMedia = async (page: puppeteer.Page, second: number, date: number | string) => {
  console.log('trigger exposeFunction');
  await page.exposeFunction('recorderVedio', (vedioSteam: any) => {
    console.log('will save file');

    return new Promise((resolve, reject) => {
      try {
        fs.writeFileSync(
          `${'/app'}/tempAsset/${date}/test.webm`,
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
  await page.evaluate((second: number) => {
    // use window.readfile to read contents of a file
    // const content = await window.recorderVedio('/etc/hosts');
    // console.log(content);
    console.log('trigger evaluate');
    const displayCap = {
      video: {
        cursor: 'always',
      },
      audio: false,
    };
    const newWindow: {
      recorderVedio?(stream: any): any;
      _autoScroderIsDone?: string;
    } & typeof window = window;
    const title = document.querySelector('title');
    if (title) {
      title.innerHTML = 'recorder-page';
    }
    // console.log(navigator);
    console.log(second);
    // navigator.mediaDevices.enumerateDevices().then((data) => {
    //   console.log(data);
    // });
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

        mediaRecorder.start();
        // data.dispatchEvent("")
        const timer = setTimeout(() => {
          console.log('trigger recorder soon stop');
          mediaRecorder.stop();
          clearTimeout(timer);
        }, second);
        console.log(timer);

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
      })
      .catch((err: any) => {
        console.error('Error:' + err);
        return null;
      });
  }, second);
};

export default getUserMedia;
