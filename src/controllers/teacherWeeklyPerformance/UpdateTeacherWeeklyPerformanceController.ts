import { Request, Response } from 'express';
import { ITeacherWeeklyPerformanceRequest } from '../../dto/teacherWeeklyPerformance/ITeacherWeeklyPerformanceRequest';
import { TeacherWeeklyPerformanceRepository } from '../../repositories/implementations/TeacherWeeklyPerformanceRepository';
import { UpdateTeacherWeeklyPerformanceService } from '../../services/teacherWeeklyPerformance/UpdateTeacherWeeklyPerformanceService';

class UpdateTeacherWeeklyPerformanceController {
  async handle(req: Request, res: Response) {
    const { teacherId } = req.body as ITeacherWeeklyPerformanceRequest;

    const { id } = req.params;

    const updateTeacherWeeklyPerformanceService =
      new UpdateTeacherWeeklyPerformanceService(
        new TeacherWeeklyPerformanceRepository()
      );

    await updateTeacherWeeklyPerformanceService.execute({ id, teacherId });

    return res.status(200).json({ message: 'Entidade atualizada!' });
  }
}

export default new UpdateTeacherWeeklyPerformanceController();
