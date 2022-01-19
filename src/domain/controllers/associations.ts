import ManageAssociations from '../usecases/manage-associations';
import TemporaryAssociation from '../entities/temporary-association';
import TemporaryUser from '../entities/temporary-user';
import {
  AssociationControllerI,
  DataUpdateCreateI,
} from '../../boundaries/controllers/associations';
import SearchAssociations from '../usecases/search-associations';
import Association from '../entities/association';
import MailProxyI from '../../boundaries/proxies/mail';
import Repositories from '../../boundaries/repositories';

export default class AssociationController implements AssociationControllerI {
  private readonly manageAssociations: ManageAssociations;
  private readonly searchAssociations: SearchAssociations;

  constructor(repositories: Repositories, mailProxy: MailProxyI) {
    this.manageAssociations = new ManageAssociations(repositories, mailProxy);
    this.searchAssociations = new SearchAssociations(repositories);
  }

  async create(data: DataUpdateCreateI) {
    await this.createOrUpdate(data);
  }

  async update(data: DataUpdateCreateI) {
    await this.createOrUpdate(data);
  }

  async index(city: string, typeOfPractice: string): Promise<Array<Association>> {
    return this.searchAssociations.findAll(city, typeOfPractice);
  }

  async show(id: number): Promise<Association | null> {
    return this.searchAssociations.find(id);
  }

  private async createOrUpdate(data: DataUpdateCreateI): Promise<void> {
    const {
      name,
      address,
      typeOfPractice,
      description,
      contactDetails,
      id,
      logo,
      fromAssociationId,
      fromUserId,
    } = data.association;
    const association = new TemporaryAssociation(
      name,
      address,
      typeOfPractice,
      description,
      contactDetails,
      logo,
      id,
      fromAssociationId,
      fromUserId,
    );

    let user;

    if (data.user) {
      user = new TemporaryUser(data.user.email);
    }

    await this.manageAssociations.updateOrCreateAssociation(association, user);
  }
}
