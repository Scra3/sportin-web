import TemporaryUser from '../../domain/entities/temporary-user';

export default interface TemporaryUserRepositoryI {
  create(user: TemporaryUser): Promise<TemporaryUser>;
  find(id: number): Promise<TemporaryUser | null>;
  delete(id: number): Promise<void>;
}
