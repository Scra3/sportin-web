import cors from 'cors';
import { Express, Application } from 'express';
import forest from 'forest-express-sequelize';
import RepositoriesFactory from '../db';
import RepositoriesI from '../../boundaries/repositories';
import ControllersI from '../../boundaries/controllers';
import AssociationController from '../../domain/controllers/associations';
import MailProxy from '../mail';
import TemporaryAssociationController from '../../domain/controllers/temporary-associations';
import TemporaryAssociationRoutes from './temporary-association';
import AssociationRoutes from './association';

export default class Router {
  private repositories!: RepositoriesI;
  private controllers!: ControllersI;
  private forestAdminMiddleware!: Application;

  async init(): Promise<Router> {
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

    this.forestAdminMiddleware = await Router.initForest(this.repositories);

    return this;
  }

  run(app: Express, port: number): void {
    this.mountAllRoutes(app);
    app.listen(port);
  }

  private mountAllRoutes(app: Express): void {
    TemporaryAssociationRoutes.mount(app, this.controllers, this.repositories);
    AssociationRoutes.mount(app, this.controllers);

    app.use(this.forestAdminMiddleware);
    app.use(
      cors({
        origin: [/\.forestadmin\.com$/],
        allowedHeaders: ['Authorization', 'X-Requested-With', 'Content-Type'],
        credentials: true,
      }),
    );
  }

  private static async initForest(repositories: RepositoriesI): Promise<Application> {
    return forest.init({
      envSecret: process.env.FOREST_ENV_SECRET!,
      authSecret: process.env.FOREST_AUTH_SECRET!,
      objectMapping: repositories.lib,
      connections: { default: repositories.db },
      configDir: 'src/infrastructure/http/forest/',
      schemaDir: 'src/infrastructure/http/forest/',
    });
  }
}
