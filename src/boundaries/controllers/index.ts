import AssociationController from '../../domain/controllers/associations';
import TemporaryAssociationController from '../../domain/controllers/temporary-associations';

export default interface Controllers {
  association: AssociationController;
  temporaryAssociation: TemporaryAssociationController;
}
