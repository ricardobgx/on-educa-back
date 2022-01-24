import { Request, Response } from 'express';

import { IStudentWeekPerformanceRequest } from '../../dto/IStudentWeekPerformanceRequest';
import { StudentWeekPerformanceRepository } from '../../repositories/implementations/StudentWeekPerformanceRepository';
import { CreateStudentWeekPerformanceService } from '../../services/studentWeekPerformance/CreateStudentWeekPerformanceService';

class CreateStudentWeekPerformanceController {
  async handle(req: Request, res: Response) {
    const { studentId } = req.body as IStudentWeekPerformanceRequest;

    const createStudentWeekPerformanceService =
      new CreateStudentWeekPerformanceService(
        new StudentWeekPerformanceRepository()
      );

    const StudentWeekPerformance =
      await createStudentWeekPerformanceService.execute({
        studentId,
      });

    return res.status(201).json(StudentWeekPerformance);
  }
}

export default new CreateStudentWeekPerformanceController();
