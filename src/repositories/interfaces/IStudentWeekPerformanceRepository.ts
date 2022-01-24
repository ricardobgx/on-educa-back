import { DeleteResult } from 'typeorm';
import { IStudentWeekPerformanceRequest } from '../../dto/IStudentWeekPerformanceRequest';
import { IUpdateStudentWeekPerformanceRequest } from '../../dto/IUpdateStudentWeekPerformanceRequest';
import { StudentWeekPerformance } from '../../entities/StudentWeekPerformance';

export interface IStudentWeekPerformanceRepository {
  createStudentWeekPerformance(
    studentWeekPerformanceParams: IStudentWeekPerformanceRequest
  ): Promise<StudentWeekPerformance>;
  findAll(name?: string): Promise<StudentWeekPerformance[]>;
  findById(id: string): Promise<StudentWeekPerformance | undefined>;
  findByStudent(studentId: string): Promise<StudentWeekPerformance | undefined>;
  updateStudentWeekPerformanceValues(
    updateStudentWeekPerformanceParams: IUpdateStudentWeekPerformanceRequest
  ): Promise<void>;
  updateById(updateFields: IStudentWeekPerformanceRequest): Promise<void>;
  deleteById(id: string): Promise<DeleteResult>;
}
