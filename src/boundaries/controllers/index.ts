import { AssociationControllerI } from './associations';
import { TemporaryAssociationControllerI } from './temporary-associations';

export default interface ControllersI {
  association: AssociationControllerI;
  temporaryAssociation: TemporaryAssociationControllerI;
}
