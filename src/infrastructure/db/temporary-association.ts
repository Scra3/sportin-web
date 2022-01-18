import { DataTypes, Sequelize } from 'sequelize';
import TemporaryAssociationRepositoryI from '../../boundaries/repositories/temporary-association';
import TemporaryAssociation from '../../domain/entities/temporary-association';
import Repository from './repository';
import AssociationRepository from './association';
import TemporaryUserRepository from './temporary-user';
import TemporaryUser from '../../domain/entities/temporary-user';

export default class TemporaryAssociationRepository
  extends Repository
  implements TemporaryAssociationRepositoryI
{
  constructor(
    sequelize: Sequelize,
    repositories: {
      associationRepository: AssociationRepository;
      temporaryUserRepository: TemporaryUserRepository;
    },
  ) {
    super(sequelize, repositories);

    this.model = this.sequelize.define('TemporaryAssociation', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      typeOfPractice: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contactDetails: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      logo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    });

    this.model.belongsTo(repositories.associationRepository.model, {
      foreignKey: 'fromAssociationId',
      foreignKeyConstraint: true,
    });
    this.model.belongsTo(repositories.temporaryUserRepository.model, {
      foreignKey: 'fromUserId',
      foreignKeyConstraint: true,
    });
  }

  async create(
    association: TemporaryAssociation,
    user?: TemporaryUser,
  ): Promise<TemporaryAssociation> {
    const createdAssociation: any = await this.model.create({
      name: association.name,
      address: association.address,
      typeOfPractice: association.typeOfPractice,
      description: association.description,
      contactDetails: association.contactDetails,
      logo: association.logo,
      fromUserId: user ? user.id : null,
    });

    return new TemporaryAssociation(
      createdAssociation.name,
      createdAssociation.address,
      createdAssociation.typeOfPractice,
      createdAssociation.description,
      createdAssociation.contactDetails,
      createdAssociation.logo,
      createdAssociation.id,
      createdAssociation.fromAssociationId,
      createdAssociation.fromUserId,
    );
  }

  async delete(id: number): Promise<void> {
    await this.model.destroy({ where: { id } });
  }

  async find(id: number): Promise<TemporaryAssociation | null> {
    const dbTempAssociation: any = await this.model.findByPk(id);

    if (!dbTempAssociation) {
      return null;
    }

    return new TemporaryAssociation(
      dbTempAssociation.name,
      dbTempAssociation.address,
      dbTempAssociation.typeOfPractice,
      dbTempAssociation.description,
      dbTempAssociation.contactDetails,
      dbTempAssociation.logo,
      dbTempAssociation.id,
      dbTempAssociation.fromAssociationId,
      dbTempAssociation.fromUserId,
    );
  }
}
