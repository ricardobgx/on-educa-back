import { Request, Response } from 'express';

import { ITeacherWeeklyPerformanceRequest } from '../../dto/teacherWeeklyPerformance/ITeacherWeeklyPerformanceRequest';
import { TeacherWeeklyPerformanceRepository } from '../../repositories/implementations/TeacherWeeklyPerformanceRepository';
import { CreateTeacherWeeklyPerformanceService } from '../../services/teacherWeeklyPerformance/CreateTeacherWeeklyPerformanceService';

class CreateTeacherWeeklyPerformanceController {
  async handle(req: Request, res: Response) {
    const { teacherId } = req.body as ITeacherWeeklyPerformanceRequest;

    const createTeacherWeeklyPerformanceService =
      new CreateTeacherWeeklyPerformanceService(
        new TeacherWeeklyPerformanceRepository()
      );

    const TeacherWeeklyPerformance =
      await createTeacherWeeklyPerformanceService.execute({
        teacherId,
      });

    return res.status(201).json(TeacherWeeklyPerformance);
  }
}

export default new CreateTeacherWeeklyPerformanceController();
