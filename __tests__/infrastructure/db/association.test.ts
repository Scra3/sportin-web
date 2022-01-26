import Association from '../../../src/domain/entities/association';
import utils from '../../utils';
import RepositoriesI from '../../../src/boundaries/repositories';

describe('AssociationRepository', () => {
  let repositories: RepositoriesI;

  beforeEach(async () => {
    repositories = await utils.mountRepositories();
  });

  afterEach(async () => {
    await repositories.db.close();
  });

  describe('create', () => {
    it('should create an association and returns it with an id', async () => {
      const association = new Association(
        'pompignac',
        'an address',
        'basket',
        'a description',
        'a contact details',
      );
      const createdAssociation = await repositories.associationRepository.create(association);

      expect(createdAssociation.id).toBeDefined();
    });
  });

  describe('update', () => {
    it('should update the association', async () => {
      const association = new Association(
        'pompignac',
        'an address',
        'basket',
        'a description',
        'a contact details',
      );
      const createdAssociation = await repositories.associationRepository.create(association);

      createdAssociation.name = 'new name to update';
      await repositories.associationRepository.update(createdAssociation);
      const updatedAsso = await repositories.associationRepository.find(createdAssociation.id!);
      expect(updatedAsso!.name).toEqual('new name to update');
    });
  });

  describe('find', () => {
    it('should find the created record', async () => {
      const association = new Association(
        'pompignac',
        'an address',
        'basket',
        'a description',
        'a contact details',
        undefined,
        'logo',
      );
      const createdAssociation = await repositories.associationRepository.create(association);
      const foundAssociation = await repositories.associationRepository.find(
        createdAssociation.id!,
      );

      expect(createdAssociation).toStrictEqual(foundAssociation);
    });
  });

  describe('findBy', () => {
    it('should find all the created record with the given parameters', async () => {
      const association1 = new Association(
        'pompignac',
        'pompignac',
        'basket',
        'a description',
        'a contact details',
        undefined,
        'logo',
      );
      const association2 = new Association(
        'pompignac',
        'pompignac',
        'basket',
        'a description',
        'a contact details',
        undefined,
        'logo',
      );

      const association3 = new Association(
        'lignan',
        'lignan',
        'basket',
        'a description',
        'a contact details',
        undefined,
        'logo',
      );
      const createdAssociation1 = await repositories.associationRepository.create(association1);
      const createdAssociation2 = await repositories.associationRepository.create(association2);
      await repositories.associationRepository.create(association3);

      const foundAssociations = await repositories.associationRepository.findBy(
        'pompignac',
        'basket',
      );

      expect([createdAssociation1, createdAssociation2]).toStrictEqual(foundAssociations);
    });
  });
});
