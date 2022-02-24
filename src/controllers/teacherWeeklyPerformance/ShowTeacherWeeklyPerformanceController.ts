import { Request, Response } from 'express';
import { TeacherWeeklyPerformanceRepository } from '../../repositories/implementations/TeacherWeeklyPerformanceRepository';
import { ShowTeacherWeeklyPerformanceService } from '../../services/teacherWeeklyPerformance/ShowTeacherWeeklyPerformanceService';

class ShowTeacherWeeklyPerformanceController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const showTeacherWeeklyPerformanceService =
      new ShowTeacherWeeklyPerformanceService(
        new TeacherWeeklyPerformanceRepository()
      );

    const teacherWeeklyPerformance =
      await showTeacherWeeklyPerformanceService.execute(id);

    return res.status(200).json(teacherWeeklyPerformance);
  }
}

export default new ShowTeacherWeeklyPerformanceController();
