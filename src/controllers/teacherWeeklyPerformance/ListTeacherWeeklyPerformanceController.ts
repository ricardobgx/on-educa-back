import { Request, Response } from 'express';
import { TeacherWeeklyPerformanceRepository } from '../../repositories/implementations/TeacherWeeklyPerformanceRepository';
import { ListTeacherWeeklyPerformanceService } from '../../services/teacherWeeklyPerformance/ListTeacherWeeklyPerformanceService';

class ListTeacherWeeklyPerformanceController {
  async handle(req: Request, res: Response) {
    const listTeacherWeeklyPerformanceService =
      new ListTeacherWeeklyPerformanceService(
        new TeacherWeeklyPerformanceRepository()
      );

    const teacherWeeklyPerformances =
      await listTeacherWeeklyPerformanceService.execute();

    return res.status(200).json(teacherWeeklyPerformances);
  }
}

export default new ListTeacherWeeklyPerformanceController();
