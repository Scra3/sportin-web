import { Model, ModelStatic, Sequelize } from 'sequelize';

interface Repositories {
  [repository: string]: Repository;
}
export default class Repository {
  protected readonly sequelize: Sequelize;
  protected repositories?;

  public model!: ModelStatic<Model>;

  constructor(sequelize: Sequelize, repositories?: Repositories) {
    this.sequelize = sequelize;
    this.repositories = repositories;
  }
}
