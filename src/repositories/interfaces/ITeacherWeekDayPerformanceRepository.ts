import { DeleteResult } from 'typeorm';
import { ITeacherWeekDayPerformanceRequest } from '../../dto/teacherWeekDayPerformance/ITeacherWeekDayPerformanceRequest';
import { IUpdateTeacherWeekDayPerformanceRequest } from '../../dto/teacherWeekDayPerformance/IUpdateTeacherWeekDayPerformanceRequest';
import { TeacherWeekDayPerformance } from '../../entities/TeacherWeekDayPerformance';

export interface ITeacherWeekDayPerformanceRepository {
  createTeacherWeekDayPerformance(
    teacherWeekDayPerformanceParams: ITeacherWeekDayPerformanceRequest
  ): Promise<TeacherWeekDayPerformance>;
  findAll(name?: string): Promise<TeacherWeekDayPerformance[]>;
  findById(id: string): Promise<TeacherWeekDayPerformance | undefined>;
  defineDefaultValueToUndefined(value: number): number;
  updateWeekDayPerformanceValues(
    updateTeacherWeekDayPerformanceParams: IUpdateTeacherWeekDayPerformanceRequest
  ): Promise<void>;
  updateById(updateFields: ITeacherWeekDayPerformanceRequest): Promise<void>;
  deleteById(id: string): Promise<DeleteResult>;
}
