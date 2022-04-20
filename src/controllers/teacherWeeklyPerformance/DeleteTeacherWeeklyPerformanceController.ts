import { Request, Response } from 'express';
import { TeacherWeeklyPerformanceRepository } from '../../repositories/implementations/TeacherWeeklyPerformanceRepository';
import { DeleteTeacherWeeklyPerformanceService } from '../../services/teacherWeeklyPerformance/DeleteTeacherWeeklyPerformanceService';

class DeleteTeacherWeeklyPerformanceController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteTeacherWeeklyPerformanceService =
      new DeleteTeacherWeeklyPerformanceService(
        new TeacherWeeklyPerformanceRepository()
      );

    await deleteTeacherWeeklyPerformanceService.execute(id);

    return res.status(200).json({ message: 'Entidade removida!' });
  }
}

export default new DeleteTeacherWeeklyPerformanceController();
