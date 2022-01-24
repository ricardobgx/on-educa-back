import { Request, Response } from 'express';
import { StudentWeekPerformanceRepository } from '../../repositories/implementations/StudentWeekPerformanceRepository';
import { ShowStudentWeekPerformanceService } from '../../services/studentWeekPerformance/ShowStudentWeekPerformanceService';

class ShowStudentWeekPerformanceController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const showStudentWeekPerformanceService =
      new ShowStudentWeekPerformanceService(
        new StudentWeekPerformanceRepository()
      );

    const studentWeekPerformance =
      await showStudentWeekPerformanceService.execute(id);

    return res.status(200).json(studentWeekPerformance);
  }
}

export default new ShowStudentWeekPerformanceController();
