import TemporaryUser from '../../domain/entities/temporary-user';

export default interface TemporaryUserRepositoryI {
  create(user: TemporaryUser): Promise<TemporaryUser>;
}
