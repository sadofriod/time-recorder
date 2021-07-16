Use `docker build -ti .` to build docker image.

**API List**

| path             | desc                      |
| ---------------- | ------------------------- |
| /recorder        | Create recorder task      |
| /searchCornCount | Get current server weight |
| /delete          | Delete recorder task      |

<pre>
.
├── Dockerfile
├── README.md
├── ecosystem.config.js
├── package-lock.json
├── package.json
├── server.log
├── shell
│   └── dev-start.sh
├── src
│   ├── @types
│   │   └── lib.d.ts
│   ├── index.ts
│   ├── routes
│   │   ├── delete.ts
│   │   ├── processLock.ts
│   │   └── recorder.ts
│   ├── rpc
│   │   └── api.ts
│   ├── types
│   │   └── index.d.ts
│   └── util
│       ├── constant.ts
│       ├── cron.ts
│       ├── ffmpeg.ts           //node call ffmpeg
│       ├── log.ts							//Recorder log
│       ├── promisify.ts		
│       ├── puppeteer.ts				//Recorder entry
│       ├── task.ts							//Task cache
│       ├── timeConvert.ts			//Cron job time converter
│       └── xvfb.ts							//Custom node call xvfb
├── tsconfig.json
└── yarn.lock
</pre>
