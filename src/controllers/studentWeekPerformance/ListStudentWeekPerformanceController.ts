import { Request, Response } from 'express';
import { StudentWeekPerformanceRepository } from '../../repositories/implementations/StudentWeekPerformanceRepository';
import { ListStudentWeekPerformanceService } from '../../services/studentWeekPerformance/ListStudentWeekPerformanceService';

class ListStudentWeekPerformanceController {
  async handle(req: Request, res: Response) {
    const listStudentWeekPerformanceService =
      new ListStudentWeekPerformanceService(
        new StudentWeekPerformanceRepository()
      );

    const studentWeekPerformances =
      await listStudentWeekPerformanceService.execute();

    return res.status(200).json(studentWeekPerformances);
  }
}

export default new ListStudentWeekPerformanceController();
