import { Sequelize } from 'sequelize';
import AssociationRepository from './association';
import TemporaryAssociationRepository from './temporary-association';
import TemporaryUserRepository from './temporary-user';
import RepositoriesI from '../../boundaries/repositories';

export interface RepositoriesConfigurationI {
  user: string;
  password: string;
  host: string;
  port: number;
  dbName: string;
  forceSync: boolean;
}

export default class RepositoriesFactory {
  static async build(configuration: RepositoriesConfigurationI): Promise<RepositoriesI> {
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
      lib: Sequelize,
      associationRepository,
      temporaryAssociationRepository,
      temporaryUserRepository,
    };
  }
}
