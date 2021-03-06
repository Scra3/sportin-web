import TemporaryUserRepositoryI from '../../boundaries/repositories/temporary-user';
import TemporaryUser from '../entities/temporary-user';
import MailProxyI from '../../boundaries/proxies/mail';
import TemporaryAssociationRepositoryI from '../../boundaries/repositories/temporary-association';
import TemporaryAssociation from '../entities/temporary-association';
import AssociationRepositoryI from '../../boundaries/repositories/association';
import RepositoriesI from '../../boundaries/repositories';

export default class ManageAssociations {
  private readonly temporaryAssociationRepository: TemporaryAssociationRepositoryI;
  private readonly temporaryUserRepository: TemporaryUserRepositoryI;
  private readonly associationRepository: AssociationRepositoryI;
  private readonly mailProxy: MailProxyI;

  constructor(repositories: RepositoriesI, mailProxy: MailProxyI) {
    this.temporaryAssociationRepository = repositories.temporaryAssociationRepository;
    this.temporaryUserRepository = repositories.temporaryUserRepository;
    this.associationRepository = repositories.associationRepository;
    this.mailProxy = mailProxy;
  }

  async updateOrCreateAssociation(
    association: TemporaryAssociation,
    user?: TemporaryUser,
  ): Promise<void> {
    if (user) {
      await this.temporaryUserRepository.create(user);
      await this.mailProxy.send(user.email, 'Votre modification nous a bien été envoyé.');
    }

    if (
      association.fromAssociationId &&
      (await this.associationRepository.find(association.fromAssociationId))
    ) {
      await this.associationRepository.update(association);
    } else {
      await this.associationRepository.create(association);
    }
  }

  async publish(temporaryAssociationId: number): Promise<void> {
    const temporaryAssociation = await this.temporaryAssociationRepository.find(
      temporaryAssociationId,
    );

    // should throw error if temporaryAssociation is null
    if (!temporaryAssociation) return;
    await this.temporaryAssociationRepository.delete(temporaryAssociationId);

    if (temporaryAssociation.fromUserId) {
      await this.temporaryUserRepository.delete(temporaryAssociation.fromUserId);
    }

    await this.updateOrCreateAssociation(temporaryAssociation);
  }
}
