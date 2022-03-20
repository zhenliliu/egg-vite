/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';
/*
 * @Author: liuzhenli02
 * @LastEditor: liuzhenli02
 * @LastEditTime: 2022-03-20 22:59:39
 * @FilePath: /interface/plugins/egg-vite/agent.js
 */
const { createServer } = require('vite');
const Constant = require('./lib/constant');
const { styleLoader } = require('./lib/plugins');
module.exports = agent => {
  const config = agent.config.vite;
  agent.messenger.setMaxListeners(config.maxListeners || 10000);

  agent.messenger.on('egg-ready', async () => {
    const viteServer = await createServer({
      configFile: false,
      base: '/public/',
      root: process.cwd(),
      plugins: [ styleLoader() ],
      server: {
        port: config.port,
      },
    });

    await viteServer.listen(config.port);

    agent.messenger.sendToApp(Constant.EVENT_VITE_BUILD_STATE, {
      port: config.port,
    });

    process.on('SIGINT', () => {
      viteServer.close();
      process.exit(0);
    });
  });

  process.on('exit', () => {
    process.exit(0);
  });

};
