import AssociationRepositoryI from './association';
import TemporaryAssociationRepositoryI from './temporary-association';
import TemporaryUserRepositoryI from './temporary-user';

export default interface RepositoriesI {
  db: { close: () => void };
  associationRepository: AssociationRepositoryI;
  temporaryAssociationRepository: TemporaryAssociationRepositoryI;
  temporaryUserRepository: TemporaryUserRepositoryI;
}
