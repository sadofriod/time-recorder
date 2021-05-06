import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import { fileUpload } from '../rpc/api';
import { BASE_PATH } from './constant';

// import * as util from 'util';

class FFmpeg {
  private ffmpeg: {
    [key: string]: ChildProcessWithoutNullStreams;
  } = {};

  setFFmpeg = (key: string, process: ChildProcessWithoutNullStreams) => {
    this.ffmpeg[key] = process;
  };

  getFFmpeg = (key: string) => {
    return this.ffmpeg[key];
  };

  getFFmpegs = () => this.ffmpeg;
}

const ffmpegIns = new FFmpeg();

export const startCapture = async (
  key: string,
  display: number,
  option: { width: number; height: number; framerate: number },
  extname = 0
): Promise<any> => {
  const { width, height, framerate } = option;

  if (extname < framerate) {
    const ffmpeg = spawn('ffmpeg', [
      '-f',
      'x11grab',
      // '-r',
      // '25',
      '-framerate',
      '24',
      '-s',
      `${width}x${height}`,
      '-i',
      ':' + display,
      '-c:v',
      'libvpx',
      '-quality',
      'realtime',
      '-cpu-used',
      '0',
      // 'out_' + extname + '.mepeg',
      `${BASE_PATH}${key}/out_${extname}.mpeg`,
    ]);
    ffmpeg.stderr.on('data', (data) => console.log(data.toString()));
    // await new Promise((res) => setTimeout(res, Math.floor(1000 / framerate)));
    ffmpegIns.setFFmpeg(key, ffmpeg);
  } else {
    return 'done';
  }
};

export const startRecorder = async (key: string, display: number, option: { width: number; height: number }) => {
  const { width, height } = option;
  try {
    const ffmpeg = spawn('ffmpeg', [
      '-framerate',
      '12',
      '-f',
      'x11grab',
      '-s',
      `${width}x${height}`,
      '-i',
      // xvfb._display,
      ':' + display,
      '-c:v',
      'libvpx',
      '-quality',
      'realtime',
      '-cpu-used',
      '0',
      '-b:v',
      '384k',
      '-qmin',
      '10',
      '-qmax',
      '42',
      '-maxrate',
      '384k',
      '-bufsize',
      '1024k',
      '-an',
      `${BASE_PATH}${key}/screen.webm`,
    ]);
    ffmpegIns.setFFmpeg(key, ffmpeg);
    return Promise.resolve();
  } catch (error) {
    console.log(error);
    return Promise.reject();
  }
};

export const ffmpegStop = async (key: string) => {
  const ffmpeg = ffmpegIns.getFFmpeg(key);
  return ffmpeg.kill();
};

export default ffmpegIns;
