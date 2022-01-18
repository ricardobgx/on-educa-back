import { DeleteResult } from 'typeorm';
import { IPracticeRequest } from '../../dto/IPracticeRequest';
import { Practice } from '../../entities/Practice';

export interface IPracticeRepository {
  createPractice(practiceParams: IPracticeRequest): Promise<Practice>;
  findAll(name?: string): Promise<Practice[]>;
  findById(id: string): Promise<Practice | undefined>;
  deleteById(id: string): Promise<DeleteResult>;
}
