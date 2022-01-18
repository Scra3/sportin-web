import Association from '../../domain/entities/association';

export interface AssociationControllerI {
  create(data: DataUpdateCreateI): Promise<void>;
  update(data: DataUpdateCreateI): Promise<void>;
  index(city: string, typeOfPractice: string): Promise<Array<Association>>;
  show(id: number): Promise<Association | null>;
  publish(temporaryAssociationId: number): Promise<void>;
}

export interface DataUpdateCreateI {
  association: {
    name: string;
    address: string;
    typeOfPractice: string;
    description: string;
    contactDetails: string;
    logo: string;
    id?: number;
    fromAssociationId?: number;
    fromUserId?: number;
  };
  user?: {
    email: string;
  };
}
