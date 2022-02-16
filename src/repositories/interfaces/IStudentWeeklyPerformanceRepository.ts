import { DeleteResult } from 'typeorm';
import { IStudentWeeklyPerformanceRequest } from '../../dto/studentWeeklyPerformance/IStudentWeeklyPerformanceRequest';
import { IUpdateStudentWeeklyPerformanceRequest } from '../../dto/studentWeeklyPerformance/IUpdateStudentWeeklyPerformanceRequest';
import { StudentWeeklyPerformance } from '../../entities/StudentWeeklyPerformance';

export interface IStudentWeeklyPerformanceRepository {
  createStudentWeeklyPerformance(
    studentWeeklyPerformanceParams: IStudentWeeklyPerformanceRequest
  ): Promise<StudentWeeklyPerformance>;
  findAll(name?: string): Promise<StudentWeeklyPerformance[]>;
  findById(id: string): Promise<StudentWeeklyPerformance | undefined>;
  findByStudent(
    studentId: string
  ): Promise<StudentWeeklyPerformance | undefined>;
  updateStudentWeeklyPerformanceValues(
    updateStudentWeeklyPerformanceParams: IUpdateStudentWeeklyPerformanceRequest
  ): Promise<void>;
  updateById(updateFields: IStudentWeeklyPerformanceRequest): Promise<void>;
  deleteById(id: string): Promise<DeleteResult>;
}
