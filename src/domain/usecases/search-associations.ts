import Association from '../entities/association';
import AssociationRepositoryI from '../../boundaries/repositories/association';

export default class SearchAssociations {
  private readonly associationRepository: AssociationRepositoryI;

  constructor(associationRepository: AssociationRepositoryI) {
    this.associationRepository = associationRepository;
  }

  async findAll(city: string, typeOfPractice: string): Promise<Array<Association>> {
    return this.associationRepository.findBy(city, typeOfPractice);
  }

  async find(associationId: string): Promise<Association> {
    return this.associationRepository.find(associationId);
  }
}
