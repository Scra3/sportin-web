import * as core from 'express-serve-static-core';

export default class Router {
  static run(app: core.Express, port: number) {
    app.get('/', (req, res) => {
      res.send('Hello World!');
    });
    app.listen(port);
  }
}
