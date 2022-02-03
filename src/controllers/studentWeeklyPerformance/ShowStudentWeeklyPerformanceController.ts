import { Request, Response } from 'express';
import { StudentWeeklyPerformanceRepository } from '../../repositories/implementations/StudentWeeklyPerformanceRepository';
import { ShowStudentWeeklyPerformanceService } from '../../services/studentWeeklyPerformance/ShowStudentWeeklyPerformanceService';

class ShowStudentWeeklyPerformanceController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const showStudentWeeklyPerformanceService =
      new ShowStudentWeeklyPerformanceService(
        new StudentWeeklyPerformanceRepository()
      );

    const studentWeeklyPerformance =
      await showStudentWeeklyPerformanceService.execute(id);

    return res.status(200).json(studentWeeklyPerformance);
  }
}

export default new ShowStudentWeeklyPerformanceController();
