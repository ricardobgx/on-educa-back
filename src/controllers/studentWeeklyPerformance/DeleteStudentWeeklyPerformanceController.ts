import { Request, Response } from 'express';
import { StudentWeeklyPerformanceRepository } from '../../repositories/implementations/StudentWeeklyPerformanceRepository';
import { DeleteStudentWeeklyPerformanceService } from '../../services/studentWeeklyPerformance/DeleteStudentWeeklyPerformanceService';

class DeleteStudentWeeklyPerformanceController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteStudentWeeklyPerformanceService =
      new DeleteStudentWeeklyPerformanceService(
        new StudentWeeklyPerformanceRepository()
      );

    await deleteStudentWeeklyPerformanceService.execute(id);

    return res.status(200).json({ message: 'Entidade removida!' });
  }
}

export default new DeleteStudentWeeklyPerformanceController();
