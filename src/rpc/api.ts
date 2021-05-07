import * as request from 'request';
import { baseRPCUrl, UPDATE_TASK, UPLOAD_FILE, GET_TASKS, BASE_PATH, CREATE_TASK, isDev } from '../util/constant';
import * as fs from 'fs';

interface TaskItem {
  createTime: string;
  createUser: string;
  deleted: number;
  endTime: number;
  id: number;
  logUrl: string;
  modifyTime: string;
  modifyUser: string;
  size: {
    width: number;
    height: number;
  };
  startTime: number;
  status: 0 | 1 | 9 | -1;
  url: string; //页面连接
  videoUrl: string;
}

export const createTask = (data: { key: string; body: Partial<TaskItem>; cookie: any }) => {
  const params = {
    ...data.body,
    videoUrl: '',
    logUrl: '',
  };

  return new Promise<Partial<TaskItem>>((res, rej) => {
    const r = request;
    r.post(`${baseRPCUrl}${CREATE_TASK}`, (err, response, body) => {
      if (err) {
        console.log(err);

        rej(response);
      } else {
        console.log(body);

        const { data, code, message } = body;
        if (code === 200) {
          res(data);
        } else {
          rej(`创建任务失败${message}`);
        }
      }
    })
      .json(params)
      .setHeader('cookie', data.cookie);
  });
};

export const getTasks = (data: { status: TaskItem['status']; pageNo: number; pageSize: number; cookie: any }) => {
  return new Promise((res, rej) => {
    const r = request;
    // r.cookie && r.cookie(data.cookie);
    r.post(`${baseRPCUrl}${GET_TASKS}`, (err, response, body) => {
      if (err) {
        rej(response);
      } else {
        const { data, message, code } = body;
        if (code === 200) {
          res(data);
        } else {
          rej(`获取任务失败:${message}`);
        }
      }
    })
      .json(data)
      .setHeader('cookie', data.cookie);
  });
};

export const updateTask = (data: Partial<TaskItem>, cookie: any) => {
  return new Promise((res, rej) => {
    const r = request;
    // r.cookie && r.cookie(cookie);
    r.post(`${baseRPCUrl}${UPDATE_TASK}`, (err, response, body) => {
      if (err) {
        rej(response);
      } else {
        const { data, message, code } = body;
        if (code === 200) {
          console.log(data);
          res(data);
        } else {
          rej(`组件更新失败:${message}`);
        }
      }
    })
      .json(data)
      .setHeader('cookie', cookie);
  });
};

export const fileUpload = async (key: string, id: number, isVideo: boolean, cookie: any) => {
  const path = isVideo ? `${BASE_PATH}${key}/screen.webm` : `${BASE_PATH}${key}/network_access.log`;
  // const file = fs.readFileSync(path);
  // const file = fs.createReadStream(path);
  console.log('soon upload');
  // const chunks: any[] = [];
  const minetype = isVideo ? 'video/webm' : 'text/plain;charset=UTF-8';
  const filename = isVideo ? 'screen.webm' : 'network_access.log';
  // await new Promise((res) =>
  //   file
  //     .on('data', (chunk) => {
  //       chunks.push(chunk);
  //     })
  //     .once('end', res)
  // );
  return await new Promise((res, rej) => {
    const formData = {
      taskId: id,
      fileType: isVideo ? 1 : 0,
      file: {
        value: fs.createReadStream(path),
        // value: Buffer.from(chunks),
        options: {
          filename: filename,
          contentType: minetype,
        },
      },
    };
    console.log('read done');

    const r = request.post({ url: `${baseRPCUrl}${UPLOAD_FILE}`, formData }, (err, response, body) => {
      if (err) {
        rej(err);
      } else {
        const { data, message, code } = JSON.parse(body);
        console.log(data);

        if (code === 200) {
          res(data);
        } else {
          rej(`文件  ${BASE_PATH}${key}/${isVideo ? 'screen.webm' : 'network_access.log'}  上传失败：\n${message}`);
        }
      }
    });
    // const form = r.form();
    // form.append('taskId', id);
    // form.append('file', file);
    // form.append('fileType', isVideo ? 1 : 0);
    r.setHeader('cookie', cookie);
    r.setHeader('Content-Type', 'multipart/form-data; boundary=something');
  });
  // const formData = new Promise((res, rej) => {
  //   const path = isVideo ? `${BASE_PATH}${key}/screen.webm` : `${BASE_PATH}${key}/network_access.log`;
  //   const stream = fs.createReadStream(path);
  //   const chunks = [];
  //   stream.on('data',(chunk))
  // });
};
