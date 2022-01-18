import { DataTypes, Sequelize } from 'sequelize';
import TemporaryUserRepositoryI from '../../boundaries/repositories/temporary-user';
import TemporaryUser from '../../domain/entities/temporary-user';
import Repository from './repository';

export default class TemporaryUserRepository
  extends Repository
  implements TemporaryUserRepositoryI
{
  constructor(sequelize: Sequelize) {
    super(sequelize);

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
  }

  async create(user: TemporaryUser): Promise<TemporaryUser> {
    const createdUser: any = await this.model.create({ email: user.email });

    return new TemporaryUser(createdUser.email, createdUser.id);
  }

  async find(id: number): Promise<TemporaryUser | null> {
    const user: any = await this.model.findByPk(id);

    if (!user) {
      return null;
    }

    return new TemporaryUser(user.email, user.id);
  }

  async delete(id: number): Promise<void> {
    await this.model.destroy({ where: { id } });
  }
}
