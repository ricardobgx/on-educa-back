import { DeleteResult } from 'typeorm';
import { IEntityRequest } from '../../dto/IEntityRequest';
import { Entity } from '../../entities/Entity';

export interface IEntityRepository {
  createEntity(entityParams: IEntityRequest): Promise<Entity>;
  findAll(name?: string): Promise<Entity[]>;
  findById(id: string): Promise<Entity | undefined>;
  updateById(updateFields: IEntityRequest): Promise<void>;
  deleteById(id: string): Promise<DeleteResult>;
}
