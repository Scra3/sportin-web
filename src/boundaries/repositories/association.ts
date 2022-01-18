import Association from '../../domain/entities/association';

export default interface AssociationRepositoryI {
  findBy(city: string, typeOfPractice: string): Promise<Array<Association>>;
  find(id: number): Promise<Association | null>;
  create(association: Association): Promise<Association>;
}
