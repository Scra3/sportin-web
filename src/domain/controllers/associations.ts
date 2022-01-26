import ManageAssociations from '../usecases/manage-associations';
import { AssociationControllerI } from '../../boundaries/controllers/associations';
import SearchAssociations from '../usecases/search-associations';
import Association from '../entities/association';
import MailProxyI from '../../boundaries/proxies/mail';
import RepositoriesI from '../../boundaries/repositories';

export default class AssociationController implements AssociationControllerI {
  private readonly manageAssociations: ManageAssociations;
  private readonly searchAssociations: SearchAssociations;

  constructor(repositories: RepositoriesI, mailProxy: MailProxyI) {
    this.manageAssociations = new ManageAssociations(repositories, mailProxy);
    this.searchAssociations = new SearchAssociations(repositories);
  }

  async index(city: string, typeOfPractice: string): Promise<Array<Association>> {
    return this.searchAssociations.findAll(city, typeOfPractice);
  }

  async show(id: number): Promise<Association | null> {
    return this.searchAssociations.find(id);
  }
}
