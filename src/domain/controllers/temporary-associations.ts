import ManageAssociations from '../usecases/manage-associations';
import { TemporaryAssociationControllerI } from '../../boundaries/controllers/temporary-associations';
import SearchAssociations from '../usecases/search-associations';
import Association from '../entities/association';
import MailProxyI from '../../boundaries/proxies/mail';
import Repositories from '../../boundaries/repositories';

export default class TemporaryAssociationController implements TemporaryAssociationControllerI {
  private readonly manageAssociations: ManageAssociations;
  private readonly searchAssociations: SearchAssociations;

  constructor(repositories: Repositories, mailProxy: MailProxyI) {
    this.manageAssociations = new ManageAssociations(repositories, mailProxy);
    this.searchAssociations = new SearchAssociations(repositories);
  }

  async publish(id: number): Promise<void> {
    await this.manageAssociations.publish(id);
  }

  async show(id: number): Promise<Association | null> {
    return this.searchAssociations.findTemporary(id);
  }
}
