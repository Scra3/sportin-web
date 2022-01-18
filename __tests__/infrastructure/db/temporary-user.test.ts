import TemporaryUser from '../../../src/domain/entities/temporary-user';
import utils from '../../utils';
import { Repositories } from '../../../src/infrastructure/db';

describe('TemporaryUserRepository', () => {
  let repositories: Repositories;

  beforeEach(async () => {
    repositories = await utils.mountRepositories();
  });

  afterEach(async () => {
    await repositories.db.close();
  });

  describe('create', () => {
    it('should create a user and returns it with an id', async () => {
      const user = new TemporaryUser('scra.gmail.com');
      const result = await repositories.temporaryUserRepository.create(user);

      expect(result.id).toBeDefined();
    });
  });
});
