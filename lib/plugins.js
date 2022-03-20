/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';
/*
 * @Autor: liuzhenli
 * @Date: 2022-03-20 21:14:54
 * @LastEditors: liuzhenli
 * @LastEditTime: 2022-03-20 21:17:32
 * @FilePath: /interface/plugins/egg-vite/lib/plugins.js
 * @Description:
 */
const path = require('path');
const fs = require('fs');
const styleLoader = function() {
  return {
    name: 'style-loader',
    transform(src, id) {
      if (id.startsWith(path.resolve(process.cwd(), 'client'))) {
        if (id.endsWith('.tsx')) {
          const lessFilePath = id.replace('.tsx', '.less');
          if (fs.existsSync(lessFilePath)) {
            src = `import './index.less'\n;${src}`;
          }
        }
      }
      return {
        code: src,
        map: null, // 如果可行将提供 source map
      };
    },
  };
};

module.exports = {
  styleLoader,
};
