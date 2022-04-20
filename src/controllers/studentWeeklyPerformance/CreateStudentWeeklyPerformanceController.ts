import { Request, Response } from 'express';

import { IStudentWeeklyPerformanceRequest } from '../../dto/studentWeeklyPerformance/IStudentWeeklyPerformanceRequest';
import { StudentWeeklyPerformanceRepository } from '../../repositories/implementations/StudentWeeklyPerformanceRepository';
import { CreateStudentWeeklyPerformanceService } from '../../services/studentWeeklyPerformance/CreateStudentWeeklyPerformanceService';

class CreateStudentWeeklyPerformanceController {
  async handle(req: Request, res: Response) {
    const { studentId } = req.body as IStudentWeeklyPerformanceRequest;

    const createStudentWeeklyPerformanceService =
      new CreateStudentWeeklyPerformanceService(
        new StudentWeeklyPerformanceRepository()
      );

    const StudentWeeklyPerformance =
      await createStudentWeeklyPerformanceService.execute({
        studentId,
      });

    return res.status(201).json(StudentWeeklyPerformance);
  }
}

export default new CreateStudentWeeklyPerformanceController();
