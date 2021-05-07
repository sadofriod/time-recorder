import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookie from 'cookie-parser';
import recorder from './routes/recorder';
import { BASE_PATH, isDev } from './util/constant';
import _delete from './routes/delete';

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
app.use(_delete);
app.use(express.static(`${BASE_PATH}`));
app.listen(isDev ? 8080 : 80, '0.0.0.0', function () {
  console.log(`server start on ${isDev ? 8080 : 80}`);
});
