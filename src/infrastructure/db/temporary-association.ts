import { DataTypes, Sequelize } from 'sequelize';
import TemporaryAssociationRepositoryI from '../../boundaries/repositories/temporary-association';
import TemporaryAssociation from '../../domain/entities/temporary-association';
import Repository from './repository';
import AssociationRepository from './association';

export default class TemporaryAssociationRepository
  extends Repository
  implements TemporaryAssociationRepositoryI
{
  constructor(
    sequelize: Sequelize,
    repositories: { associationRepository: AssociationRepository },
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

    this.model.belongsTo(repositories.associationRepository.model);
  }

  async create(association: TemporaryAssociation): Promise<TemporaryAssociation> {
    const createdAssociation = await this.model.create({
      name: association.name,
      address: association.address,
      typeOfPractice: association.typeOfPractice,
      description: association.description,
      contactDetails: association.contactDetails,
      logo: association.logo,
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    association.id = createdAssociation.id;

    return association;
  }
}
