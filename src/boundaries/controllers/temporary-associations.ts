import Association from '../../domain/entities/association';

export interface TemporaryAssociationControllerI {
  show(id: number): Promise<Association | null>;
  publish(id: number): Promise<void>;
}
