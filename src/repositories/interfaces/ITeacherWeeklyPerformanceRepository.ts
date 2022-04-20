import { DeleteResult } from 'typeorm';
import { ITeacherWeeklyPerformanceRequest } from '../../dto/teacherWeeklyPerformance/ITeacherWeeklyPerformanceRequest';
import { IUpdateTeacherWeeklyPerformanceRequest } from '../../dto/teacherWeeklyPerformance/IUpdateTeacherWeeklyPerformanceRequest';
import { TeacherWeeklyPerformance } from '../../entities/TeacherWeeklyPerformance';

export interface ITeacherWeeklyPerformanceRepository {
  createTeacherWeeklyPerformance(
    teacherWeeklyPerformanceParams: ITeacherWeeklyPerformanceRequest
  ): Promise<TeacherWeeklyPerformance>;
  findAll(name?: string): Promise<TeacherWeeklyPerformance[]>;
  findById(id: string): Promise<TeacherWeeklyPerformance | undefined>;
  findByTeacher(
    teacherId: string
  ): Promise<TeacherWeeklyPerformance | undefined>;
  updateTeacherWeeklyPerformanceValues(
    updateTeacherWeeklyPerformanceParams: IUpdateTeacherWeeklyPerformanceRequest
  ): Promise<void>;
  updateById(updateFields: ITeacherWeeklyPerformanceRequest): Promise<void>;
  deleteById(id: string): Promise<DeleteResult>;
  resetWeeklyPerformances(): Promise<void>;
}
