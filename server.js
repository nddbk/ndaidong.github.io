// server.js

import express from 'express';

import {getConfigs} from './configs';
import {info} from './utils/logger';
import {render} from './utils/renderer';

const conf = getConfigs();
const app = express();

app.use(express.static(conf.staticDir));
app.use(render);

app.listen(conf.port, () => {
  info(`Server started at ${conf.url}`);
});
