// ffmpeg -f image2 -i /home/ttwang/images/image%d.jpg tt.mp4                              基本格式
// ffmpeg -f image2 -i /home/ttwang/images/image%d.jpg  -vcodec libx264  tt.mp4            指定编码格式的使用
// ffmpeg -f image2 -i /home/ttwang/images/image%d.jpg  -vcodec libx264 -r 10  tt.mp4      指定输出帧率
// -threads 2：以两个线程进行运行， 加快处理的速度。

export const COMMAND = '';

export const IMAGE_TEMP_DIR = '/Users/ashes/Desktop/back-end/jdv-listener/tempAsset/';

// export const BASE_PATH = '/app/tempAsset/';
export const BASE_PATH = 'D:/back-end/jdvlistener/tempAsset';

export const JS_ERROR_LOG_PATH = (date: number | string) => `${BASE_PATH}/${date}/js_error.log`;

export const JS_LOG_PATH = (date: number | string) => `${BASE_PATH}/${date}/js_access.log`;

export const NETWORK_ERROR_LOG_PATH = (date: number | string) => `${BASE_PATH}/${date}/network_error.log`;

export const NETWORK_LOG_PATH = (date: number | string) => `${BASE_PATH}/${date}/network_access.log`;

export const RESPONSE_LOG_PATH = (date: number | string) => `${BASE_PATH}/${date}/network_response.log`;
