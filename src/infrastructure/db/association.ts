import { DataTypes, Sequelize } from 'sequelize';
import Repository from './repository';
import AssociationRepositoryI from '../../boundaries/repositories/association';
import Association from '../../domain/entities/association';

export default class AssociationRepository extends Repository implements AssociationRepositoryI {
  constructor(sequelize: Sequelize) {
    super(sequelize);

    this.model = this.sequelize.define('Association', {
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
  }

  async findBy(address: string, typeOfPractice: string): Promise<Association[]> {
    const associations: any = await this.model.findAll({ where: { address, typeOfPractice } });

    return associations.map(
      (asso: any) =>
        new Association(
          asso.name,
          asso.address,
          asso.typeOfPractice,
          asso.description,
          asso.contactDetails,
          asso.id,
          asso.logo,
        ),
    );
  }

  async find(id: number): Promise<Association | null> {
    const asso: any = await this.model.findByPk(id);

    if (!asso) {
      return null;
    }

    return new Association(
      asso.name,
      asso.address,
      asso.typeOfPractice,
      asso.description,
      asso.contactDetails,
      asso.id,
      asso.logo,
    );
  }

  async create(association: Association): Promise<Association> {
    const createdAssociation: any = await this.model.create({
      name: association.name,
      address: association.address,
      typeOfPractice: association.typeOfPractice,
      description: association.description,
      contactDetails: association.contactDetails,
      logo: association.logo,
    });

    return new Association(
      createdAssociation.name,
      createdAssociation.address,
      createdAssociation.typeOfPractice,
      createdAssociation.description,
      createdAssociation.contactDetails,
      createdAssociation.id,
      createdAssociation.logo,
    );
  }
}
