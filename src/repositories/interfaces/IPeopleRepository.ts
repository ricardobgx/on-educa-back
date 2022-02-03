import { DeleteResult } from 'typeorm';
import { IPeopleRequest } from '../../dto/IPeopleRequest';
import { People } from '../../entities/People';

export interface IPeopleRepository {
  createPeople(peopleParams: IPeopleRequest): Promise<People>;
  findAll(): Promise<People[]>;
  findById(id: string): Promise<People | undefined>;
  findByEmail(email: string): Promise<People | undefined>;
  updateById(updateFields: IPeopleRequest): Promise<void>;
  deleteById(id: string): Promise<DeleteResult>;
}
