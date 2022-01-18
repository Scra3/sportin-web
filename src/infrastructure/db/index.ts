import { Sequelize } from 'sequelize';
import AssociationRepository from './association';
import TemporaryAssociationRepository from './temporary-association';
import TemporaryUserRepository from './temporary-user';

export interface RepositoriesConfiguration {
  user: string;
  password: string;
  host: string;
  port: string;
  dbName: string;
  forceSync: boolean;
}

export interface Repositories {
  db: Sequelize;
  associationRepository: AssociationRepository;
  temporaryAssociationRepository: TemporaryAssociationRepository;
  temporaryUserRepository: TemporaryUserRepository;
}

export default class RepositoriesFactory {
  static async build(configuration: RepositoriesConfiguration): Promise<Repositories> {
    const { user, password, host, port, dbName, forceSync } = configuration;
    const sequelize = new Sequelize(`postgres://${user}:${password}@${host}:${port}/${dbName}`, {
      logging: false,
    });

    const associationRepository = new AssociationRepository(sequelize);
    const temporaryUserRepository = new TemporaryUserRepository(sequelize);
    const temporaryAssociationRepository = new TemporaryAssociationRepository(sequelize, {
      temporaryUserRepository,
      associationRepository,
    });

    await sequelize.sync({ force: forceSync });

    return {
      db: sequelize,
      associationRepository,
      temporaryAssociationRepository,
      temporaryUserRepository,
    };
  }
}
