/* eslint-disable @typescript-eslint/no-var-requires */
/*
 * @Author: liuzhenli02
 * @LastEditor: liuzhenli02
 * @LastEditTime: 2022-03-20 20:53:46
 * @FilePath: /interface/plugins/egg-vite/config/config.default.js
 */
'use strict';

/**
 * egg-vite default config
 * @member Config#vite
 * @property {String} SOME_KEY - some description
 */
const Constant = require('../lib/constant');
exports.vite = {
  port: 3000,
  host: '0.0.0.0',
  proxy: {
    host: 'http://127.0.0.1:3000', // target host that matched path will be proxy to
    match: Constant.PATH_REG, // path pattern.
  },
};
