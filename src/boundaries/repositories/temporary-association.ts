import TemporaryAssociation from '../../domain/entities/temporary-association';
import TemporaryUser from '../../domain/entities/temporary-user';

export default interface TemporaryAssociationRepositoryI {
  create(association: TemporaryAssociation, user?: TemporaryUser): Promise<TemporaryAssociation>;
  find(id: number): Promise<TemporaryAssociation | null>;
  delete(id: number): Promise<void>;
}
