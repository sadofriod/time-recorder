import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import { BASE_PATH } from './constant';
import * as request from 'request';

const tempCookie =
  'jd.erp.lang=zh_CN; jdd69fo72b8lfeoe=G7E3K67ZZNYS6YNWAIBLZCLPWABUL5OHFMPOAMKDF5D3W53443TH7CPAAF6I3GXZVFSZLBMT63QUBKHYZ2DGN2KHME; __jdu=16141527196471746823326; __jdv=149035812|direct|-|none|-|1615774220572; areaId=1; ipLoc-djd=1-2809-0-0; _fbp=fb.1.1615876937818.323881234; rememberMe=dSI6J4xjBYwUQ3ICXVpSL9hlrc7G11hUhyVjYbsepSzbF1gG8YMtSC+l3uIGImJSxSiRzPHGvDplbe+pyVOs3sl823SkrBiTTCcjCoYffA/8TQ/gTzFWjXmRk6eZ8tao1lliZAc0D/UmcXZCRxo352kmRNNBMsDHFsyo1T2rA/BiqpXNxs35mdRJVJslxxoYi0FX4A0/7NlkWPK83i6vYb2zjdZMW3IlE/vRhAIDUNXbsbFb23Nd430gGUQYN+kl+RzVpuYenARnnJBw3ILPO/wgUnok3UKHeezUGnBjT7V9+2pm8bMzMgun7YwMTTjB/NgVlc+V+GzzszNX4MLeyiJJgRHxaDYxvrpQfi0UOSLnZ/XsnhoafUf59w9Kk0c8EHjm4mpbM/jLiObWtQo/k6cOianuAV93lLC2gFgnktgDnpzPtDikGTNrMX9ck5fXq50GBxfIjI8L3OSxN61fUPV1OCW52O4A9AEijCwAOFuj3JJLmT1Vs+1LotuLwhnItlAQi+AgBYexGla+IZSsrXWrvbEpIOTPssjdsoyseMF0y2fgDBG29O6/xrylObJXKzwA3EK6XlVhL8lTDXtSJYHamBVixjhgJJ+QYFzsly2xVkDU38fryC7C/xAhClz5W6LQExP9ld20ADEcHR+ZvMhR29wVGKUWw8Q8tGGY70dpwdv3wcwovVOsshzqx/tFLREkc8OpT1JHihd3HxV44ZwD20v4jYcRK1BNTf9tk+8sLFkugi8NiDGocueYhYb9x+FZPprASPNz4TwX3PJG7yAG//r7YzWSPmcwloTUe1/SxBb3K8t7AXpD1TVjsSS4KZ8V4NhZp3ifUZhfQnlw7m11vTZF9an2qP1mzzwGXnv0EitSlal5EoqOwbDA4va16YRHNkr3pb5dIhBlESXF2c9QOw4/KgPEArWPqkzlGgGRXI+XgME5oJVodVSzpyTSiEuZlvBoUjpgkoUy+CLytJgw7NVrbKW35z8K1l/YeMOHgbT0tNWm4QU22iL4mq4Erwfqei0I+36gjSKp/sCtVlSU/jy//f998vGxT9hMVdMPS05L1bX7UVDsbiItCNIpee2V21ddUtaGUTGmpVGCyYns3z62+hll0decSU4/bMkjwNcAdU1rhthPLBVeEvxi2xVf9fiz6xMIMEKFs/qgX8NWDIyhefJ/hFTpDmIy75L1j/J/zetl8PFVYSiEF6IqHICp8FjeM/oJPDClb7k8/YgnWIFA45+nlVc8lHJffMsVHi2y8Iw2MJMD3a4J1bV1X8MCRWTrFQ6qFokSU90w0houjY1kWXzSwZPQ51RgZcmMRIsN7cmhNJp8xXrRoap9QiNleKv/ubPMOYJbBvt7Z9qFVjoXrU7ZPexB0YkR3H9Tmxn8aN/5iIFqcXYWNEytLBL/AZQ37X8vx3wYASMSewbMDKg32/JVrwTbEaoDhqNTIGZ7wWBYNFgtw+ykjg1EcKz5D21lp2OCe+A=; wxa_level=1; retina=0; jxsid=16158902132229269157; webp=1; visitkey=9320633758618402; mba_muid=16141527196471746823326; ll-sso=1f79ab84cacae015ee90c488057224c6%3A9fc5cf79bdaa79dbd1756c8d8cd876b406235f1f452e3431d0342160c3122fb1e158b1e2e5979f8b986d95f34cb13811; _hjTLDTest=1; _hjid=d7fcda01-edc5-467c-b374-3be4f2208191; RT="z=1&dm=jd.com&si=my5zwlb4lni&ss=kmcuvcnm&sl=1&tt=5su&ld=8io6&ul=8lx1&hd=8lx7"; JSESSIONID=9283b9ce-7882-40bc-aa72-1d20b454eef9; 3AB9D23F7A4B3C9B=YGQ5IBPIF27MZ4XSGZ7SK77IJHMCJE2GTQ2CFM26DWAHBZI7SQH3A2OTOB267ICOXQQZUYZ4V4WHHLJLOE2HHUXTIA; cid=3; wqmnx1=MDEyNjM5NTpqdGV0YzYxM3QmMjVvMG9sWCliMyxjbTNmM2ZmQlZDVSg%3D; mba_sid=1615965339607667309816503565.2; __jd_ref_cls=MHome_OverSeaExpo; __jda=25782840.16141527196471746823326.1614152720.1615956417.1615964853.16; __jdb=25782840.6.16141527196471746823326|16.1615964853; __jdc=25782840; erp1.jd.com=E05A6587F3BF58284904F35BC5F09FA76F3E6A364B8914D183ABB7BB1E745C7AC714767D0E1C25416D336504E30A1BAAC73B77890384F06BBE886A866F3E6FF5D05973142BC609B1E7365B2CE34B50E1; sso.jd.com=BJ.fad7c88b1a0a4a35ac2bd6c9e1c7f9dc';

interface NewWindow extends Window {
  recorderVedio?(stream: any, cookie?: string): any;
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

const getUserMedia = async (page: puppeteer.Page, second: number, cookie: number | string) => {
  console.log('trigger exposeFunction');
  await page.exposeFunction('recorderVedio', (vedioSteam: any, cookie: string) => {
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

        const decodedFile = Buffer.from(vedioSteam, 'base64');
        const r = request.post('http://jdview.jd.com/monitor/task/upload', function (err, httpResponse, body) {
          if (err) {
            resolve('error');
          }
          console.log(body);

          resolve('done');
        });
        const form = r.form();
        r.setHeader('cookie', tempCookie);
        //Content-Type: multipart/form-data; boundary=something
        r.setHeader('Content-Type', 'multipart/form-data; boundary=something');
        console.log(r.headers);
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
              newWindow.recorderVedio(reader.result, document.cookie).then((data: any) => {
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
