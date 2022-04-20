import { Request, Response } from 'express';
import { StudentWeeklyPerformanceRepository } from '../../repositories/implementations/StudentWeeklyPerformanceRepository';
import { ListStudentWeeklyPerformanceByStudentService } from '../../services/studentWeeklyPerformance/ListStudentWeeklyPerformanceByStudentService';

class ListStudentWeeklyPerformanceByStudentController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const listStudentWeeklyPerformanceByStudentService =
      new ListStudentWeeklyPerformanceByStudentService(
        new StudentWeeklyPerformanceRepository()
      );

    const student = await listStudentWeeklyPerformanceByStudentService.execute(
      id
    );

    return res.status(200).json(student);
  }
}

export default new ListStudentWeeklyPerformanceByStudentController();
