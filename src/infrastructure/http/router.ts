import * as core from 'express-serve-static-core';
import RepositoriesFactory from '../db';
import Repositories from '../../boundaries/repositories';
import Controllers from '../../boundaries/controllers';
import AssociationController from '../../domain/controllers/associations';
import MailProxy from '../mail';
import TemporaryAssociationController from '../../domain/controllers/temporary-associations';
import TemporaryAssociationRoutes from './temporary-association';
import AssociationRoutes from './association';

export default class Router {
  private repositories!: Repositories;
  private controllers!: Controllers;

  async init() {
    this.repositories = await RepositoriesFactory.build({
      user: process.env.DB_TEST_USER!,
      password: process.env.DB_TEST_PASSWORD!,
      host: process.env.DB_TEST_HOST!,
      port: process.env.DB_TEST_PORT!,
      dbName: process.env.DB_TEST_NAME!,
      forceSync: false,
    });

    this.controllers = {
      association: new AssociationController(this.repositories, new MailProxy()),
      temporaryAssociation: new TemporaryAssociationController(this.repositories, new MailProxy()),
    };

    return this;
  }

  run(app: core.Express, port: number) {
    this.mountAllRoutes(app);
    app.listen(port);
  }

  private mountAllRoutes(app: core.Express) {
    TemporaryAssociationRoutes.mount(app, this.controllers);
    AssociationRoutes.mount(app, this.controllers);
  }
}
