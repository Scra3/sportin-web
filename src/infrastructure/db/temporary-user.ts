import { DataTypes, Sequelize } from 'sequelize';
import TemporaryUserRepositoryI from '../../boundaries/repositories/temporary-user';
import TemporaryUser from '../../domain/entities/temporary-user';
import Repository from './repository';
import TemporaryAssociationRepository from './temporary-association';

export default class TemporaryUserRepository
  extends Repository
  implements TemporaryUserRepositoryI
{
  constructor(
    sequelize: Sequelize,
    repositories: { temporaryAssociationRepository: TemporaryAssociationRepository },
  ) {
    super(sequelize, repositories);

    this.model = this.sequelize.define('TemporaryUser', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });

    this.model.belongsTo(repositories.temporaryAssociationRepository.model, {
      onDelete: 'cascade',
    });
  }

  async create(user: TemporaryUser): Promise<TemporaryUser> {
    const createdUser = await this.model.create({ email: user.email });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    user.id = createdUser.id;

    return user;
  }
}
