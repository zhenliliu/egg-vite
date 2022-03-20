'use strict';

const mock = require('egg-mock');

describe('test/vite.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/vite-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, vite')
      .expect(200);
  });
});
