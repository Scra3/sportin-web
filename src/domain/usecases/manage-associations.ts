import TemporaryUserRepositoryI from '../../boundaries/repositories/temporary-user';
import TemporaryUser from '../entities/temporary-user';
import MailProxyI from '../../boundaries/proxies/mail';
import TemporaryAssociationRepositoryI from '../../boundaries/repositories/temporary-association';
import TemporaryAssociation from '../entities/temporary-association';

export default class ManageAssociations {
  private readonly temporaryAssociationRepository: TemporaryAssociationRepositoryI;
  private readonly temporaryUserRepository: TemporaryUserRepositoryI;
  private readonly mailProxy: MailProxyI;

  constructor(
    temporaryAssociationRepository: TemporaryAssociationRepositoryI,
    temporaryUserRepository: TemporaryUserRepositoryI,
    mailProxy: MailProxyI,
  ) {
    this.temporaryAssociationRepository = temporaryAssociationRepository;
    this.temporaryUserRepository = temporaryUserRepository;
    this.mailProxy = mailProxy;
  }

  async updateOrCreateAssociation(
    association: TemporaryAssociation,
    user?: TemporaryUser,
  ): Promise<void> {
    await this.temporaryAssociationRepository.create(association);

    if (user) {
      await this.temporaryUserRepository.create(user);
      await this.mailProxy.send(user.email, 'Votre modification nous a bien été envoyé.');
    }
  }
}
