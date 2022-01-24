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

export interface RouterCredentialsI {
  dbUser: string;
  dbPassword: string;
  dbPort: number;
  dbHost: string;
  dbName: string;
  forestEnvSecret: string;
  forestAuthSecret: string;
  serverPort: number;
}

export default class Router {
  private readonly repositories!: RepositoriesI;
  private readonly controllers!: ControllersI;
  private readonly forestAdminMiddleware!: Application;
  private credentials!: RouterCredentialsI;

  static async init(credentials: RouterCredentialsI): Promise<Router> {
    const repositories = await RepositoriesFactory.build({
      user: credentials.dbUser,
      password: credentials.dbPassword,
      host: credentials.dbHost,
      port: credentials.dbPort,
      dbName: credentials.dbName,
      forceSync: false,
    });

    const forestAdminMiddleware = await Router.initForest(repositories, credentials);

    return new Router(repositories, credentials, forestAdminMiddleware);
  }

  constructor(
    repositories: RepositoriesI,
    credentials: RouterCredentialsI,
    forestAdminMiddleware: Application,
  ) {
    this.credentials = credentials;
    this.repositories = repositories;
    this.controllers = {
      association: new AssociationController(this.repositories, new MailProxy()),
      temporaryAssociation: new TemporaryAssociationController(this.repositories, new MailProxy()),
    };

    this.forestAdminMiddleware = forestAdminMiddleware;
  }

  run(app: Express): void {
    this.configureForest(app);

    this.mountAllRoutes(app);

    app.listen(this.credentials.serverPort);
  }

  private mountAllRoutes(app: Express): void {
    TemporaryAssociationRoutes.mount(app, this.controllers, this.repositories);
    AssociationRoutes.mount(app, this.controllers);
  }

  private configureForest(app: Express) {
    app.use(this.forestAdminMiddleware);
    app.use(
      cors({
        origin: [/\.forestadmin\.com$/],
        allowedHeaders: ['Authorization', 'X-Requested-With', 'Content-Type'],
        credentials: true,
      }),
    );
  }

  private static async initForest(
    repositories: RepositoriesI,
    credentials: RouterCredentialsI,
  ): Promise<Application> {
    return forest.init({
      envSecret: credentials.forestEnvSecret,
      authSecret: credentials.forestAuthSecret,
      objectMapping: repositories.lib,
      connections: { default: repositories.db },
      configDir: 'src/infrastructure/http/forest/',
      schemaDir: 'src/infrastructure/http/forest/',
    });
  }
}
