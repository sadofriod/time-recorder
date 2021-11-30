import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookie from 'cookie-parser';
import recorder from './routes/recorder';
import { BASE_PATH, isDev } from './util/constant';
import _delete from './routes/delete';
import searchCornCount from './routes/processLock';

const app = express();

// create application/json parser
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false, limit: 1024 * 1024 * 5 });

app.use(jsonParser);
app.use(urlencodedParser);
app.use(cookie());
app.all('*', function (req, res, next) {
  console.log('req.origin--', req.headers.origin);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, mycookie ');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTION');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(recorder);
app.use(searchCornCount);
app.use(_delete);
app.use(express.static(`${BASE_PATH}`));
// app.use('/server_log',express.static(`/app`));
app.get('/server_log', (req, res) => {
  res.sendFile(`/home/admin/app/server.log`);
});
app.listen(80, '0.0.0.0', function () {
  console.log(`server start on ${80}`);
});
