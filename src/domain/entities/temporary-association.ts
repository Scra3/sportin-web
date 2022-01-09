import Association from './association';

export default class TemporaryAssociation extends Association {
  public fromAssociationId?: number;
  public fromUserId?: number;

  constructor(
    name: string,
    address: string,
    typeOfPractice: string,
    description: string,
    contactDetails: string,
    logo: string,
    id?: number,
    fromAssociationId?: number,
    fromUserId?: number,
  ) {
    super(name, address, typeOfPractice, description, contactDetails, id, logo);
    this.fromAssociationId = fromAssociationId;
    this.fromUserId = fromUserId;
  }
}
