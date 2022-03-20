/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';
/*
 * @Author: liuzhenli02
 * @LastEditor: liuzhenli02
 * @LastEditTime: 2022-03-20 23:07:43
 * @FilePath: /interface/plugins/egg-vite/app.js
 */
const Constant = require('./lib/constant');
const convert = require('koa-convert');
const proxy = require('./lib/proxy');
const version = require('./package.json').version;
const colors = require('colors');
module.exports = app => {

  app.messenger.setMaxListeners(app.config.vite.maxListeners || 10000);

  app.messenger.on(Constant.EVENT_VITE_BUILD_STATE, data => {
    const config = app.config.vite;
    const port = data.port || config.port;
    config.proxy.host = `http://127.0.0.1:${port}`;
    let proxyIndex = -1;
    const mwNames = [ 'static', 'bodyParser', 'overrideMethod', 'session', 'securities', 'notfound', 'siteFile', 'meta' ];
    while (mwNames.length) {
      const name = mwNames.shift();
      proxyIndex = app.middleware.findIndex(mw => {
        return mw._name === name;
      });
      if (proxyIndex > -1) {
        break;
      }
    }
    app.middleware.splice(proxyIndex, 0, convert(proxy(config.proxy)));
    app.logger.info(`[egg-vite] egg-vite version v${version}`);
    app.logger.info(`[egg-vite] Click ${colors.cyan(`http://localhost:${app.config.cluster.listen.port}`)} to priview`);
  });

};
