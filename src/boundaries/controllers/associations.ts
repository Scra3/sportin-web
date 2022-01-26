import Association from '../../domain/entities/association';

export interface AssociationControllerI {
  index(city: string, typeOfPractice: string): Promise<Array<Association>>;
  show(id: number): Promise<Association | null>;
}
