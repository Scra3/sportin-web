import Association from '../entities/association';
import AssociationRepositoryI from '../../boundaries/repositories/association';
import TemporaryAssociationRepositoryI from '../../boundaries/repositories/temporary-association';
import TemporaryAssociation from '../entities/temporary-association';
import Repositories from '../../boundaries/repositories';

export default class SearchAssociations {
  private readonly associationRepository: AssociationRepositoryI;
  private readonly temporaryAssociationRepository: TemporaryAssociationRepositoryI;

  constructor(repositories: Repositories) {
    this.associationRepository = repositories.associationRepository;
    this.temporaryAssociationRepository = repositories.temporaryAssociationRepository;
  }

  async findAll(city: string, typeOfPractice: string): Promise<Array<Association>> {
    return this.associationRepository.findBy(city, typeOfPractice);
  }

  async find(associationId: number): Promise<Association | null> {
    return this.associationRepository.find(associationId);
  }

  async findTemporary(temporaryAssociationId: number): Promise<TemporaryAssociation | null> {
    return this.temporaryAssociationRepository.find(temporaryAssociationId);
  }
}
