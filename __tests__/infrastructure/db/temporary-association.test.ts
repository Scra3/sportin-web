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
    it('should create a temporary association with a user id relation', async () => {
      const association = new TemporaryAssociation(
        'pompignac',
        'an address',
        'basket',
        'a description',
        'a contact details',
        'logo',
      );
      const result = await repositories.temporaryAssociationRepository.create(association);

      expect(result.id).toBeDefined();
    });

    describe('with a user', () => {
      it('should create a temporary association and returns it with an id', async () => {
        const userId = 1;
        const association = new TemporaryAssociation(
          'pompignac',
          'an address',
          'basket',
          'a description',
          'a contact details',
          'logo',
          undefined,
          userId,
        );
        const result = await repositories.temporaryAssociationRepository.create(association);

        expect(result.id).toBeDefined();
        expect(result.fromUserId).toBeDefined();
      });
    });
  });

  describe('delete', () => {
    it('should delete the association and its user', async () => {
      const association = new TemporaryAssociation(
        'pompignac',
        'an address',
        'basket',
        'a description',
        'a contact details',
        'logo',
      );

      const createdAssociation = await repositories.temporaryAssociationRepository.create(
        association,
      );

      await repositories.temporaryAssociationRepository.delete(createdAssociation.id!);

      expect(
        await repositories.temporaryAssociationRepository.find(createdAssociation.id!),
      ).toBeNull();
    });
  });
});
