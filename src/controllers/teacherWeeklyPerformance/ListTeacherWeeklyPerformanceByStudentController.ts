import { Request, Response } from 'express';
import { TeacherWeeklyPerformanceRepository } from '../../repositories/implementations/TeacherWeeklyPerformanceRepository';
import { ListTeacherWeeklyPerformanceByTeacherService } from '../../services/teacherWeeklyPerformance/ListTeacherWeeklyPerformanceByTeacherService';

class ListTeacherWeeklyPerformanceByTeacherController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const listTeacherWeeklyPerformanceByTeacherService =
      new ListTeacherWeeklyPerformanceByTeacherService(
        new TeacherWeeklyPerformanceRepository()
      );

    const teacher = await listTeacherWeeklyPerformanceByTeacherService.execute(
      id
    );

    return res.status(200).json(teacher);
  }
}

export default new ListTeacherWeeklyPerformanceByTeacherController();
