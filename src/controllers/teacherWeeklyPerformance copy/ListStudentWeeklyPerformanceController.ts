import { Request, Response } from 'express';
import { StudentWeeklyPerformanceRepository } from '../../repositories/implementations/StudentWeeklyPerformanceRepository';
import { ListStudentWeeklyPerformanceService } from '../../services/studentWeeklyPerformance/ListStudentWeeklyPerformanceService';

class ListStudentWeeklyPerformanceController {
  async handle(req: Request, res: Response) {
    const listStudentWeeklyPerformanceService =
      new ListStudentWeeklyPerformanceService(
        new StudentWeeklyPerformanceRepository()
      );

    const studentWeeklyPerformances =
      await listStudentWeeklyPerformanceService.execute();

    return res.status(200).json(studentWeeklyPerformances);
  }
}

export default new ListStudentWeeklyPerformanceController();
