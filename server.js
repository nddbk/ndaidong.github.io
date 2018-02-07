/**
 * server.js
 * app start
**/

const express = require('express');

const {
  logger,
  renderer,
} = require('./builder/utils');

const {
  info,
} = logger;

const {
  port,
  url,
} = require('./builder/configs');

const app = express();

app.use(express.static('src/static'));
app.use(renderer);

app.use((req, res) => {
  info(`Nothing at the path "${req.path}"`);
  return res.status(404).send('404: Page not found');
});

app.listen(port, () => {
  info(`Server started running at ${port}`);
  info(url);
});

module.exports = app;
