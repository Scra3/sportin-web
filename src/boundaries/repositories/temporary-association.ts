import TemporaryAssociation from '../../domain/entities/temporary-association';

export default interface TemporaryAssociationRepositoryI {
  create(association: TemporaryAssociation): Promise<TemporaryAssociation>;
}
