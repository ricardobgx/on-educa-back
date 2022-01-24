import { Request, Response } from 'express';
import { StudentWeekPerformanceRepository } from '../../repositories/implementations/StudentWeekPerformanceRepository';
import { ListStudentWeekPerformanceByStudentService } from '../../services/studentWeekPerformance/ListStudentWeekPerformanceByStudentService';

class ListStudentWeekPerformanceByStudentController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const listStudentWeekPerformanceByStudentService =
      new ListStudentWeekPerformanceByStudentService(
        new StudentWeekPerformanceRepository()
      );

    const student = await listStudentWeekPerformanceByStudentService.execute(
      id
    );

    return res.status(200).json(student);
  }
}

export default new ListStudentWeekPerformanceByStudentController();
