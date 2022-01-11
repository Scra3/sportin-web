import Association from '../../domain/entities/association';

export default interface AssociationRepositoryI {
  findBy(city: string, typeOfPractice: string): Promise<Array<Association>>;
  findById(id: number): Promise<Association>;
  create(association: Association): Promise<Association>;
}
