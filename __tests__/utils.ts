import dotenv from 'dotenv';
import RepositoriesFactory from '../src/infrastructure/db';
import RepositoriesI from '../src/boundaries/repositories';

const mountRepositories = async (): Promise<RepositoriesI> => {
  dotenv.config();

  return RepositoriesFactory.build({
    user: process.env.DB_TEST_USER!,
    password: process.env.DB_TEST_PASSWORD!,
    host: process.env.DB_TEST_HOST!,
    port: Number(process.env.DB_TEST_PORT!),
    dbName: process.env.DB_TEST_NAME!,
    forceSync: true,
  });
};

export default { mountRepositories };
