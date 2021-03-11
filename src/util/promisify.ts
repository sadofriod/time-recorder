interface AsyncFucntion {
  (...arg: any[]): any;
}

const promisify = <Return = any>(asyncFucntion: AsyncFucntion) => {
  return (...asyncFunctionParam: any[]) =>
    new Promise<Return>((res, rej) => {
      const tempCallBack = (...arg: any[]) => {
        if (arg.length > 0) {
          (res as any)(...arg);
        }
      };
      asyncFucntion(...asyncFunctionParam, tempCallBack);
    });
};
export default promisify;
