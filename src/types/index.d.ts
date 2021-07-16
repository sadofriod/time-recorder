import { Request, Response } from 'express';

interface HttpPromisifyParameter<P = core.ParamsDictionary, ResBody = any, ReqBody = any, ReqQuery = qs.ParsedQs> {
  req: Request<P, ResBody, ReqBody, ReqQuery>;
  res: Response<ResBody>;
}

interface OpenWindowOption {
  size: { width: number; height: number };
  url: string | string[];
}

interface ImageOption {
  url: string;
  size: { width: number; height: number };
  key: string;
  videoUrl: string;
  logUrl: string;
  second?: number;
  startTime?: number;
  endTime?: number;
}

declare module 'uuid';
