import TemporaryAssociation from '../../../src/domain/entities/temporary-association';
import utils from '../../utils';
import { Repositories } from '../../../src/infrastructure/db';

describe('TemporaryAssociationRepository', () => {
  let repositories: Repositories;

  beforeEach(async () => {
    repositories = await utils.mountRepositories();
  });

  afterEach(async () => {
    await repositories.db.close();
  });

  describe('create', () => {
    it('should create a temporary association and returns it with an id', async () => {
      const association = new TemporaryAssociation(
        'pompignac',
        'an address',
        'basket',
        'a description',
        'a contact details',
        'logo',
      );
      const result = await repositories.temporaryAssociationRepository.create(association);

      expect(result).toEqual(association);
      expect(association.id).toBeDefined();
    });
  });
});
