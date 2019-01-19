import express from 'express';
import helmet from 'helmet';
import logger from 'morgan';
import compression from 'compression';
import renderer from './renderer';

import config from './config/server.json';

const app = express();
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || config.http_port;

if (isProduction) {
  app.use(helmet);
  app.disable('x-powered-by');
  app.use(logger('combined'));
  app.set('trust proxy', 1);
}

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('dist', { maxAge: '1y' }));

app.get('*', renderer);

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`);
});
