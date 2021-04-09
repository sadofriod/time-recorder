import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookie from 'cookie-parser';
import recorder from './routes/recorder';

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
app.use(express.static('/tempAsset'));
app.listen(8080, '0.0.0.0', function () {
  // const { } = listen;
  console.log('server start on 8080');
});
