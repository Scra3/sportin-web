import AssociationRepository from '../../infrastructure/db/association';
import TemporaryAssociationRepository from '../../infrastructure/db/temporary-association';
import TemporaryUserRepository from '../../infrastructure/db/temporary-user';

export default interface Repositories {
  db: { close: () => void };
  associationRepository: AssociationRepository;
  temporaryAssociationRepository: TemporaryAssociationRepository;
  temporaryUserRepository: TemporaryUserRepository;
}
