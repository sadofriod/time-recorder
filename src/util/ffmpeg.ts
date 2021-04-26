import { spawnSync, spawn, ChildProcessWithoutNullStreams } from 'child_process';
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

export const startCapture = (
  key: string,
  display: number,
  option: { width: number; height: number; framerate: number },
  extname = 0
) => {
  const { width, height, framerate } = option;

  // if (extname < framerate) {
  const ffmpeg = spawn('ffmpeg', [
    '-f',
    'x11grab',
    '-r',
    '25',
    '-s',
    `${width}x${height}`,
    '-i',
    ':' + display,
    // 'out_' + extname + '.mepeg',
    `${BASE_PATH}${key}/out_${extname}.mpeg`,
  ]);
  // await new Promise((res) => setTimeout(res, Math.floor(1000 / framerate)));
  ffmpegIns.setFFmpeg(key, ffmpeg);
  // return startCapture(key, display, option, extname + 1);
  // } else {
  //   return 'done';
  // }
};

export const startRecorder = async (key: string, display: number, option: { width: number; height: number }) => {
  const { width, height } = option;
  try {
    const ffmpeg = spawn('ffmpeg', [
      '-r',
      '24',
      '-framerate 30',
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
      // '-b:v',
      // '384k',
      '-qmin',
      '10',
      '-qmax',
      '42',
      '-maxrate',
      '384k',
      // '-bufsize',
      // '1024k',
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

export const ffmpegStop = (key: string) => {
  const ffmpeg = ffmpegIns.getFFmpeg(key);
  return ffmpeg.kill();
};

export default ffmpegIns;
