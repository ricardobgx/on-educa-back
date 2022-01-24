import { DeleteResult } from 'typeorm';
import { IStudentWeekDayPerformanceRequest } from '../../dto/IStudentWeekDayPerformanceRequest';
import { IUpdateStudentWeekDayPerformanceRequest } from '../../dto/IUpdateStudentWeekDayPerformanceRequest';
import { StudentWeekDayPerformance } from '../../entities/StudentWeekDayPerformance';

export interface IStudentWeekDayPerformanceRepository {
  createStudentWeekDayPerformance(
    studentWeekDayPerformanceParams: IStudentWeekDayPerformanceRequest
  ): Promise<StudentWeekDayPerformance>;
  findAll(name?: string): Promise<StudentWeekDayPerformance[]>;
  findById(id: string): Promise<StudentWeekDayPerformance | undefined>;
  defineDefaultValueToUndefined(value: number): number;
  updateWeekDayPerformanceValues(
    updateStudentWeekDayPerformanceParams: IUpdateStudentWeekDayPerformanceRequest
  ): Promise<void>;
  updateById(updateFields: IStudentWeekDayPerformanceRequest): Promise<void>;
  deleteById(id: string): Promise<DeleteResult>;
}
